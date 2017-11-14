import Backbone from "Backbone";
import _ from "lodash";
import $ from "jquery";
import { TweenMax, TimelineMax, Expo } from "gsap";
import SplitText from "../plugins/SplitText.min";
import VirtualScroll from "virtual-scroll";

export default function(sections, current, area) {
  var ready = true;
  var size = sections.length;
  var scroll = new VirtualScroll({
    el: area[0]
  });

  scroll.on(function(e) {
    if (ready === true) {
      ready = false;

      if (e.deltaY < 0) {
        console.log(current);

        if (current <= size - 2) {
          TweenMax.to($(sections[current]), 1, {
            ease: "Expo.easeInOut",
            yPercent: "-=100%",
            onComplete: function() {
              ready = true;
              current = current + 1;
            }
          });

          TweenMax.to($(sections[current + 1]), 1, {
            ease: "Expo.easeInOut",
            yPercent: "-=100"
          });
        } else {
          ready = true;
        }
      } else {

        if (current > 0) {
          TweenMax.to($(sections[current]), 1, {
            ease: "Expo.easeInOut",
            yPercent: "+=100%",
            onComplete: function() {
              ready = true;
              current = current - 1;
            }
          });

          TweenMax.to($(sections[current - 1]), 1, {
            ease: "Expo.easeInOut",
            yPercent: "+=100"
          });
        }else {
          ready = true;
        }


      }

      // ready = false;

      // console.log(counter);

      // $(sections[counter]).next().addClass('active');
    }
  });

  $(sections[current]).addClass("active");
}
