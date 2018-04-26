import App from '../../../index.js';
import Data from '../../../common/data/data.json';
import {
    toHTML,
    toSlug
} from '../../../common/utils/utils.js';
import './style.scss';
import {
    constrain
} from '../../../common/utils/utils';

import VirtualScroll from 'virtual-scroll';



class View {

    init(params) {
        console.log('start SingleView', window, params);
        this.params = params;


        this.setup();
        if (document.querySelector('.fake-hero')) {
            document.querySelector('.fake-hero').outerHTML = '';
        }
        if (App.handler) {
            App.handler.off();
        }
    }

    setup() {
        const project = this.checkProject();
        console.log(project);

        console.log(project, 'asdasd');

        var archive;

        if (project.role === 'archive') {
            archive = 'archive';

        } else {
            archive = '';
        }


        let outer = `
            <section class="single ${archive}">
            </section>
        `;

        this.el = outer;

        outer = toHTML(outer);


        let markup = `
            <div class="single-wrap">
            </div>
        `;

        markup = toHTML(markup);



        let hero = this.setHero(project);
        let title = this.setTitle(project);
        let intro = this.setIntro(project);
        let blocks = this.setBlocks(project);
        let awards = this.setAwards(project);

        markup.appendChild(hero);
        markup.appendChild(title);
        markup.appendChild(intro);
        markup.appendChild(blocks);
        markup.appendChild(awards);

        outer.appendChild(markup);

        this.render(outer);

    }

    render(markup) {

        document.body.getElementsByTagName('main')[0].innerHTML = markup.outerHTML;
        TweenMax.ticker.addEventListener("tick", myFunction);

        var instance = new VirtualScroll();
        var targetY = 0;
        var pos = 0;
        var ease = 0.06;
        var el = document.body.querySelector('.single-wrap');
        var area = (el.offsetHeight - window.innerHeight) * 100 / el.offsetHeight;

        console.log(el);

        instance.on(function (e) {
            targetY += e.deltaY * 0.01;
            area = (el.offsetHeight - window.innerHeight) * 100 / el.offsetHeight;
            targetY = constrain(targetY, -area, 0);

            //   console.log(targetY,e.deltaY);
        });

        function myFunction(event) {
            pos += (targetY - pos) * ease;
            //console.log(pos);
            el.style.transform = "translateY(" + pos + "%)";

            for (let index = 0; index < el.querySelectorAll('.single-content_block-media_item').length; index++) {
                var element = el.querySelectorAll('.single-content_block-media_item')[index];
                var top = window.innerHeight - element.getBoundingClientRect().top;
                if (top > 100) {
                    TweenMax.to(element.querySelector('div'), 2.5, {
                        y: 0,
                        opacity: 1,
                        ease: Expo.easeOut,
                    });
                }
            }

            var bottom = window.innerHeight - el.querySelector('.single-awards').getBoundingClientRect().bottom;
            if (bottom > -100) {
                TweenMax.ticker.removeEventListener("tick", myFunction);
                TweenMax.to(document.body.querySelector('.single'), 0.5, {
                    opacity: 0,
                    ease: Expo.easeInOut,
                    onComplete: function () {
                        instance.off();
                        window.location.hash = '#';
                    }
                });

            }
        }
        window.addEventListener("hashchange", function () {
            TweenMax.ticker.removeEventListener("tick", myFunction);
            instance.off();
        });

    }

    checkProject() {
        const self = this;
        for (let i = 0; i < Data.projects.length; i++) {
            const project = Data.projects[i];
            const slug = "/" + toSlug(project.title);

            if (slug === self.params) {
                return project;
            }

        }
    }

    setHero(project) {
        var img;
        var t;


        console.log(App.heroImage);

        if (App.heroImage) {

            t = App.heroImage.transform;
            img = App.heroImage.backgroundImage;

        } else {
            img = `url(${project.carousel[0].src})`;
            t = ``;
        }

        let markup = `
        <div class="single-hero">
            <div class="single-hero-media">

            </div>
        </div>
        `;

        markup = toHTML(markup);

        markup.querySelector('.single-hero-media').style.backgroundImage = img;
        markup.querySelector('.single-hero-media').style.transform = t;

        return markup;

    }

    setTitle(project) {

        const markup = `
        <div class="single-title content">
            <h2>${project.title}</h2>
        </div>
        `;

        return toHTML(markup);
    }

    setIntro(project) {
        const markup = `
        <div class="single-intro content">
            <div class="single-intro_info">
                <div>
                    <h5>Agency</h5>
                    <p>${project.agency}</p>
                </div>

                <div>
                    <h5>Role</h5>
                    <p>${project.role}</p>
                </div>

                <div>
                    <a class="btn" href="${project.link}" target="_blank"><div class="line"></div>launch site</a>
                </div>

            </div>

            <div class="single-intro_desc">
                <h3>${project.introduction}</h3>
                <p>${project.description}</p>
            </div>
        </div>
        `;




        return toHTML(markup);
    }

    setBlocks(project) {
        const self = this;
        let markup = `
        <div class="single-content content">    
        </div>
        `;

        markup = toHTML(markup);

        for (let i = 0; i < project.content.length; i++) {
            const block = project.content[i];
            if (block.type === 'media') {
                markup.appendChild(self.setMedia(block));
            } else if (block.type === 'info') {
                markup.appendChild(self.setInfo(block));
            }
        }
        return markup;
    }

    setInfo(block) {
        let markup = `
            <div class="single-content_block single-content_block-info">
            </div>
        `;
        markup = toHTML(markup);
        let markupInner = `
            <div class="single-content_block-inner">
            </div>
        `;
        markupInner = toHTML(markupInner);


        let title = `
                <h3>${block.title}</h3>
        `;

        title = toHTML(title);

        markupInner.appendChild(title);


        for (let i = 0; i < block.description.length; i++) {
            const desc = block.description[i];
            let p = `
                <p>${desc}</p>
            `;

            p = toHTML(p);
            markupInner.appendChild(p);
        }

        markup.appendChild(markupInner);

        return markup;

    }

    setMedia(block) {

        let markup = `
            <div class="single-content_block">
            </div>
        `;
        markup = toHTML(markup);

        if (block.src.length > 1) {
            console.log('half');
            for (let i = 0; i < block.src.length; i++) {
                let half = `
            <div class="single-content_block-media_half single-content_block-media_item">
                <div style="background-image:url(${block.src[i]})"></div>
            </div>
        `;
                half = toHTML(half);
                markup.appendChild(half);
            }
        } else {
            let full = `
            <div class="single-content_block-media_full single-content_block-media_item">
                <div style="background-image:url(${block.src[0]})"></div>
            </div>
        `;
            full = toHTML(full);
            markup.appendChild(full);

        }

        return markup;

    }

    setAwards(block) {

        let markup = `
        <div class="single-awards content">
        </div>
        `;

        markup = toHTML(markup);


        let markupInner = `
        <div class="single-awards-inner">
            <h3>Awards won </h3>
        </div>
        `;

        markupInner = toHTML(markupInner);


        for (let i = 0; i < block.awards.length; i++) {
            const award = block.awards[i];

            let d = `<div>
                <img src="${award.img}"></img>
                <p>${award.text}</p>
            </div>`;

            d = toHTML(d);

            markupInner.appendChild(d);

        }

        markup.appendChild(markupInner);

        return markup;

    }

}

const v = new View();

export default v;