define(function (require) {
  "use strict";
  var $ = require("jquery"),
    _ = require("underscore"),
    Gonrin = require("gonrin");

  var template = require("text!app/view/GianHang/tpl/select.html"),
    schema = require("json!schema/GianHangSchema.json");

  return Gonrin.CollectionDialogView.extend({
    template: template,
    modelSchema: schema,
    urlPrefix: "/api/v1/",
    collectionName: "gianhang",
    textField: "ten_gian_hang",
    valueField: "id",
    tools: [
      {
        name: "defaultgr",
        type: "group",
        groupClass: "toolbar-group",
        buttons: [
          {
            name: "select",
            type: "button",
            buttonClass: "btn-success btn-sm",
            label: "TRANSLATE:SELECT",
            command: function () {
              var self = this;
              self.trigger("onSelected");
              self.close();
            },
          },
        ],
      },
    ],
    uiControl: {
      fields: [
        {
          field: "ma_gian_hang",
          label: "Mã gian hàng",
          width: 100,
        },

        {
          field: "ten_gian_hang",
          label: "Tên gian hàng",
          width: 200,
        },
        {
          field: "loai_gian_hang",
          label: "Loại gian hàng",
          width: 200,
        },
      ],

      onRowClick: function (event) {
        this.uiControl.selectedItems = event.selectedItems;
        var self = this;
        self.trigger("onSelected");
        self.close();
      },
    },
    render: function () {
      var self = this;

      self.applyBindings();

      return this;
    },
  });
});
