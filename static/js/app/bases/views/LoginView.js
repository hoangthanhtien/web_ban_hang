define(function (require) {
  "use strict";
  var $ = require("jquery"),
    _ = require("underscore"),
    Gonrin = require("gonrin"),
    tpl = require("text!app/bases/tpl/login.html"),
    template = _.template(tpl);
  return Gonrin.View.extend({
    render: function () {
      var self = this;

      self.getApp().currentUser = null;
      this.$el.html(template());

      $("#forget-password")
        .unbind("click")
        .bind("click", function () {
          self.getApp().getRouter().navigate("forgot");
        });
      var new_username_input = self.$el.find("[name=new_username]");
      var new_password_input = self.$el.find("[name=new_password]");
      var confirm_password_input = this.$el.find("[name=new_password_confirm]");
      var email_input = this.$el.find("[name=email]");
      var fullname_input = this.$el.find("[name=fullname]");
      this.$el.find("#register-btn").bind("click", function () {
        var new_username = new_username_input.val().trim();
        var new_password = new_password_input.val();
        var confirm_password = confirm_password_input.val();
        var email = email_input.val().trim();
        var fullname = fullname_input.val().trim();
        if (new_password != confirm_password) {
          self
            .getApp()
            .notify(
              { message: "Mật khẩu không khớp, vui lòng thử lại" },
              { type: "danger" }
            );
        } else {
          var api_endpoint = self.getApp().serviceURL + "/user/register";
          var data =  {
              user_name: new_username,
              password: new_password,
              email: email,
              fullname: fullname,
            }
          $.ajax({
            url: api_endpoint,
            type: "POST",
            data: JSON.stringify(data),
            success: function () {
              self
                .getApp()
                .notify(
                  {
                    message: "Đăng ký thành công, vui lòng tiến hành đăng nhập",
                  },
                  { type: "success" }
                );
            },
            error: function () {
              self
                .getApp()
                .notify(
                  { message: "Có lỗi xảy ra :((, vui lòng thử lại" },
                  { type: "danger" }
                );
            },
          });
        }
      });
      this.$el
        .find("#login-form")
        .unbind("submit")
        .bind("submit", function () {
          self.processLogin();
          return false;
        });
      return this;
    },
    processLogin: function () {
      var username = this.$("[name=username]").val().trim();
      var password = this.$("[name=password]").val();
      // var organization_no = this.$("[name=organization_no]").val().trim();

      var data = JSON.stringify({
        user_name: username,
        password: password,
      });
      var self = this;
      $.ajax({
        url: "/user/login",
        type: "post",
        data: data,
        beforeSend: function () {
          $("#loading").removeClass("hidden");
        },
        complete: function () {
          $("#loading").addClass("hidden");
        },
        dataType: "json",
        success: function (data) {
          self.getApp().postLogin(data);
        },
        error: function (request, textStatus, errorThrown) {
          //console.log(request);
          try {
            self.getApp().notify($.parseJSON(request.responseJSON).message);
          } catch (err) {
            self
              .getApp()
              .notify(
                { message: "Có lỗi xảy ra, vui lòng thử lại sau" },
                { type: "danger" }
              );
          }
        },
      });
    },
  });
});
