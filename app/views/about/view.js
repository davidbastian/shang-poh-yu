import Backbone from "Backbone";
import _ from "lodash";
import $ from "jquery";

import Config from "../../config";
import Template from "./template.html"; // template
import "./style.scss"; //styles

//import snapSection from "../../components/snapSection";
import profile from "../../common/media/images/about/i.jpg";

import { TweenMax, TimelineMax, TweenLite } from "gsap";
import { setTimeout } from "timers";

export default function(home) {
  var self;
  var View = Backbone.View.extend({
    tagName: "div",
    className: "about",
    currentSection: 0,
    current: 0,
    template: _.template(Template),
    initialize: function() {
      self = this;
      self.loader();
    },

    setup: function() {},

    loader: function() {
      self.render(Config().copydeck);
    },

    checkCurrent: function() {

        

      
    },

    render: function(copydeck) {
      var json = {
        info: copydeck.info,
        profile: profile
      };

      var setTemplate = this.template(json);
      var appendData = this.$el.append(setTemplate)[0];

      $(appendData).insertAfter(home.find('.home-content'));


    }
  });

  new View();
}
