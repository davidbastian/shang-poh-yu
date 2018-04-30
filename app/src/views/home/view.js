import App from '../../../index.js';
import Data from '../../../common/data/data.json';
import {
    toHTML,
    toSlug
} from '../../../common/utils/utils.js';
import './style.scss';
import SliderModule from '../../modules/module.slider.js';

import {
    ReflectionFilter
} from '@pixi/filter-reflection';
import {
    GlitchFilter
} from '@pixi/filter-glitch';
import {
    BulgePinchFilter
} from '@pixi/filter-bulge-pinch';

import * as PIXI from 'pixi.js';

import {
    TweenMax,
    TimelineMax
} from 'gsap';

import SplitText from '../../../common/plugins/SplitText.min';


class View {
    init(params) {
        const self = this;
        //  console.log('start HomeView', window, params);

        let app = new PIXI.Application(window.innerWidth, window.innerHeight, {
            transparent: true
        });


        const hello = [{
                'char': 'H',
                'x': 800,
                'y': -20
            },
            {
                'char': 'E',
                'x': 1205,
                'y': 97
            },
            {
                'char': 'L',
                'x': 820,
                'y': 335,
            },
            {
                'char': 'L',
                'x': 1220,
                'y': 450,
            },
            {
                'char': 'O',
                'x': 780,
                'y': 695
            }
        ];

        const loader = new PIXI.loaders.Loader();

        for (let i = 0; i < hello.length; i++) {
            const char = hello[i];
            loader.add(char.char + i, 'common/media/chars/' + char.char + '.png');
        }
        loader.add('common/media/archive/001.jpg');
        loader.add('common/media/evinrude/001.jpg');
        loader.add('common/media/mailchimp/001.jpg');
        loader.add('common/media/mustang/001.jpg');


        loader.load(function (loader, r) {
            var container = new PIXI.Container();
            container.filters = null;
            app.stage.addChild(container);

            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xFFFFFF, 1);
            graphics.drawRect(0, 0, window.innerWidth, window.innerHeight);

            container.addChild(graphics);

            for (let j = 0; j < hello.length; j++) {
                const char = hello[j];
                var containerChar = new PIXI.Container();
                var texture = PIXI.Texture.fromImage('common/media/chars/' + char.char + '.png');
                var letter = new PIXI.Sprite(texture);
                letter.scale.x = letter.scale.y = 0.3;
                letter.x = char.x;

                letter.y = char.y;
                containerChar.addChild(letter);

                containerChar.alpha = 0;

                container.addChild(containerChar);

            }

            self.container = container;

            self.setup();


        });
        var video = document.body.querySelector('.logo');
        document.body.querySelector('.logo').addEventListener('click', function () {
            TweenMax.to(video, 1, {
                ease: 'Expo.easeInOut',
                width: '60px',
                height: '60px'
            });
        });

