// Import thư viện, template linh tinh
define(function (require) {
  "use strict";
  var $ = require("jquery"),
    _ = require("underscore"),
    Gonrin = require("gonrin");

  var template = require("text!app/view/HoaDon/tpl/chitiethd_collection.html");
  var schema = require("json!schema/ChiTietHoaDonSchema.json");
  //   Tạo view
  return Gonrin.CollectionView.extend({
    template: template, // Template jinja (HTML)
    modelSchema: schema, // model của view
    urlPrefix: "/api/v1/",
    collectionName: "chitiethoadon",
    tools: [
      {
        name: "default",
        type: "group",
        groupClass: "toolbar-group",
        buttons: [
          {
            name: "Quay lại",
            type: "button",
            buttonClass: "btn-default btn-md",
            label: "TRANSLATE:BACK",
            command: function () {
              var self = this;
              Backbone.history.history.back();
            },
          },
          {
            name: "confirm",
            type: "button",
            buttonClass: "btn-success btn-md",
            label: "Duyệt đơn",
            command: function () {
              var self = this;
              let id = self.getApp().getParameterUrl("id"); 
              let status = "Thành công"
              let url_path = self.getApp().serviceURL+"/confirm_purchase_order?id="+id+"&status="+status
              $.ajax({
                url: url_path,
                type:"GET",
                success: function(){
                  self.getApp().notify({message:"Duyệt đơn thành công"},{type : "success"})
                  Backbone.history.history.back()
                },
                error: function(){
                  self.getApp().notify({message:"Duyệt đơn thất bại"},{type : "danger"})
                }

              })
            },
          },
          {
            name: "reject",
            type: "button",
            buttonClass: "btn-danger btn-md",
            label: "Hủy đơn",
            command: function () {
              var self = this;
              let id = self.getApp().getParameterUrl("id"); 
              let status = "Hủy"
              let url_path = self.getApp().serviceURL+"/confirm_purchase_order?id="+id+"&status="+status
              $.ajax({
                url: url_path,
                type:"GET",
                success: function(){
                  self.getApp().notify({message:"Hủy đơn thành công"},{type : "success"})
                  Backbone.history.history.back()
                },
                error: function(){
                  self.getApp().notify({message:"Hủy đơn thất bại"},{type : "danger"})
                }
              })
            },
          },
        ],
      },
    ],
    uiControl: {
      fields: [
	      {field:"hanghoa",label:"Mã hàng hóa",textField:"ma"},
	      {field:"hanghoa",label:"Tên hàng hóa",textField:"ten"},
	      {field:"hanghoa",label:"Đơn giá",textField:"gia"},
	      {field:"hanghoa",label:"VAT",textField:"vat"},
	      {field:"hanghoa",label:"Ghi chú",textField:"ghichu"},
      ],
      onRowClick: function (event) {
        if (event.rowId) {
          var path = this.collectionName + "/model?id=" + event.rowId;
          this.getApp().getRouter().navigate(path);
        }
      },
    },
    render: function () {
      console.log("Chi tiet Hoa don collectionview rendered");
      let self = this;
      let hoadon_id = self.getApp().getParameterUrl("id");
      self.uiControl.filters = { hoadon_id: { $eq: hoadon_id } }
      this.applyBindings();
      // self.getHoaDon();
      return this;
    },
    // getHoaDon: function () {
    //   let self = this;
    //   let hoadon_id = self.getApp().getParameterUrl("id");
    //   console.log("Hoa don ID trong filter", hoadon_id);
    //   self
    //     .getCollectionElement()
    //     .data("gonrin")
    //     .filter({
    //       $and: [{ hoadon_id: { $eq: hoadon_id } }],
    //     });
    // },
  });
});
