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
       	processLogin: function(){
			console.log("LoginView Process login");
       		var username = this.$('[name=username]').val();
			   var password = this.$('[name=password]').val();
			   console.log(name);
			   console.log(password);
//       		var qrcode = this.getApp().getRouter().getParam("qr");
       		var qrcode = this.getApp().getParameterUrl("qr", window.location.href);
       		var data = JSON.stringify({
                user_name: username,
       		    password: password
       		});
			var self = this;
			// $.LoadingOverlay("show");
       		$.ajax({
       		    url:  self.getApp().serviceURL+'/user/login',
       		    type: 'post',
       		    data: data,
       		    headers: {
       		    	'content-type': 'application/json'
       		    },
	       		beforeSend: function(){
	    		    $("#loading").removeClass("hidden");
	    		   },
	    		complete: function(){
	 		    	$("#loading").addClass("hidden");
	 		    },
       		    dataType: 'json',
       		    success: function (data) {
       		    	console.log(data);
       		    	// $.LoadingOverlay("hide");
					self.getApp().postLogin(data);
					// localStorage.setItem("email", data['data']['email']);
					// localStorage.setItem("fullname", data['data']['fullname']);
       		    	// if(password === undefined || password===""){
       		    	// 	self.router.navigate("user/profile");
       		    	// }
       		    },
       		    error: function(request, textStatus, errorThrown) {
					   //console.log(request);
					// $.LoadingOverlay("hide");
       		    	try {
       		    		self.getApp().notify($.parseJSON(request.responseJSON).error_message);
       		    	} catch(err) {
       		    		self.getApp().notify({message: 'Có lỗi xảy ra, vui lòng thử lại sau'},{type: "danger"});
       		    	}
       		    }
       		});
       	},

    });

});
