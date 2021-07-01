define(function (require) {
  "use strict";
  var $ = require("jquery"),
    _ = require("underscore"),
    Gonrin = require("gonrin"),
    tpl = require("text!app/bases/tpl/test.html"),
    template = _.template(tpl);
  return Gonrin.View.extend({
    render: function () {
      var self = this;

      self.getApp().currentUser = null;
      this.$el.html(template());
      console.log("view",this.$el.html(template()))

//       $("#forget-password")
//         .unbind("click")
//         .bind("click", function () {
//           self.getApp().getRouter().navigate("forgot");
//         });

//       console.log("Nut dang ky", this.$el.find("#register-btn"));
//       this.$el.find("#register-btn").bind("click", function(){
// 	     self.getApp().getRouter().navigate("register")
//       })
//       this.$el
//         .find("#login-form")
//         .unbind("submit")
//         .bind("submit", function () {
//           self.processLogin();
//           return false;
//         });
      return this;
    },
    processLogin: function () {
//       var username = this.$("[name=username]").val().trim();
//       var password = this.$("[name=password]").val();
//       // var organization_no = this.$("[name=organization_no]").val().trim();

//       var data = JSON.stringify({
//         user_name: username,
//         password: password,
//       });
//       var self = this;
//       $.ajax({
//         url: "/user/login",
//         type: "post",
//         data: data,
//         beforeSend: function () {
//           $("#loading").removeClass("hidden");
//         },
//         complete: function () {
//           $("#loading").addClass("hidden");
//         },
//         dataType: "json",
//         success: function (data) {
//           self.getApp().postLogin(data);
//         },
//         error: function (request, textStatus, errorThrown) {
//           //console.log(request);
//           try {
//             self.getApp().notify($.parseJSON(request.responseJSON).message);
//           } catch (err) {
//             self
//               .getApp()
//               .notify(
//                 { message: "Có lỗi xảy ra, vui lòng thử lại sau" },
//                 { type: "danger" }
//               );
//           }
//         },
//       });
    },
  });
});



