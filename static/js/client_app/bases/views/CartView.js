define(function (require) {

    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin            	= require('gonrin'),
        
        tpl                 = require('text!app/bases/tpl/cart.html'),
        template = _.template(tpl);
    var schema = require("json!schema/GioHangSchema.json");
    var detail_tpl = require('text!app/bases/tpl/cart_detail.html');
    // var schema = {
    //     "id": {
    //         "type": "number"
    //     },
    //     "hanghoa_id": {
    //         "type": "number"
    //     },
    //     "soluong": {
    //         "type": "number"
    //     },
    //     "dongia": {
    //         "type": "number"
    //     },
    //     "thanhtien": {
    //         "type": "number"
    //     },
    //     "giohang_id": {
    //       "type": "number"
    //     },
  
        
    //     "item_details": {
    //         "type": "list"
    //     }
    // };
    return Gonrin.View.extend({
        modelSchema: schema,
        render: function () {
        	var self = this;
            var user_cart_id = localStorage.getItem('user_cart_id');
            var url = self.getApp().serviceURL+'/get_cart_details';
            $.ajax({
                url:  url,
                data: {
                    'cart_id': user_cart_id
                },  
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

            return this;
        },
       	addComponent: function(data){
            let self = this;
            var user_cart_id = localStorage.getItem('user_cart_id');
            $.each(data, function(idx, obj){
                var thanhtien = 100;
                var item = '<tr><td><div class="media"><div class="d-flex"><img src="'+ obj['hanghoa']['id'] + '" alt="" /></div><div class="media-body"><p>' + obj['hanghoa']['ten'] + '</p></div></div></td><td><h5>$' + obj['dongia'] + '</h5><td><div class="product_count"><span class="input-number-decrement"> <i class="ti-minus"></i></span><input class="input-number" type="text" value="1" min="0" max="10"><span class="input-number-increment"> <i class="ti-plus"></i></span></div></td><td><h5>$' + obj['dongia'] +'</h5></td></tr><tr style="display: none;"><input  value="id" ></tr>';
                $( "#grid_list_item" ).append( item );
                
            })

            var total_tpl = '<tr><td></td><td></td><td><h5>Subtotal</h5></td><td><h5 id="sub_total">$ 9999</h5></td></tr>';
            $( "#grid_list_item" ).append( total_tpl );

			// $(".add_to_cart").on("click", function( event ) {
            //     var item_id = $(this).find("p").eq(0).html(),
            //         price = $(this).find("p").eq(1).html();
            //     self.addToCart(item_id,price);
            // });
            
       	},
        addToCart: function(item_id,price){
            let self = this;
            var user_cart_id = localStorage.getItem('user_cart_id');
            var data_payload = {
                'hanghoa_id': item_id,
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
