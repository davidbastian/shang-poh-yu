class View {
    constructor() {
        // console.log('start AppView',window);   
        this.setup();
    }

    setup() {
        const markup = `
            <header>
            <a href="#/" class="logo">
                <img src="common/media/profile/logo.jpg" alt="" style="position: absolute; width: 100%;"/>
            </a>
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

    }
}

const v = new View();

export default v;