import Backbone from "Backbone";
import _ from "lodash";
import $ from "jquery";
import { TweenMax, TimelineMax, Expo } from "gsap";
import SplitText from "../plugins/SplitText.min";
import VirtualScroll from "virtual-scroll";

export default function(current, area,cta) {
  var counter = current;
  var el = area.find(".scroll-section");
  var ready = true;
  var size = el.length - 1;
  var scroll = new VirtualScroll({
    el: area[0]
  });

  

  var active = el.eq(current);

  active.addClass("active");

  if (cta) {
  cta.on('click',function(){
    counter = counter + 1;
    el.eq(current + 1).addClass('active');
    
        TweenMax.fromTo(
          active,
          1,
          {
            yPercent: 0
          },
          {
            yPercent: -140,
            ease: "Expo.easeInOut",
            onComplete: function() {
              current = current + 1;
              active.removeClass("active");
              ready = true;
            }
          }
        );

        TweenMax.fromTo(
          el.eq(current + 1),
          1,
          {
            yPercent: 140
          },
          {
            yPercent: 0,
            ease: "Expo.easeInOut"
          }
        );
        return false;
        
  });
}

  var direction;
  scroll.on(function(e) {

    if (ready === true) {
      ready = false;


      var active = el.eq(current);
      var next = el.eq(current + 1);
      var prev = el.eq(current - 1);

      if (e.deltaY < 0) {
        if (counter < size) {
          counter = counter + 1;
          direction = "bottom";
          next.addClass("active");
          TweenMax.fromTo(
            active,
            1,
            {
              yPercent: 0
            },
            {
              yPercent: -140,
              ease: "Expo.easeInOut",
              onComplete: function() {
                current = current + 1;
                active.removeClass("active");
                ready = true;
              }
            }
          );

          TweenMax.fromTo(
            next,
            1,
            {
              yPercent: 140
            },
            {
              yPercent: 0,
              ease: "Expo.easeInOut"
            }
          );
        } else {
          ready = true;
        }
      } else {
        ready = false;

        if (counter > 0) {
          counter = counter - 1;
          direction = "top";

          prev.addClass("active");

          TweenMax.fromTo(
            active,
            1,
            {
              yPercent: 0
            },
            {
              yPercent: 140,
              ease: "Expo.easeInOut",
              onComplete: function() {
                current = current - 1;
                active.removeClass("active");
                ready = true;
              }
            }
          );

          TweenMax.fromTo(
            prev,
            1,
            {
              yPercent: -140
            },
            {
              yPercent: 0,
              ease: "Expo.easeInOut"
            }
          );
        } else {
          ready = true;
        }
      }
    }

  /*  console.log(counter, size);
    if (counter === 1) {
      Backbone.history.navigate("#/projects", { trigger: false, replace: false });
    } else if (current === 0) {
      Backbone.history.navigate("#/", { trigger: false, replace: false });
    }*/

  });
}
