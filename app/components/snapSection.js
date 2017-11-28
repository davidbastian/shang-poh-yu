import Backbone from "Backbone";
import _ from "lodash";
import $ from "jquery";
import { TweenMax, TimelineMax, Expo } from "gsap";
import SplitText from "../plugins/SplitText.min";
import VirtualScroll from "virtual-scroll";

export default function(current, area, cta, about,contact) {
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

    cta.on("click", function() {
      counter = counter + 1;

      el.eq(current + 1).addClass("active");
      TweenMax.fromTo(
        active,
        1,
        {
          y: 0,
          opacity: 1
        },
        {
          opacity: 0,
          y: -100,
          ease: "Expo.easeInOut",
          onComplete: function() {
            current = current + 1;
            active.removeClass("active");
            ready = true;
          }
        }
      );

      TweenMax.fromTo(
        el.eq(current + 1).find(".js-image"),
        1,
        {
          y: 0,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: "Expo.easeInOut"
        }
      );

      TweenMax.fromTo(
        el.eq(current + 1).find(".js-info"),
        1,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: "Expo.easeInOut"
        }
      );

      return false;
    });



    about.on("click", function() {
      counter = counter + 5;

      el.eq(current + 5).addClass("active");
      TweenMax.fromTo(
        active,
        1,
        {
          y: 0,
          opacity: 1
        },
        {
          opacity: 0,
          y: -100,
          ease: "Expo.easeInOut",
          onComplete: function() {
            current = current + 5;
            active.removeClass("active");
            ready = true;
          }
        }
      );

      TweenMax.fromTo(
        el.eq(current + 5).find(".js-image"),
        1,
        {
          y: 0,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: "Expo.easeInOut"
        }
      );

      TweenMax.fromTo(
        el.eq(current + 5).find(".js-info"),
        1,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: "Expo.easeInOut"
        }
      );

      return false;
    });

    contact.on("click", function() {
      counter = counter + 8;

      el.eq(current + 8).addClass("active");
      TweenMax.fromTo(
        active,
        1,
        {
          y: 0,
          opacity: 1
        },
        {
          opacity: 0,
          y: -100,
          ease: "Expo.easeInOut",
          onComplete: function() {
            current = current + 8;
            active.removeClass("active");
            ready = true;
          }
        }
      );

      TweenMax.fromTo(
        el.eq(current + 8).find(".js-image"),
        1,
        {
          y: 0,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: "Expo.easeInOut"
        }
      );

      TweenMax.fromTo(
        el.eq(current + 8).find(".js-info"),
        1,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: "Expo.easeInOut"
        }
      );

      return false;
    });
  }

  var direction;

  function startScroll() {
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

            if (counter === 1) {
              TweenMax.fromTo(
                active,
                1,
                {
                  y: 0,
                  opacity: 1
                },
                {
                  y: -50,
                  opacity: 0,
                  ease: "Expo.easeInOut"
                }
              );
            }

            TweenMax.fromTo(
              active.find(".js-image"),
              1,
              {
                y: 0,
                opacity: 1
              },
              {
                y: -0,
                opacity: 0,
                ease: "Expo.easeInOut",
                onComplete: function() {
                  current = current + 1;
                  active.removeClass("active");
                  ready = true;
                }
              }
            );

            TweenMax.fromTo(
              next.find(".js-image"),
              1,
              {
                y: 0,
                opacity: 0
              },
              {
                y: -0,
                opacity: 1,
                ease: "Expo.easeInOut"
              }
            );

            TweenMax.fromTo(
              active.find(".js-info"),
              1,
              {
                y: 0,
                opacity: 1
              },
              {
                y: -100,
                opacity: 0,
                ease: "Expo.easeInOut"
              }
            );

            TweenMax.fromTo(
              next.find(".js-info"),
              1,
              {
                y: 100,
                opacity: 0
              },
              {
                y: 0,
                opacity: 1,
                ease: "Expo.easeInOut"
              }
            );
          } else {
            ready = true;
            if (cta) {
            //  Backbone.history.navigate("#/about", { trigger: true });
            }
          }
        } else {
          ready = false;

          if (counter > 0) {
            counter = counter - 1;
            direction = "top";
            prev.addClass("active");

            console.log(counter);

            if (counter === 0) {
              TweenMax.fromTo(
                prev,
                1,
                {
                  y: -100,
                  opacity: 0
                },
                {
                  y: -0,
                  opacity: 1,
                  ease: "Expo.easeInOut"
                }
              );
            }

            TweenMax.fromTo(
              active.find(".js-info"),
              1,
              {
                y: 0,
                opacity: 1
              },
              {
                y: 100,
                opacity: 0,
                ease: "Expo.easeInOut",
                onComplete: function() {
                  current = current - 1;
                  active.removeClass("active");
                  ready = true;
                }
              }
            );

            TweenMax.fromTo(
              active.find(".js-image"),
              1,
              {
                y: 0,
                opacity: 1
              },
              {
                y: 0,
                opacity: 0,
                ease: "Expo.easeInOut"
              }
            );

            TweenMax.fromTo(
              prev.find(".js-info"),
              1,
              {
                y: -100,
                opacity: 0
              },
              {
                y: 0,
                opacity: 1,
                ease: "Expo.easeInOut"
              }
            );

            TweenMax.fromTo(
              prev.find(".js-image"),
              1,
              {
                y: 0,
                opacity: 0
              },
              {
                y: 0,
                opacity: 1,
                ease: "Expo.easeInOut"
              }
            );
          } else {
            ready = true;
          }
        }
      }
    });
  }
  startScroll();
}
