import Backbone from "Backbone";
import _ from "lodash";
import $ from "jquery";

import Config from "../../config";
import Template from "./template.html"; // template
import "./style.scss"; //styles

import preloader from "preloader";

export default function(args) {
  var self;
  var View = Backbone.View.extend({
    tagName: "section",
    className: "home",

    template: _.template(Template),
    initialize: function() {
      self = this;
      self.loader();
    },

    loader:function(){
      self.render(Config().copydeck);
    },

    setup: function(story) {
      self.render(story);
    },

    render: function(copydeck) {
      var json = {
        info: copydeck.info
      };

      console.log(json);
      var setTemplate = this.template(json);
      var appendData = this.$el.append(setTemplate)[0];
      $("main").html(appendData);
    }
  });
  new View();
}
