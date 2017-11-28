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

     var introA = animaText(self.$el.find('.home-intro h4 span').eq(0), "chars, words","", 0.04, 0.5);
      var introB = animaText(self.$el.find('.home-intro h4 span').eq(1), "chars, words","", 0.04, 0.5);
      var introC = animaText(self.$el.find('.home-intro h4 span').eq(2), "chars, words","", 0.04, 0.5);
      introA.play();

      setTimeout(function(){
        introB.play();
      },3000);

      setTimeout(function(){

        introC.play();
      },3500);

      var linkA =  animaText(self.$el.find('.home-intro nav a').eq(0), "chars, words","", 0.04, 0.5);
      var linkB =  animaText(self.$el.find('.home-intro nav a').eq(1), "chars, words","", 0.04, 0.5);
      var linkC =  animaText(self.$el.find('.home-intro nav a').eq(2), "chars, words","", 0.04, 0.5);

     
        setTimeout(function(){
        linkA.play();
      },5000);

      setTimeout(function(){
        linkB.play();
      },5200);

      setTimeout(function(){
        linkC.play();
      },5400);



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

        self.$el.find('.projects-project-info').on('mouseenter',self.onMouseEnter.bind(this));
        self.$el.find('.projects-project-info').on('mouseleave',self.onMouseLeave.bind(this));

    },

    onMouseEnter:function(e){
      var el = $(e.currentTarget);
      var line =  el.find('.btn-line');

      TweenMax.to(line,0.5,{
        width:40,
        ease:'Expo.easeOut'
      });
      
    },

    onMouseLeave:function(e){
      var el = $(e.currentTarget);
      var line =  el.find('.btn-line');

      TweenMax.to(line,0.5,{
        width:20,
        ease:'Expo.easeOut'
      });

     
      
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
