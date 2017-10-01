import Backbone from 'Backbone';
import _ from 'lodash';
import $ from 'jquery';

import Config from "../../config";
import Template from './template.html'; // template
import './style.scss'; //styles


export default function() {
    var self;
    var View = Backbone.View.extend({

        tagName: 'header',
        className: 'header',

        template: _.template(Template),

        initialize: function() {
            this.setup();
            this.render();
        },

        setup: function() {

        },

        render: function() {
            var json = {

            };

            var setTemplate = this.template(json);
            var appendData = this.$el.append(setTemplate);

            console.log(appendData);
            appendData.insertBefore($('main'));
        }

    });

    new View();

}