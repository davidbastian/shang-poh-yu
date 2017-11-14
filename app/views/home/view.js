import Backbone from "Backbone";
import _ from "lodash";
import $ from "jquery";
import Router from "../../route";
import VirtualScroll from "virtual-scroll";
import { TweenMax, Expo } from "gsap";

import Config from "../../config";
import { viewsArray } from "../../views-array";
import Template from "./template.html"; // template
import "./style.scss"; //styles

import animaText from "../../components/animaText";

import ProjectsView from "../projects/view";

import snapSection from "../../components/snapSection";

export default function(args, name) {
  var self;
  var View = Backbone.View.extend({
    tagName: "section",
    className: "home",

    anchor: 0,
    anchorReady: true,
    target: 0,
    currentSection: 2,

    template: _.template(Template),
    initialize: function() {
      self = this;
      self.loader();

      viewsArray.push(self);
    },

    loader: function() {
      self.render(Config().copydeck);
    },

    render: function(copydeck) {
      var json = {
        info: copydeck.info
      };

      var setTemplate = this.template(json);
      var appendData = this.$el.append(setTemplate)[0];
      $("main").html(appendData);

      ProjectsView(self.$el.find(".home-wrap"));

     
      self.checkCurrent();

      

      self.addEvents();
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

       var sections = [];
      var scrollSection = self.$el.find(".scroll-section");

      for (let index = 0; index < scrollSection.length; index++) {
        sections.push(scrollSection[index]);
      }


      snapSection(sections, self.currentSection, self.$el);
    },

    addEvents: function() {
      document.addEventListener("touchmove", function(e) {
        e.preventDefault();
      });

      self.$el
        .find(".projects-project")
        .on("click", self.openProject.bind(this));
    },

    openProject: function(e) {
      var mainCover = self.$el.find(".single-content_video-media");
      var mainCoverPos = mainCover[0].getBoundingClientRect();
      var current = $(e.currentTarget);
      var currentImage = current.find(".projects-project-image");
      var pos = currentImage[0].getBoundingClientRect();
      var clone = $("<div>");
      var img = currentImage.css("background-image");

      $("main").addClass("open-single");

      animaText(current, "chars, words", "reverse", 0.005, 0.6);

      TweenMax.set(currentImage, {
        css: {
          opacity: "0"
        }
      });

      TweenMax.set(clone, {
        css: {
          width: pos.width,
          x: pos.left,
          y: pos.top,
          height: pos.height,
          position: "absolute",
          "background-image": img,
          "background-size": "cover",
          "background-position": "center"
        }
      });

      $("main").append(clone);

      TweenMax.to(clone, 1, {
        css: {
          width: mainCoverPos.width,
          x: mainCoverPos.left,
          y: mainCoverPos.top,
          height: mainCoverPos.height
        },
        ease: Expo.easeInOut,
        onComplete: function() {
          console.log(Config(), "hola");
          $("main").removeClass("open-single");
          self.$el.remove();
          clone.remove();
         // self.scroll.off(self.onScroll);
          self.$el.find(".projects-project").off("click");
        }
      });
    },

    onScroll: function(e) {
      var container = self.$el.find(".home-wrap");
      var scrollSection = self.$el.find(".scroll-section").length;
      var delta = e.deltaY;

      var target = 100 / scrollSection;

      if (self.anchorReady === true) {
        self.anchorReady = false;

        if (delta < 0) {
          self.target = self.target - target;
        } else {
          self.target = self.target + target;
        }

        if (self.target <= 0) {
          TweenMax.to(container, 1, {
            ease: "Expo.easeInOut",
            yPercent: self.target,
            onComplete: function() {
              self.anchorReady = true;
            }
          });
        } else {
          self.target = 0;
        }
      }
    }
  });
  new View();
}
