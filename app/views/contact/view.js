import Backbone from 'Backbone';
import _ from 'lodash';
import $ from 'jquery';

import Config from "../../config";
import Template from './template.html'; // template
import './style.scss'; //styles

import animaText from "../../components/animaText";


export default function() {
    var self;
    var View = Backbone.View.extend({
        tagName: 'section',
        className: 'contact',

        template: _.template(Template),
        initialize: function() {
            self = this;
            this.render();
        },

        render: function() {
            var json = {

            };

            var setTemplate = this.template(json);
            var appendData = this.$el.append(setTemplate)[0];
            $('main').html(appendData);

            animaText(self.$el.find('h3'), "chars, words","", 0.04, 0.5).play();
            animaText(self.$el.find('.contact-info a').eq(0), "chars, words","", 0.04, 0.5).play();
            animaText(self.$el.find('.contact-info a').eq(1), "chars, words","", 0.04, 0.5).play();
        }

    });

    new View();

}