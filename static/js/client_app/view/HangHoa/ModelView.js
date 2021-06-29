define(function (require) {
  "use strict";
  var $ = require("jquery"),
    _ = require("underscore"),
    Gonrin = require("gonrin");

  var template = require("text!app/view/HangHoa/tpl/model.html"),
    schema = require("json!schema/HangHoaSchema.json"),
    GianHangSelectView = require('app/view/GianHang/SelectView')

  return Gonrin.ModelView.extend({
    template: template,
    modelSchema: schema,
    urlPrefix: "/api/v1/",
    collectionName: "hanghoa",
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
            label: "Lưu",
            command: function () {
              var self = this;
              var currentUserInfo = self.getApp().currentUser;
              var id_gian_hang = self.model.get("gianhang_uid");
              self.model.save(null, {
                success: function (model, respose, options) {
                  self.getApp().notify({
                    message: "Lưu thông tin thành công",
                    type: "success",
                  });
                  self
                    .getApp()
                    .getRouter()
                    .navigate("gianhang/model?id=" + id_gian_hang);
                },
                error: function (model, xhr, options) {
                  self.getApp().notify("Lưu thông tin không thành công!");
                },
              });
            },
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
              if (id == null) {
                return false;
              }
              if (currentUserID == null) {
                return false;
              }
              return true;
            },
            command: function () {
              var self = this;
              self.model.destroy({
                success: function (model, response) {
                  self.getApp().notify({
                    message: "Xoá dữ liệu thành công",
                    type: "success",
                  });
                  self
                    .getApp()
                    .getRouter()
                    .navigate(self.collectionName + "/collection");
                },
                error: function (model, xhr, options) {
                  self.getApp().notify({
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
    uiControl: {
      fields: [
        {
          field: "gianhang",
          uicontrol: "ref",
          textField: "ten_gian_hang",
          foreignRemoteField: "id",
          foreignField: "id",
          selectionMode: "single",
          dataSource: GianHangSelectView,
        },
        {
          field: "trang_thai",
          uicontrol: "combobox",
          textField: "name",
          valueField: "value",
          dataSource: [
            { name: "Acitve", value: "1" },
            { name: "Deactive", value: "0" },
          ],
        },
      ],
    },

    render: function () {
      var self = this;
      let id = self.getApp().getParameterUrl("id"); //Lấy thông tin param 'id'
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
