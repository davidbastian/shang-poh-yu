import Backbone from "Backbone";
import _ from "lodash";
import $ from "jquery";
import { TweenMax, TimelineMax, Expo } from "gsap";
import {viewsArray} from '../../views-array';

import Config from "../../config";
import Template from "./template.html"; // template
import "./style.scss"; //styles
import VirtualScroll from "virtual-scroll";


export default function(args,name) {
  var self;
  var View = Backbone.View.extend({
    tagName: "section",
    className: "single",

    template: _.template(Template),
    targetY:0,
    currentY: 0,
    ease : 0.1,
    scrollActive:true,

    initialize: function() {
    
      self = this;
      self.args = args;

      self.loader();
      viewsArray.push(self);

      console.log(viewsArray);
    },

    loader: function() {
      self.getCurrent(Config().copydeck.projects);
    },

    permalink: function(val) {
      var removeTag = val.replace(/<\/?[^>]+(>|$)/g, " ");
      var spaces = removeTag.replace(/\s+/g, "-").toLowerCase();
      var special = spaces.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
      var slug = special.toLowerCase();

      return slug;
    },

    getCurrent: function(projects) {
      for (var i = 0; i < projects.length; i++) {
        var project = projects[i];
        var title = project.title;
        if (self.permalink(title) === self.args) {
          self.render(project);
          console.log(project);
         
          self.current = i+1;
        }
      }
    },


    render: function(project) {
      $('section').remove();
      var json = {
        project: project
      };
      console.log(json);
      var setTemplate = this.template(json);
      var appendData = this.$el.append(setTemplate)[0];
      
      $("main").append(appendData);


      self.scrollAnima();

      self.scroll = new VirtualScroll({
        el: self.el
      });

      self.addEvents();

    },

    addEvents:function(){

        document.addEventListener('touchmove', function(e) { 
            e.preventDefault(); 
        });

        self.scroll.on(self.onScroll);

    },

    onScroll: function(e) {
        self.targetY += e.deltaY;
        self.targetY  = Math.max( (self.$el.find('.single-content').height() - $(window).height()) * -1, self.targetY);
        self.targetY = Math.min(0, self.targetY);

      //  console.log(self.targetY);

    },

    scrollAnima:function(){
        var run = function() {

            requestAnimationFrame(run);

            if (self.scrollActive === true) {
            self.currentY += (self.targetY - self.currentY) * self.ease;

            TweenMax.set(self.$el.find('.single-content'),{
                yPercent: (self.currentY*100)/self.$el.find('.single-content').outerHeight()
            });

            for (let index = 0; index < self.$el.find('.single-content_block-media-item').length; index++) {
              var element = self.$el.find('.single-content_block-media-item').eq(index);
              var top = $(window).height() - element[0].getBoundingClientRect().top;
              if (top > 100) {
                TweenMax.to(element.find('div'),2.5,{
                  y:0,
                  opacity:1,
                  ease:Expo.easeOut,
                });
              }
            }

            var bottom = $(window).height() - $('.single-content_awards')[0].getBoundingClientRect().bottom;

        //    console.log(bottom);

            if (bottom > 50) {
              $('main').attr('data-last',self.current);
              $('main').addClass('open-home');
              self.scrollActive = false;
              
              
              TweenMax.to(self.$el,0.5,{
                opacity:0,
                ease:Expo.easeInOut,
                onComplete:function(){
                  self.scroll.off(self.onScroll);
                  Backbone.history.navigate('#/', { trigger: true });
                }
              });
              
            }

          }
           

        };
        
        run();
    },




  });
  new View();
}
