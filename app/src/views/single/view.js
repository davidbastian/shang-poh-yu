class View {
    init(params){
        console.log('start SingleView',window,params);  
        this.setup();
    }
    setup (){
        const markup  = `
            <section class="single">
                Single
            </section>
        `;
        this.render(markup);      
    }
    render(markup){
        document.body.getElementsByTagName('main')[0].innerHTML =  markup;
    }
}

const v = new View();

export default v;