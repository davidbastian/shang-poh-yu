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
        this.ease = args.ease;
        this.deltaReady = true;


        console.log(this.wrap, 'sliders');
        this.setup();

    }

    setup() {
        const self = this;
        let handler = new VirtualScroll({});

        App.handler = handler;
        handler.on(self.checkDirection.bind(this));

        if (App.model.slideActive !== 0) {
            App.noSlide = true;
            this.goUp(2, 1);
        }

        var intro = document.body.querySelector('#see-projects');
        var about = document.body.querySelector('#about');
        var contact = document.body.querySelector('#contact');

        intro.addEventListener('click', function (e) {
            self.goUp(0, 1);
            e.preventDefault();

        });

        about.addEventListener('click', function (e) {
            self.goUp(0, 5);
            e.preventDefault();

        });

        contact.addEventListener('click', function (e) {
            self.goUp(0, 8);
            e.preventDefault();

        });

    }

    checkDirection(direction) {

        if (this.deltaReady === true) {

            if (!App.noSlide) {
                if (direction.deltaY > 0) {
                    this.goDown(0, 1);
                } else {

                    this.goUp(0, 1);
                }
            }



            this.deltaReady = false;

        }

    }

    goUp(delay, c) {
        const self = this;
        let slides = this.wrap.querySelectorAll('.slide');

        var count = 0;

        var d;
        if (delay) {
            d = 0.8;
        } else {
            d = 0;
        }

        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];

            if (slide.classList.contains('active')) {
                if ((i + 1) >= slides.length) {
                    count = 0;
                } else {
                    count = i + c;
                }
                App.controller.slideActiveUpdate(count);

                const slideNext = slides[count];
                const anima = slide.querySelector('.slide-anima');
                const animaNext = slideNext.querySelector('.slide-anima');


                const fade = slide.querySelector('.fade-anima');
                const fadeNext = slideNext.querySelector('.fade-anima');


                TweenMax.fromTo(fade, self.time, {
                    opacity: 1,
                }, {
                    opacity: 0,
                    ease: self.ease,
                    delay: d
                });

                TweenMax.fromTo(fadeNext, self.time, {
                    opacity: 0,
                }, {
                    opacity: 1,
                    ease: self.ease,
                    delay: d
                });



                TweenMax.fromTo(anima, self.time, {
                    opacity: 1,
                    y: 0,
                }, {
                    opacity: 0,
                    ease: self.ease,
                    y: -self.pos,
                    delay: d


                });


                TweenMax.fromTo(anima, self.time, {
                    opacity: 1,
                    y: 0,
                }, {
                    opacity: 0,
                    ease: self.ease,
                    y: -self.pos,
                    delay: d

                });

                TweenMax.fromTo(animaNext, self.time, {
                    opacity: 0,
                    y: self.pos,
                }, {
                    opacity: 1,
                    ease: self.ease,
                    y: 0,
                    delay: d,
                    onComplete: function () {
                        slide.classList.remove('active');
                        slideNext.classList.add('active');
                        self.deltaReady = true;
                        App.noSlide = false;
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
                if ((i - 1) <= 0) {
                    count = 0;
                } else {
                    count = i - 1;
                }
                App.controller.slideActiveUpdate(count);

                const slidePrev = slides[count];
                const anima = slide.querySelector('.slide-anima');
                const animaPrev = slidePrev.querySelector('.slide-anima');




                const fade = slide.querySelector('.fade-anima');
                const fadePrev = slidePrev.querySelector('.fade-anima');


                TweenMax.fromTo(fade, self.time, {
                    opacity: 1,
                }, {
                    opacity: 0,
                    ease: self.ease
                });

                TweenMax.fromTo(fadePrev, self.time, {
                    opacity: 0,
                }, {
                    opacity: 1,
                    ease: self.ease
                });


                TweenMax.fromTo(anima, self.time, {
                    opacity: 1,
                    y: 0,
                }, {
                    opacity: 0,
                    ease: self.ease,
                    y: self.pos,

                });

                TweenMax.fromTo(animaPrev, self.time, {
                    opacity: 0,
                    y: -self.pos,
                }, {
                    opacity: 1,
                    ease: self.ease,
                    y: 0,
                    onComplete: function () {
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