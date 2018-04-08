import VirtualScroll from 'virtual-scroll';

class SliderModule {
    constructor(args){
        this.wrap= args.wrap;
        console.log(this.wrap,'sliders');

    }

    init(){

    }

    setup(){

        let handler = new VirtualScroll({
            
        });

    }
}

export default SliderModule;

