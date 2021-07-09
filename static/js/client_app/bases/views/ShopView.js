define(function (require) {

    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin            	= require('gonrin'),
        
        tpl                 = require('text!app/bases/tpl/shop.html'),
        template = _.template(tpl);
    return Gonrin.View.extend({
        render: function () {
        	var self = this;
            
            var url = self.getApp().serviceURL+'/api/v1/hanghoa';
            console.log("SHOP now", url, self.getApp().currentUser)
            
            $.ajax({
                url:  url,
                dataType: 'json',
                success: function (data) {
                    console.log("DATA",data);
                    self.addComponent(data['objects']);
                },
                error: function(request, textStatus, errorThrown) {
                    console.log("ERROR SML")
                    self.getApp().notify({message: 'Có lỗi xảy ra, vui lòng thử lại sau'},{type: "danger"});
                    
                }
            });
            this.$el.html(template());
            
            
        	// $("#forget-password").unbind('click').bind('click', function(){
            //     self.getApp().getRouter().navigate("forgot");
        	// });

            // console.log("Login view render");
            // this.$el.find("#login-form").unbind("submit").bind("submit", function(){
            // 	self.processLogin();
            // 	return false;
            // });
            return this;
        },
       	addComponent: function(data){
            let self = this;
            var user_cart_id = localStorage.getItem('user_cart_id');
            $.each(data, function(idx, obj){
                var item = '<div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">' + '<div class="single-popular-items mb-50 text-center">' + '<div class="popular-img">' + '<img src="' + obj['image_url'] + '" alt=""><div class="img-cap"><span class="add_to_cart">Add to cart <p style="display: none;">'+ obj['id'] +'</p><p style="display: none;">'+ obj['gia'] +'</p><p style="display: none;">'+ obj['ten'] +'</p></span></div><div class="favorit-items"><span class="flaticon-heart"></span></div></div><div class="popular-caption"><h3><a href="#">'+ obj['ten'] +'</a></h3><span>$ '+ obj['gia'] +'</span></div></div></div>';	
                $( "#item-gallery" ).append( item );
                
            })
            var currentUser = self.getApp().currentUser;
            if (currentUser){
                $(".add_to_cart").on("click", function( event ) {
                    console.log("May da click")
                    var item_id = $(this).find("p").eq(0).html(),
                        price = $(this).find("p").eq(1).html(),
                        name = $(this).find("p").eq(2).html();
                    self.addToCart(item_id,price,name);
                });
            }
			
            
       	},
        addToCart: function(item_id,price,name){
            let self = this;
            var user_cart_id = localStorage.getItem('user_cart_id');
            var data_payload = {
                'hanghoa_id': item_id,
                'hanghoa_ten': name,
                'soluong': 1,
                'dongia': price,
                'thanhtien': price,
                'giohang_id': user_cart_id
            };
            $.ajax({
                url: self.getApp().serviceURL + "/api/v1/chitietgiohang",
                type: 'post',
                data: JSON.stringify(data_payload),
                dataType: "json",
                success: function(data){
                    console.log("DATA", data)
                    self.getApp().notify("Đã thêm vào giỏ hàng");
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // self.getApp().notify({ message: "Get receipt error!" }, { type: "danger" });
                    self.$el.find("#no_res_grid").show();
                    loader.hide();
                }
            });
        }
    });

});
