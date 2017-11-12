import Backbone from "Backbone";
import _ from "lodash";
import $ from "jquery";

import Config from "../../config";
import Template from "./template.html"; // template
import "./style.scss"; //styles
import VirtualScroll from "virtual-scroll";

export default function(args) {
  var self;
  var View = Backbone.View.extend({
    tagName: "section",
    className: "single",

    template: _.template(Template),
    targetY:0,
    currentY: 0,
    ease : 0.06,

    initialize: function() {
    
      self = this;
      self.args = args;

     

      self.loader();
      this.setup();
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
        }
      }
    },

    setup: function() {
        
    },

    render: function(project) {
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
        self.targetY -= e.deltaY;
        self.targetY  = Math.max( (self.$el.find('.single-content').height() - $(window).height()) * -1, self.targetY);
        self.targetY = Math.min(0, self.targetY);

      //  console.log(self.targetY);

    },

    scrollAnima:function(){
        var run = function() {
            requestAnimationFrame(run);
            self.currentY += (self.targetY - self.currentY) * self.ease;

            TweenMax.set(self.$el.find('.single-content'),{
                yPercent: (self.currentY*100)/self.$el.find('.single-content').outerHeight()
            })

        }
        
        run();
    },




  });
  new View();
}
