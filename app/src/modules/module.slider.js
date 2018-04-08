import App from '../../index.js';
import VirtualScroll from 'virtual-scroll';
import {
    TweenMax
} from 'gsap';

class SliderModule {
    constructor(args) {
        this.wrap = args.wrap;
        this.pos = args.pos;
        this.time = args.time;
        this.deltaReady = true;

        console.log(this.wrap, 'sliders');
        this.setup();

    }

    setup() {
        const self = this;
        let handler = new VirtualScroll({});
        handler.on(self.checkDirection.bind(this));
    }

    checkDirection(direction) {

        if (this.deltaReady === true) {

            if (direction.deltaY > 0) {
                this.goUp();
            } else {

                this.goDown();
            }

            this.deltaReady = false;

        }

    }

    goUp() {
        const self = this;
        let slides = this.wrap.querySelectorAll('.slide');
        let count = 0;

        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];

            if (slide.classList.contains('active')) {
                if ((i+1) >= slides.length) {
                    count = 0;
                } else {
                    count = i+1;
                }
                App.controller.slideActiveUpdate(count);

                const slideNext = slides[count];
                const anima = slide.querySelector('.slide-anima');
                const animaNext = slideNext.querySelector('.slide-anima');

                TweenMax.fromTo(anima, self.time, {
                    opacity: 1,
                    y: 0,
                }, {
                    opacity: 0,
                    ease: 'Power2.easeOut',
                    y: -self.pos,

                });

                TweenMax.fromTo(animaNext, self.time, {
                    opacity: 0,
                    y: self.pos,
                }, {
                    opacity: 1,
                    ease: 'Power2.easeOut',
                    y: 0,
                    onComplete:function(){      
                         slide.classList.remove('active');
                         slideNext.classList.add('active');
                         self.deltaReady = true;
                    }
                });
            }
        }

    }

    goDown() {
        const self = this;
        let slides = this.wrap.querySelectorAll('.slide');
        let count = 0;

        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];

            if (slide.classList.contains('active')) {
                if ((i-1) <= 0) {
                    count = 0;
                } else {
                    count = i-1;
                }
                App.controller.slideActiveUpdate(count);

                const slidePrev = slides[count];
                const anima = slide.querySelector('.slide-anima');
                const animaPrev = slidePrev.querySelector('.slide-anima');

                TweenMax.fromTo(anima, self.time, {
                    opacity: 1,
                    y: 0,
                }, {
                    opacity: 0,
                    ease: 'Power2.easeOut',
                    y: self.pos,

                });

                TweenMax.fromTo(animaPrev, self.time, {
                    opacity: 0,
                    y: -self.pos,
                }, {
                    opacity: 1,
                    ease: 'Power2.easeOut',
                    y: 0,
                    onComplete:function(){      
                         slide.classList.remove('active');
                         slidePrev.classList.add('active');
                         self.deltaReady = true;
                    }
                });
            }
        }
    }


}

export default SliderModule;