define(function (require) {
    "use strict";
    console.log("DA vao day")
    var $ = require("jquery"),
      _ = require("underscore"),
      Gonrin = require("gonrin"),
      tpl = require("text!app/view/about/tpl/about.html"),
      template = _.template(tpl);
    return Gonrin.View.extend({
      render: function () {
        var self = this;
        console.log("Da vao about")
        // this.$el.html(template());
  
        
        return this;
      },
      
    });
  });
  