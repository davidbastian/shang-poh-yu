import Backbone from "Backbone";
import _ from "lodash";
import $ from "jquery";

import Config from "../../config";
import Template from "./template.html"; // template
import "./style.scss"; //styles


import snapSection from "../../components/snapSection";
import profile from "../../common/media/images/about/i.jpg";

export default function() {
  var self;
  var View = Backbone.View.extend({
    tagName: "section",
    className: "about",
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
      var current = $("main").attr("data-last");

      if (current) {
        self.currentSection = parseInt(current);

        TweenMax.to(self.$el, 0.5, {
          opacity: 1,
          ease: Expo.easeInOut,
          onComplete: function() {
            $("main").removeClass("open-home");
          }
        });
      } else {
        self.currentSection = 0;
      }

      snapSection(self.currentSection, self.$el);
    },

    render: function(copydeck) {
      var json = {
        info: copydeck.info,
        profile: profile
      };

      var setTemplate = this.template(json);
      var appendData = this.$el.append(setTemplate)[0];
      $("main").html(appendData);
      self.checkCurrent();
    }
  });

  new View();
}
