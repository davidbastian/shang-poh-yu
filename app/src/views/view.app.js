import Config from '../../config';
class View {
    constructor() {
        // console.log('start AppView',window);   
        this.setup();
    }

    setup() {
        const markup = `

            <header>
            <div class="logo">
               <div class="go-home" style="width: 60px; height: 60px;cursor: pointer;position: absolute;z-index: 10; left: 0; top: 0;"> <img src="common/media/profile/logo.jpg" alt="" style="position: absolute; width: 100%;"/></div>
                <div class="video-wrap">
                    <video class="video-bg" preload="auto" playsinline loop muted autoplay>
                            <source src="common/media/videos/001.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            </header>

            <main>
            </main>
        `;

        this.render(markup);

    }

    render(markup) {
        console.log(Config);
        var device = Config.checkDevice();
        document.body.classList.add(device);

        document.body.innerHTML = markup;
        document.body.querySelector('.go-home').addEventListener('click', function () {
            console.log('asdsad');
            window.location.hash = '#';
        });


        window.addEventListener('load', function () {

            var maybePreventPullToRefresh = true;
            var lastTouchY = 0;
            var touchstartHandler = function (e) {
                if (e.touches.length != 1) return;
                lastTouchY = e.touches[0].clientY;
            }

            var touchmoveHandler = function (e) {
                var touchY = e.touches[0].clientY;
                var touchYDelta = touchY - lastTouchY;
                lastTouchY = touchY;

                e.preventDefault();
                return;

                if (touchYDelta > 0) {
                    e.preventDefault();
                    return;
                }

                if (window.pageYOffset == 0 && touchYDelta > 0) {
                    e.preventDefault();
                    return;
                }

            }

            document.addEventListener('touchstart', touchstartHandler, {
                passive: false
            });
            document.addEventListener('touchmove', touchmoveHandler, {
                passive: false
            });
        });


    }
}

const v = new View();

export default v;