// Import thư viện, template linh tinh
define(function (require) {
  "use strict";
  var $ = require("jquery"),
    _ = require("underscore"),
    Gonrin = require("gonrin");

  var template = require("text!app/view/HangHoa/tpl/collection.html");
  var schema = require("json!schema/HangHoaSchema.json");
//   Tạo view
  return Gonrin.CollectionView.extend({
    template: template, // Template jinja (HTML)
    modelSchema: schema, // model của view
    urlPrefix: "/api/v1/", 
    collectionName: "hanghoa",
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
          field: "ma",
          label: "Mã hàng hóa",
        },
        { field: "ten", label: "Tên hàng hóa" },
        { field: "gia", label: "Giá trước vat"},
        { field: "vat", label: "Thuế giá trị gia tăng" },
        { field: "ghichu", label: "Ghi chú" },

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
      let createButton = this.$el.find("[name=create]")
      this.applyBindings();
      return this;
    },
  });
});

