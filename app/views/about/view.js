import Backbone from "Backbone";
import _ from "lodash";
import $ from "jquery";

import Config from "../../config";
import Template from "./template.html"; // template
import "./style.scss"; //styles

import snapSection from "../../components/snapSection";
import profile from "../../common/media/images/about/i.jpg";

import { TweenMax, TimelineMax, TweenLite } from "gsap";
import { setTimeout } from "timers";

export default function() {
  var self;
  var View = Backbone.View.extend({
    tagName: "section",
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
      var current = $("main").attr("data-last");

      $("main").removeClass("open-home");
      self.currentSection = 0;

      setTimeout(function(){

        snapSection(self.currentSection, self.$el);
        
      },1000);
      
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

      TweenMax.fromTo(
        self.$el,
        1,
        {
          opacity: 0
        },
        {
          opacity: 1,
          ease: "Expo.easeInOut",
          onComplete:function(){
            
          }
        }
      );

      var t = new TimelineMax({repeat:-1,yoyo:true,repeatDelay:4});

      t.fromTo(
        self.$el.find(".js-carousel img").eq(0),
        1,
        {
          opacity: 0
        },
        {
          opacity: 1,
          ease: "Expo.easeInOut"
        }
      );
    }
  });

  new View();
}
