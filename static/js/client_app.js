define("jquery", [], function () {
    return jQuery;
  });
  
  require.config({
    baseUrl: static_url + "/js/lib",
    //    baseUrl: '/static/js/lib',
    paths: {
      app: "../client_app",
    //   tpl: "../tpl",
      schema: "../schema",
      vendor: "../../vendor",
    },
    shim: {
      gonrin: {
        deps: ["underscore", "jquery", "backbone"],
        exports: "Gonrin",
      },
      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone",
      },
      underscore: {
        exports: "_",
      },
    },
  });
  
  require([
    "jquery",
    "gonrin",
    "app/router",
    "app/bases/nav/NavbarView",
    "text!app/bases/tpl/layout.html",
    "i18n!app/nls/app",
  ], function ($, Gonrin, Router, NavView, layout, lang) {
    $.ajaxSetup({
      headers: {
        "content-type": "application/json",
      },
    });
  
    var app = new Gonrin.Application({
      serviceURL:
        location.protocol +
        "//" +
        location.hostname +
        (location.port ? ":" + location.port : ""),
      staticURL: static_url,
      router: new Router(),
      lang: lang,
      //layout: layout,
      initialize: function () {
        this.getRouter().registerAppRoute();
        this.getCurrentUser();
      },
      getParameterUrl: function (parameter, url) {
        if (!url) url = window.location.href;
        var reg = new RegExp("[?&]" + parameter + "=([^&#]*)", "i");
        var string = reg.exec(url);
        return string ? string[1] : undefined;
      },
      getCurrentUser: function () {
        var self = this;
        var currenUser = localStorage.getItem("currentUser");
        // var token = localStorage.getItem("organization_token");
        // if (!!token) {
        //   $.ajaxSetup({
        //     headers: {
        //       "content-type": "application/json",
        //       "X-ORGANIZATION-USER-TOKEN": token,
        //     },
        //   });
        // }
        if (!currenUser) {
          $.ajax({
            url: self.serviceURL + "/user/current_user",
            dataType: "json",
            success: function (data) {
              console.log("data current User", data);
              self.postLogin(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              self.router.navigate("login");
            },
          });
        }
      },
  
      postLogin: function (data) {
        var self = this;
        localStorage.setItem("user", JSON.stringify(data));
  
        $("#body-container").html(layout);
        self.currentUser = new Gonrin.User(data);
        // cmnt
        this.$header = $("body").find(".page-header");
  
        this.$content = $("body").find("#main-content");
  
        this.$navbar = $("body").find("#sidebar-nav");
  
        // cmnt
  
        var $user = self.$header.find("span.username");
        if (!data.fullname || data.fullname === "") {
          data.fullname = data.id;
        }
        self.$header.find("span.username").html(data.fullname);
        this.$toolbox = $("body").find(".tools-area");
  
        this.navView = new NavView({
          el: this.$navbar,
        });
        self.navView.render();
      },
  
      checkRole: function (role) {
        let self = this;
  
        if (self.currentUser.roles.includes(role))
          console.log("<><><><><>", self.currentUser.roles.includes(role));
        return true;
        return false;
      },
    });
    Backbone.history.start();
  });
  