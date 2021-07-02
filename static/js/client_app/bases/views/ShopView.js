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
            $.each(data, function(idx, obj){
                var item = '<div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">' + '<div class="single-popular-items mb-50 text-center">' + '<div class="popular-img">' + '<img src="' + obj['image_url'] + '" alt=""><div class="img-cap"><span>Add to cart</span></div><div class="favorit-items"><span class="flaticon-heart"></span></div></div><div class="popular-caption"><h3><a href="product_details.html">'+ obj['ten'] +'</a></h3><span>$ '+ obj['gia'] +'</span></div></div></div>';	
                $( "#item-gallery" ).append( item );
            })
			
            
       	},

    });

});
