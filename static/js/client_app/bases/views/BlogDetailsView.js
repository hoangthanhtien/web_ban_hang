define(function (require) {
    "use strict";
    var $ = require("jquery"),
      _ = require("underscore"),
      Gonrin = require("gonrin"),
      tpl = require("text!app/bases/tpl/blog_details.html"),
      template = _.template(tpl);
    return Gonrin.View.extend({
      render: function () {
        var self = this;
        self.getApp().currentUser = null;
        this.$el.html(template());
  
        
        return this;
      },
      
    });
  });
  