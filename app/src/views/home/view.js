import App from '../../../index.js';
import Data from '../../../common/data/data.json';
import {
    toHTML,
    toSlug
} from '../../../common/utils/utils.js';
import './style.scss';
import SliderModule from '../../modules/module.slider.js';

class View {
    init(params) {
        console.log('start HomeView', window, params);
        this.setup();
    }
    setup() {
        let markup = `
            <section class="home">
            </section>
        `;
        markup = toHTML(markup);

        let intro = this.setIntro();
        markup.appendChild(intro);
        let projects = this.setProjects(markup);

        this.render(markup);

     
    }

    render(markup) {
        document.body.getElementsByTagName('main')[0].innerHTML = markup.outerHTML;

        const HomeSlider = new SliderModule({
            wrap: document.body.querySelector('.home'),
            time:1,
            pos:100,
            ease:'Expo.easeInOut'
        });
    }

    setIntro() {
        let current;
        if (App.model.slideActive === 0) {
            current = 'active';
        }
        else {
            current = '';

        }

        const markup = `
        <div class="slide ${current}">
            <div class="content slide-anima">
                <div class="intro">
                    <h3>${Data.details.intro}</h3>
                    <nav>
                        <a href="">see projects</a>
                        <a href="">about</a>
                        <a href="">contact</a>
                    </nav>
                </div>
                <div class="fade-anima"></div>
            </div>
        </div>
        `;

        return toHTML(markup);
    }

    setProjects(mainMarkup) {
        for (let i = 0; i < Data.projects.length; i++) {
            const project = Data.projects[i];
            const carousel = this.setCarousel(project.carousel);
            let markup = `
            <a class="slide"  href="#/${toSlug(project.title)}">
                <div class="content">
                    <div class="intro slide-anima">
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

        for (let i = 0; i < carousel.length; i++) {
            const src = carousel[i].src;
            let markup = `       
                 <div class="img" style="background-image:url(${src})"></div>
            `;
            markup = toHTML(markup);
            carouselHTML.appendChild(markup);
        }

        return carouselHTML;
    }

}

const v = new View();

export default v;