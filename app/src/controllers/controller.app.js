import App from '../../index.js';

class AppController {
    constructor(){
        //console.log('start AppController');     
    }

    slideActiveUpdate(update){
        App.model.slideActive = update;
    }

    setup (){

    }

    render(){

    }
}

const c = new AppController();

export default c;