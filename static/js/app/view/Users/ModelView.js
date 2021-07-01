define(function (require) {
  "use strict";
  var $ = require("jquery"),
    _ = require("underscore"),
    Gonrin = require("gonrin");

  var template = require("text!app/view/GianHang/tpl/model.html"),
    schema = require("json!schema/GianHangSchema.json");

  return Gonrin.ModelView.extend({
    template: template,
    modelSchema: schema,
    urlPrefix: "/api/v1/",
    collectionName: "users",
    tools: [
      {
        name: "defaultgr",
        type: "group",
        groupClass: "toolbar-group",
        buttons: [
          {
            name: "back",
            type: "button",
            buttonClass: "btn-default btn-lg",
            label: "TRANSLATE:BACK",
            command: function () {
              var self = this;

              Backbone.history.history.back();
            },
          },
          {
            name: "save",
            type: "button",
            buttonClass: "btn-success btn-lg",
            label: "Lưu gian hàng",
            command: function () {
              var self = this;
              console.log("Thông tin model gian hàng", self.model)
              var currentUserInfo = self.getApp().currentUser;
              self.model.set("chu_gian_hang_id",currentUserInfo.id)
              console.log("currentUserInfo",currentUserInfo)
              self.model.save(null, {
                success: function (model, respose, options) {
                  self
                    .getApp()
                    .notify({
                      message: "Lưu thông tin thành công",
                      type: "success",
                    });
                  self
                    .getApp()
                    .getRouter()
                    .navigate(self.collectionName + "/collection");
                },
                error: function (model, xhr, options) {
                  self.getApp().notify("Lưu thông tin không thành công!");
                },
              });
            },
          },
          {
            name:"addItem",
            type:"button",
            buttonClass:"btn-success btn-lg",
            label:"Thêm mới hàng hóa",
            command:function(){
              let self = this;
              console.log("self",self)
              let url = "hanghoa/model"
              console.log("url",url)
              self.getApp().getRouter().navigate(url)
            }
          },
          {
            name: "delete",
            type: "button",
            buttonClass: "btn-danger btn-lg",
            label: "TRANSLATE:DELETE",
            visible: function () {
              let self = this;
              let currentUserInfo = self.getApp().currentUser;
              let currentUserID = currentUserInfo.id;
              let id = self.getApp().getParameterUrl("id"); //Lấy thông tin param 'id'
              if(id == null){
                return false;
              }
              if(currentUserID == null){
                return false;
              }
              return true
            },
            command: function () {
              var self = this;
              self.model.destroy({
                success: function (model, response) {
                  self
                    .getApp()
                    .notify({
                      message: "Xoá dữ liệu thành công",
                      type: "success",
                    });
                  self
                    .getApp()
                    .getRouter()
                    .navigate(self.collectionName + "/collection");
                },
                error: function (model, xhr, options) {
                  self
                    .getApp()
                    .notify({
                      message: "Xoá dữ liệu không thành công",
                      type: "danger",
                    });
                },
              });
            },
          },
        ],
      },
    ],
    render: function () {
      console.log("Đã vào phần quản lý gian hàng model");
      var self = this;
      let id = self.getApp().getParameterUrl("id"); //Lấy thông tin param 'id'
      console.log("id trong render func modelview",id)
      if (id) {
        this.model.set("id", id);
        this.model.fetch({
          success: function (data) {
            self.applyBindings();
          },
          error: function () {
            self.getApp().notify("Get data Eror");
          },
        });
      } else {
        self.applyBindings();
      }
    },
  });
});
