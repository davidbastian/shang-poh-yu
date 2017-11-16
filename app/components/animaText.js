import Backbone from "Backbone";
import _ from "lodash";
import $ from "jquery";
import { TweenMax, TimelineMax, Expo } from "gsap";
import SplitText from "../plugins/SplitText.min";

export default function(element, type, direction, delay, timing) {
  var st = new SplitText(element, {
    type: type,
    charsClass: "char",
    wordsClass: "words"
  });

  var tl = new TimelineMax({});
  tl.pause();

  var char = element.find(".words").find(".char");
  var line = element.find(".btn-line");

  if (direction === "reverse") {
    for (var j = 0; j <= char.length; j++) {
      tl.to(line, 0.2, {
        opacity: 0,
        ease: Expo.easeOut
      });

      tl.to(
        char.eq(char.length - j),
        timing,
        {
          opacity: 0,
          ease: Expo.easeOut
        },
        j * delay
      );
    }
  } else {
    for (var j = 0; j <= char.length; j++) {
      tl.to(line, 0.2, {
        opacity: 1,
        ease: Expo.easeOut
      });

      tl.fromTo(
        char.eq(j),
        timing,
        {
          opacity: 0
        },
        {
          opacity: 1,
          ease: Expo.easeOut
        },
        j * delay
      );
    }
  }

  return tl;
}
