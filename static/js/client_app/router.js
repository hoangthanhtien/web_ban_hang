define(function (require) {

    "use strict";
    
    var $           = require('jquery'),
        Gonrin    	= require('gonrin');
    
    var routedata = require('app/bases/nav/route');
    var LoginView = require('app/bases/views/LoginView');
    var AboutView = require('app/bases/views/AboutView'),
        BlogView = require('app/bases/views/BlogView'),
        BlogDetailsView = require('app/bases/views/BlogDetailsView'),
        ElementsView = require('app/bases/views/ElementsView'),
        ConfirmationView = require('app/bases/views/ConfirmationView'),
        CheckoutView = require('app/bases/views/CheckoutView'),
        ContactView = require('app/bases/views/ContactView'),
        ClientLoginView = require('app/bases/views/ClientLoginView'),
        ShopView = require('app/bases/views/ShopView'),
        CartView = require('app/bases/views/CartView');
    // var QuocgiaCollectionView = require('app/view/QuocGia/CollectionView');
    
    return Gonrin.Router.extend({
        routes: {
        	"index" : "index",
            "login":"login",
            "logout": "logout",
            "forgot":"forgotPassword",
            "dangky":"dangky",
            "error":"error_page",
            "about": "about",
            "blog": "blog",
            "elements":"elements",
            "confirmation":"confirmation",
            "blog_details": "blog_details",
            "checkout": "checkout",
            "contact": "contact",
            "shop": "shop",
            "cart": "cart",
            "client_login": "client_login",
            "*path":  "defaultRoute"
        },
        defaultRoute:function(){
            console.log("defaultRoute");
            this.navigate("index",true);
            // var aboutview = new AboutView({ el: $('#body-container') });
            // aboutview.render();
        },
        index:function(){
            var loginview = new LoginView({ el: $('#body-container') });
            loginview.render();
        },
        about: function(){
            var aboutview = new AboutView({ el: $('#body-container') });
            aboutview.render();
        },
        blog: function(){
            var blogview = new BlogView({ el: $('#body-container') });
            blogview.render();
        },
        blog_details: function(){
            var blog_detailsview = new BlogDetailsView({ el: $('#body-container') });
            blog_detailsview.render();
        },
        elements: function(){
            var elementsview = new ElementsView({ el: $('#body-container') });
            elementsview.render();
        },
        confirmation: function(){
            var confirmationview = new ConfirmationView({ el: $('#body-container') });
            confirmationview.render();
        },
        checkout: function(){
            var checkoutview = new CheckoutView({ el: $('#body-container') });
            checkoutview.render();
        },
        contact: function(){
            var contactview = new ContactView({ el: $('#body-container') });
            contactview.render();
        },
        shop: function(){
            var shopview = new ShopView({ el: $('#body-container') });
            shopview.render();
        },
        cart: function(){
            var cartview = new CartView({ el: $('#body-container') });
            cartview.render();
        },
        client_login: function () {
            var loginview = new ClientLoginView({ el: $('#body-container') });
            loginview.render();
        },
        login: function () {
            console.log("Chay login function tai router.js");
            var loginview = new LoginView({ el: $('#body-container') });
            loginview.render();
        },
        logout: function () {
            var self = this;
            $.ajax({
                url: self.getApp().serviceURL + '/organization/user/logout',
                dataType: "json",
                success: function (data) {
                    self.navigate("login");
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    self.getApp().notify(self.getApp().translate("LOGOUT_ERROR"));
                }
            });
        },
        error_page: function(){
        	var app = this.getApp();
        	if(app.$content){
        		app.$content.html("Error Page");
        	}
        	return;
        },
        registerAppRoute: function(){
            var self = this;
            $.each(routedata, function(idx, entry){
                var entry_path = _.result(entry,'route');
                self.route(entry_path, entry.collectionName, function(){
                    require([ entry['$ref'] ], function ( View) {
                        var view = new View({el: self.getApp().$content, viewData:entry.viewData});
                        view.render();
                    });
                });
            });
        },
    });

});