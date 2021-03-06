import Backbone from 'Backbone';
import _ from 'lodash';
import $ from 'jquery';
import HomeView from './views/home/view';
import AboutView from './views/about/view';
import ContactView from './views/contact/view';
import SingleView from './views/single/view';
import Config from './config';

export default function Router() {
    var self;
    var Router = Backbone.Router.extend({

        initialize: function() {
            self = this;
        },

        routes: {
            '': 'startHome',
            ':single(/)': 'startSingle'
        },

        execute: function(callback, args, name) {
            // console.log(callback, args, name)
            if (name === 'startHome') {
                self.startHome(args[0],name);
            }

            if (name === 'startSingle') {
                self.startSingle(args[0],name);
            }

            if (!$('main').attr('data-url-current')){
                $('main').attr('data-url-current',name);
            } else {
                $('main').attr('data-url-prev', $('main').attr('data-url-current') );
                $('main').attr('data-url-current',name); 
            }

            return false;
        },

        startHome: function(args,name) {
            HomeView(args,name);
        },

        startSingle: function(args,name) {
            SingleView(args,name);
        }


    });

    new Router();
    //Backbone.history.start({ pushState: true })
    Backbone.history.start();
}