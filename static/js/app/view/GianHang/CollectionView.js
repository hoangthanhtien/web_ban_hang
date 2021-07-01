// Import thư viện, template linh tinh
define(function (require) {
  "use strict";
  var $ = require("jquery"),
    _ = require("underscore"),
    Gonrin = require("gonrin");

  var template = require("text!app/view/GianHang/tpl/collection.html");
  var schema = require("json!schema/GianHangSchema.json");
  var itemView = require("text!app/view/HangHoa/ItemView.js");
  //   Tạo view
  return Gonrin.CollectionView.extend({
    template: template, // Template jinja (HTML)
    modelSchema: schema, // model của view
    urlPrefix: "/api/v1/",
    collectionName: "gianhang",
    tools: [
      {
        name: "default",
        type: "group",
        groupClass: "toolbar-group",
        buttons: [
          {
            name: "create",
            type: "button",
            buttonClass: "btn-success btn-lg",
            label: "Tạo mới",
            command: function () {
              var self = this;
              var path = self.collectionName + "/model";
              self.getApp().getRouter().navigate(path);
            },
          },
          // {
          //   name: "update",
          //   type: "button",
          //   buttonClass: "btn-primary btn-lg",
          //   label: "Chỉnh sửa",
          //   command: function () {
          //     var self = this;
          //     var path = self.collectionName + "/model";
          //     self.getApp().getRouter().navigate(path);
          //   },
          // },
          // {
          //   name: "delete",
          //   type: "button",
          //   buttonClass: "btn-danger btn-lg",
          //   label: "Xóa",
          //   command: function () {
          //     var self = this;
          //     var path = self.collectionName + "/model";
          //     self.getApp().getRouter().navigate(path);
          //   },
          // },
        ],
      },
    ],
    uiControl: {
      fields: [
        {
          field: "id",
          label: "ID",
        },
        { field: "ma_gian_hang", label: "Mã gian hàng" },
        { field: "ten_gian_hang", label: "Tên gian hàng", width: 250 },
        {
          field: "items",
          uicontrol: false,
          itemView: itemView,
          tools: [
            {
              name: "create",
              type: "button",
              buttonClass: "btn btn-primary btn-sm",
              label: "Thêm hàng hóa",
              command: "create",
              visible: function () {
                return true;
              },
            },
          ],
          toolEl: "#add_row1",
        }
        // { field: "", label: "Giá" },
      ],
      onRowClick: function (event) {
        if (event.rowId) {
          var path = this.collectionName + "/model?id=" + event.rowId;
          this.getApp().getRouter().navigate(path);
        }
      },
    },
    render: function () {
      let self = this;
      let createButton = this.$el.find("[name=create]");
      console.log("createButton", createButton);
      console.log("Đã vào collection view gianhang");
      this.applyBindings();
      return this;
    },
  });
});
