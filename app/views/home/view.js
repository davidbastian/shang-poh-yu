import Backbone from "Backbone";
import _ from "lodash";
import $ from "jquery";

import Config from "../../config";
import Template from "./template.html"; // template
import "./style.scss"; //styles

import preloader from "preloader";

function requireAll( requireContext ) {
    return requireContext.keys().map( requireContext );
}
var Projects = requireAll( require.context("../../common/data/projects", false, /.json$/) );

console.log(Projects);

export default function(args) {
  var self;
  var View = Backbone.View.extend({
    tagName: "section",
    className: "home",

    template: _.template(Template),
    initialize: function() {
      self = this;
      self.render();
    },

    loader:function(){

    },

    setup: function(story) {
      self.render(story);
    },

    render: function(story) {
      var json = {
      };

      console.log(json);
      var setTemplate = this.template(json);
      var appendData = this.$el.append(setTemplate)[0];
      $("main").html(appendData);
    }
  });
  new View();
}
