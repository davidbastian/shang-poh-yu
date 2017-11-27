import Backbone from "Backbone";
import _ from "lodash";
import $ from "jquery";
import Router from "../../route";
import VirtualScroll from "virtual-scroll";
import { TweenMax, Expo } from "gsap";

import Config from "../../config";
//import { viewsArray } from "../../views-array";
import Template from "./template.html"; // template
import "./style.scss"; //styles

import animaText from "../../components/animaText";

import ProjectsView from "../projects/view";
import AboutView from "../about/view";
import ContactView from "../contact/view";

import snapSection from "../../components/snapSection";

export default function(args, name) {
  var self;
  var View = Backbone.View.extend({
    tagName: "section",
    className: "home",

    anchor: 0,
    anchorReady: true,
    target: 0,
    currentSection: 0,

    template: _.template(Template),
    initialize: function() {
      self = this;
      self.url = Backbone.history.getFragment();
      self.loader();

    //  viewsArray.push(self);

 

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

      
      ContactView(self.$el.find(".home-wrap"));
      AboutView(self.$el.find(".home-wrap"));
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


        if (self.url === 'projects') {
          console.log(self.url);
          self.currentSection=1;
        } else {
          self.currentSection = 0;

        }
       
      }

      for (var index = 0; index < self.$el.find(".projects-project").length; index++) {
        var section = self.$el.find(".projects-project").eq(index);
        var anima = animaText(section, "chars, words", "reverse", 0.005, 0.6);
        section[0].textAnima =  anima;     
      }

      snapSection(self.currentSection, self.$el,self.$el.find('.home-intro-cta'), self.$el.find('.home-intro-about'), self.$el.find('.home-intro-contact'));

      for (var  span = 0; span < self.$el.find('.home-intro h4 span').length; span++) {
        var intro = animaText(self.$el.find('.home-intro h4 span').eq(span), "chars, words","", 0.04, 0.5);
        intro.play();
      }

      for (var l = 0; l < self.$el.find('.home-intro nav a').length; l++) {
        var link =  animaText(self.$el.find('.home-intro nav a').eq(l), "chars, words","", 0.04, 0.5);
        link.play();
      }

      for (var c = 0; c <= 5; c++) {
        TweenMax.fromTo(self.$el.find('[data-count='+c+']'),1.5,{
          opacity:0,
          xPercent:-20,
        //  scale:0.9,
        },{
          opacity: 1,
        //  scale:1,
          xPercent:0,
          delay:(1)+(0.15*c),
          ease:'Expo.easeOut'
        });
      }
    

    },

    addEvents: function() {
      document.addEventListener("touchmove", function(e) {
        e.preventDefault();
      });

      self.$el
        .find(".projects-project").on("click", self.openProject.bind(this));


    },

    openProject: function(e) {
      var mainCover = self.$el.find(".single-content_video-media");
      var mainCoverPos = mainCover[0].getBoundingClientRect();
      var current = $(e.currentTarget);
      var index =  current.parent().index();
      var currentImage = current.find(".projects-project-image");
      var pos = currentImage[0].getBoundingClientRect();
      var clone = $("<div>");
      var img = currentImage.css("background-image");


      current[0].textAnima.play();
      $("main").addClass("open-single");
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
          self.$el.find(".projects-project").off("click");
        }
      });
    }
  });
  new View();
}
