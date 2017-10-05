import Backbone from 'Backbone';
import _ from 'lodash';
import $ from 'jquery';
import HomeView from './views/home/view';
import AboutView from './views/about/view';
import ContactView from './views/contact/view';
import SingleView from './views/single/view';

export default function Router() {
    var self;
    var Router = Backbone.Router.extend({

        initialize: function() {
            self = this;
        },

        routes: {
            '': 'startHome',
            'contact(/)': 'startContact',
            'about(/)': 'startAbout',
            ':single(/)': 'startSingle'
        },

        execute: function(callback, args, name) {
            // console.log(callback, args, name)

            if (name === 'startHome') {
                console.log(name);
                self.startHome(args[0]);
            }

            if (name === 'startContact') {
                self.startContact(args[0]);
            }

            if (name === 'startAbout') {
                self.startAbout(args[0]);
            }

            if (name === 'startSingle') {
                self.startSingle(args[0]);
            }

            return false;
        },

        startHome: function(args) {
            HomeView(args);
        },

        startContact: function(args) {
            ContactView(args);
        },

        startAbout: function(args) {
            AboutView(args);
        },

        startSingle: function(args) {
            SingleView(args);
        }


    });

    new Router();
    //Backbone.history.start({ pushState: true })
    Backbone.history.start();
}