        self.appPIXI = app;




    }

    setup() {
        let markup = `
            <section class="home">
            </section>
        `;
        markup = toHTML(markup);

        let intro = this.setIntro(markup);
        let projects = this.setProjects(markup);
        let about = this.setAbout(markup);
        let recognition = this.setRecognition(markup);
        let contact = this.setContact(markup);

        this.render(markup);
        if (App.singleScroll) {
            App.singleScroll.removeEvents();
            App.singleScroll = null;
        }
    }

    render(markup) {
        document.body.getElementsByTagName('main')[0].innerHTML = markup.outerHTML;




        this.setSlideActive();
        const HomeSlider = new SliderModule({
            wrap: document.body.querySelector('.home'),
            time: 1,
            pos: 100,
            ease: 'Expo.easeInOut'
        });


        if (App.model.slideActive !== 0) {

            TweenMax.fromTo(document.body.querySelectorAll('.slide')[App.model.slideActive].querySelector('.fade-anima'), 1.2, {
                opacity: 0,

            }, {
                opacity: 1,
                ease: Expo.easeInOut,
            });

            TweenMax.fromTo(document.body.querySelectorAll('.slide')[App.model.slideActive].querySelector('.slide-anima'), 1.2, {
                opacity: 0,
            }, {
                opacity: 1,
                ease: Expo.easeInOut,
                onComplete: function () {
                    HomeSlider.goUp(0.5, 1);
                }
            });
        }


        this.setIntroHello();
        this.setTransition();

        for (let i = 0; i < document.body.querySelectorAll('.slide-project').length; i++) {
            const slide = document.body.querySelectorAll('.slide-project')[i];

            slide.querySelector('.intro-p').addEventListener('mouseenter', function () {

                TweenMax.to(slide.querySelector('.line'), 0.5, {
                    ease: 'Expo.easeOut',
                    width: 40
                });


                TweenMax.to(slide.querySelector('.img'), 30, {
                    ease: 'Expo.easeOut',
                    scale: '1.2'
                });

                slide.querySelector('.intro-p').addEventListener('mouseleave', function () {
                    TweenMax.to(slide.querySelector('.line'), 0.5, {
                        ease: 'Expo.easeOut',
                        width: 20
                    });

                    TweenMax.to(slide.querySelector('.img'), 1, {
                        ease: 'Expo.easeOut',
                        scale: '1'
                    });
                });


            });

        }

        var slideFirst = document.body.querySelectorAll('.slide')[0].querySelector('.intro');

        TweenMax.to(slideFirst, 2, {
            opacity: 1,
            delay: 0.8,
            ease: 'Expo.easeInOut'
        });






    }

    setSlideActive() {
        var slides = document.body.querySelectorAll('.slide');

        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];

            //    console.log(App.model.slideActive, i, slide);

            if (App.model.slideActive === i) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }



        }
    }

    setTransition() {
        var slidesProject = document.body.querySelectorAll('.slide-project');

        for (let i = 0; i < slidesProject.length; i++) {
            const slide = slidesProject[i];

            slide.addEventListener('click', function (e) {

                var carousel = slide.querySelector('.carousel');
                var href = slide.getAttribute('href');
                var carouselBounds = carousel.getBoundingClientRect();
                var cln = carousel.cloneNode(true);
                cln.setAttribute('style', 'width:' + carouselBounds.width + 'px; height:' + carouselBounds.height + 'px; left:' + (carouselBounds.left - 60) + 'px;  top:' + (carouselBounds.top - 60) + 'px;');
                var fakeHero = `
                    <div class= 'fake-hero'>

                    </div>
                `;

                fakeHero = toHTML(fakeHero);
                fakeHero.appendChild(cln);
                document.body.appendChild(fakeHero);

                TweenMax.to(cln, 1, {
                    top: '0%',
                    left: '0%',
                    width: '100%',
                    height: '100%',
                    ease: 'Expo.easeInOut',
                    onComplete: function () {
                        if (App.handler) {
                            App.handler.off();
                        }
                        App.heroImage = cln.querySelector('.active').style;

                        window.location.hash = href;

                    }
                });
                e.preventDefault();
            });

        }
    }

    setContact(markup) {
        let contact = `
            <div class="slide contact">
                <div class="content">
                    <div class="slide-anima">
                        <h2>Let's Chat, say hello</h2>
                        
                    </div>
                    <div class="fade-anima">
                            <a href="mailto:${Data.details.email}"><p>${Data.details.email}</p></a>
                            <a href="phone:${Data.details.phone}"><p>${Data.details.phone}</p></a>
                    </div>
                </div>
            </div>
        `;
        contact = toHTML(contact);
        markup.appendChild(contact);

    }


    setAbout(markup) {
        let about = `
            <div class="slide about">
                <div class="content">
                    <div class="slide-anima about-content">
                        <h2>About</h2>
                        <div class="about-info ">
                            <h3>${Data.details.about.intro}</h3>
                            <p>${Data.details.about.info}</p>
                        </div>

                        <div class="about-media fade-anima">
                            <div class="about-media-inner">
                                <div style="background-image:url(${Data.details.about.img})">   </div>    
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        `;
        about = toHTML(about);

        markup.appendChild(about);

    }

    setRecognition(markup) {
        function checkText(logo) {
            let m;
            if (logo.text) {
                m = `
                    <h6>${logo.text}</h6>
                `;
            } else {
                m = ``;
            }
            return m;
        }

        for (let i = 0; i < Data.recognition.length; i++) {
            const recognition = Data.recognition[i];
            let m = `
            <div class="slide recognition">
                    <div class="content">
                        <div class="slide-anima recognition-content">
                            <h3>${recognition.intro}</h3>
                            <div class="fade-anima">    
                            </div>
                        </div>
                    </div>
            </div>
            `
            m = toHTML(m);

            if (recognition.logos.length < 9) {

                for (let j = 0; j < recognition.logos.length; j++) {
                    const logo = recognition.logos[j];
                    let item = `
                <div class="recognition-item">
                    <img src="${logo.img}"></img>
                    ${checkText(logo)}
                </div>
                `;
                    item = toHTML(item);
                    m.querySelector('.fade-anima').appendChild(item);
                }

            } else {
                var recWrapA = `<div class= "recognition-wrap_items active">
                </div>`;

                var recWrapB = `<div class= "recognition-wrap_items">

                </div>`;

                recWrapA = toHTML(recWrapA);
                recWrapB = toHTML(recWrapB);

                for (let j = 0; j < 9; j++) {
                    const logo = recognition.logos[j];
                    let item = `
                <div class="recognition-item">
                    <img src="${logo.img}"></img>
                    ${checkText(logo)}
                </div>
                `;
                    item = toHTML(item);
                    recWrapA.appendChild(item)

                }

                for (let j = 9; j < recognition.logos.length; j++) {
                    const logo = recognition.logos[j];
                    let item = `
                <div class="recognition-item">
                    <img src="${logo.img}"></img>
                    ${checkText(logo)}
                </div>
                `;
                    item = toHTML(item);
                    recWrapB.appendChild(item)

                }

                m.querySelector('.fade-anima').appendChild(recWrapA);
                m.querySelector('.fade-anima').appendChild(recWrapB);
            }

            markup.appendChild(m);

        }

    }

    setIntro(markup) {

        let intro = `
        <div class="slide">
            <div class="content slide-anima">
                <div class="intro">
                    <h3>${Data.details.intro}</h3>
                    <nav>
                        <a href="#" id="see-projects" class="btn "><div class="line" style="width:0px"></div><div class="split">see projects</div></a>
                        <a href="#" id="about" class="btn "><div class="line" style="width:0px"></div><div class="split">about</div></a>
                        <a href="#" id="contact" class="btn "><div class="line" style="width:0px"></div><div class="split">contact</div></a>
                    </nav>
                </div>

                <div id="hello" class="fade-anima"></div>   

            </div>
             
        </div>
        `;

        intro = toHTML(intro);


        markup.appendChild(intro);

    }

    setIntroHello() {
        const self = this;
        var app = this.appPIXI;
        var container = this.container;
        document.body.querySelector('#hello').appendChild(app.view);

        for (let h = 0; h < container.children.length; h++) {
            const c = container.children[h];

            TweenMax.to(c, 2, {
                alpha: 1,
                ease: 'Expo.easeOut',
                delay: (h) * 0.12
            });

            TweenMax.from(c, 2, {
                x: -30,
                ease: 'Expo.easeOut',
                delay: (h) * 0.12,
            });
        }

        setTimeout(function () {
            loadEffects();
        }, 1200);

        function loadEffects() {
            var counter = 0;
            var noclick = true;

            window.addEventListener('mousemove', function (e) {
                if (noclick) {
                    self.setBulgePinchFilter(container, e);
                }
            });

            document.body.querySelectorAll('.slide')[0].addEventListener('click', function (e) {
                noclick = false;
                if (counter === 0) {
                    self.setReflection(container);
                    counter = counter + 1;
                } else if (counter === 1) {
                    self.setGlitch(container);
                    counter = counter + 1;
                } else if (counter === 2) {
                    self.setBulgePinchFilter(container, e);
                    counter = counter + 1;
                } else if (counter === 3) {
                    //  self.resetFilters(container);
                    counter = 0;
                }
            });
        }


        for (let j = 0; j < document.body.querySelectorAll('.slide')[0].querySelectorAll('.btn').length; j++) {
            const btn = document.body.querySelectorAll('.slide')[0].querySelectorAll('.btn')[j];

            btn.addEventListener('mouseenter', function (e) {
                TweenMax.to(btn.querySelector('.line'), 0.5, {
                    ease: 'Expo.easeOut',
                    width: 20
                });

                btn.addEventListener('mouseleave', function (e) {
                    TweenMax.to(btn.querySelector('.line'), 0.5, {
                        ease: 'Expo.easeOut',
                        width: 0
                    });
                });
            });
        }


    }

    resetFilters(container) {
        container.filters = null;
        container.tick = false;
    }

    setBulgePinchFilter(container, pos) {
        const self = this;


        container.filters = null;
        container.tick = false;
        let bulge = new BulgePinchFilter();
        bulge.strength = -1;
        bulge.radius = 660;

        var x = pos.clientX;
        var y = pos.clientY;
        var pX = (x * 1) / window.innerWidth;
        var pY = (y * 1) / window.innerHeight;
        bulge.center[0] = pX;
        bulge.center[1] = pY;

        container.filters = [bulge];


        window.addEventListener('mousemove', function (e) {
            var x = e.clientX;
            var y = e.clientY;
            var pX = (x * 1) / window.innerWidth;
            var pY = (y * 1) / window.innerHeight;
            bulge.center[0] = pX;
            bulge.center[1] = pY;
        });
    }

    setReflection(container) {
        container.filters = null;
        container.tick = true;

        let reflection = new ReflectionFilter();
        reflection.mirror = false;
        reflection.enabled = true;
        reflection.boundary = 0;
        reflection.amplitude[0] = reflection.amplitude[1] = 4;
        reflection.waveLength[0] = reflection.waveLength[1] = 200;

        TweenMax.ticker.addEventListener("tick", function () {
            if (container.tick) {
                reflection.time += 0.1;
            } else {
                reflection.time = 0;
            }
        });
        container.filters = [reflection];
    }

    setGlitch(container) {
        container.filters = null;
        container.tick = false;

        let glitch = new GlitchFilter();
        glitch.fillMode = 4;
        glitch.slices = 5;

        TweenMax.fromTo(glitch, 0.8, {
            slices: 0
        }, {
            slices: 10,
            repeat: -1,
            ease: SteppedEase.config(5)
        });

        container.filters = [glitch];
    }

    setProjects(mainMarkup) {
        for (let i = 0; i < Data.projects.length; i++) {
            const project = Data.projects[i];
            const carousel = this.setCarousel(project.carousel);
            let markup = `
            <a class="slide slide-project"  href="#/${toSlug(project.title)}">
                <div class="content">
                    <div class="intro intro-p slide-anima">
                        <h5>${project.client}</h5>
                        <h2>${project.title}</h2>
                        <div class="btn">
                            <span class ="line"></span>
                            <div>see this case</div>
                        </div>
                    </div>
                </div>
            </a>
            `;

            markup = toHTML(markup);
            markup.querySelector('.content').appendChild(carousel);

            mainMarkup.appendChild(markup);



        }
    }

    setCarousel(carousel) {
        let carouselHTML = `
            <div class="carousel fade-anima">
            </div>
        `;
        carouselHTML = toHTML(carouselHTML);

        const src = carousel[0].src;

        let markup = `       
                 <div class="img active" style="background-image:url(${src})"></div>
            `;

        markup = toHTML(markup);
        carouselHTML.appendChild(markup);
        return carouselHTML;
    }

}

const v = new View();

export default v;