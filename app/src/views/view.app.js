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
     
        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });
        document.body.innerHTML = markup;


        document.body.querySelector('.go-home').addEventListener('click',function(){
            console.log('asdsad');
            window.location.hash = '#';
        });

    }
}

const v = new View();

export default v;