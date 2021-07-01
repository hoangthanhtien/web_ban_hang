define(function (require) {
  "use strict";
  var $ = require("jquery");
  var _ = require("underscore");
  var Gonrin = require("gonrin");
  var template = require("text!app/view/HangHoa/tpl/items.html"),
      schema = require("json!schema/organization_contact_relationSchema.json");

  return Gonrin.ItemView.extend({
    bindings: "data-bind",
    template: template,
    tagName: "tr",
    modelSchema: schema,
    // modelClass: Model,
    urlPrefix: "/api/v1/",
    collectionName: "hanghoa",
    foreignRemoteField: "id",
    foreignField: "id",

    uiControl: {
      fields: [
        
      ]
    },
    render: function () {
      var self = this;
//       if (!self.model.get("id")) {
//         self.model.set("id", gonrin.uuid());
//       }
      // console.log("<><><><><>",self.model.get("id"))
      this.applyBindings();

      self.$el.find("#itemRemove").unbind("click").bind("click", function () {
        self.remove(true);
      });
      
    },
   
  });

});
