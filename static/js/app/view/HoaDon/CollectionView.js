// Import thư viện, template linh tinh
define(function (require) {
  "use strict";
  var $ = require("jquery"),
    _ = require("underscore"),
    Gonrin = require("gonrin");

  var template = require("text!app/view/HoaDon/tpl/collection.html");
  var schema = require("json!schema/HoaDonSchema.json");
  //   Tạo view
  return Gonrin.CollectionView.extend({
    template: template, // Template jinja (HTML)
    modelSchema: schema, // model của view
    urlPrefix: "/api/v1/",
    collectionName: "hoadon",
    tools: [
      {
        name: "default",
        type: "group",
        groupClass: "toolbar-group",
        buttons: [],
      },
    ],
    uiControl: {
      fields: [
        {
          field: "id",
          label: "Mã hóa đơn",
        },
        { field: "khach_hang", label: "Tên khách hàng", textField: "full_name" },
        { field: "khach_hang", label: "SĐT", textField: "phone" },
        { field: "khach_hang", label: "Email", textField: "email" },
        { field: "ngaymua", label: "Ngày mua" },
        { field: "thanhtien", label: "Thành tiền" },
        { field: "tongtien", label: "Tổng tiền" },
        { field: "ghichu", label: "Ghi chú" },
        { field: "trangthai", label: "Trạng thái" },
      ],
      onRowClick: function (event) {
        if (event.rowId) {
          var path = this.collectionName + "/model?id=" + event.rowId;
          this.getApp().getRouter().navigate(path);
        }
      },
    },
    render: function () {
      console.log("Hoa don collectionview rendered");
      this.applyBindings();
      return this;
    },
  });
});
