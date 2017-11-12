import Backbone from "Backbone";
import _ from "lodash";
import $ from "jquery";
import { TweenMax, TimelineMax, Expo } from "gsap";
import SplitText from "../plugins/SplitText.min";

export default function(element, type,direction,delay,timing) {
    
  var st = new SplitText(element, {
    type: type,
    charsClass: "char",
    wordsClass: "words"
  });

  var tl = new TimelineMax({});
  

  var char = element.find(".words").find(".char");
  var line = element.find(".btn-line");

  TweenMax.to(line,0.5,{
    opacity: 0,
    ease: Expo.easeOut
  });

  for (var j = 0; j <= char.length; j++) {
    tl.to(
      char.eq(char.length- j),
      0.6,
      {
        opacity: 0,
        ease: Expo.easeOut
      },
      j * 0.005
    );
  }

  //  return p;
}
