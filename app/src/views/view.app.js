class View {
    constructor(){
       // console.log('start AppView',window);   
        this.setup();  
    }

    setup (){
        const markup  = `
            <header>
                <a id="logo" href="#">
                <img src="" alt="">
                </a>
            </header>

            <main>
        
            </main>
        `;

        this.render(markup);
        
    }

    render(markup){
        document.body.innerHTML = markup;
    }
}

const v = new View();

export default v;