import Backbone from 'Backbone';
import _ from 'lodash';
import $ from 'jquery';

import Config from "../../config";
import Template from './template.html'; // template
import './style.scss'; //styles
import profile from  '../../common/media/images/about/i.jpg';


export default function() {
    var self;
    var View = Backbone.View.extend({
        tagName: 'section',
        className: 'about',
        template: _.template(Template),
        initialize: function() {
            self = this;
            self.loader();
        },

        setup: function() {

        },

        loader: function() {
            self.render(Config().copydeck);
        },
      

        render: function(copydeck) {
            var json = {
                info: copydeck.info,
                profile:profile,
            };

            var setTemplate = this.template(json);
            var appendData = this.$el.append(setTemplate)[0];
            $('main').html(appendData);
        }

    });

    new View();

}