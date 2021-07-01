define(function (require) {
  "use strict";
  var $ = require("jquery"),
    _ = require("underscore"),
    Gonrin = require("gonrin");

  var template = require("text!app/view/Users/tpl/select.html"),
    schema = require("json!schema/UserSchema.json");

  return Gonrin.CollectionDialogView.extend({
    template: template,
    modelSchema: schema,
    urlPrefix: "/api/v1/",
    collectionName: "users",
    textField: "user_name",
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
          field: "phone",
          label: "Mã gian hàng",
          width: 100,
        },

        {
          field: "user_name",
          label: "Tên gian hàng",
          width: 200,
        },
        {
          field: "email",
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
