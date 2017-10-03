import Backbone from 'Backbone';
import _ from 'lodash';
import $ from 'jquery';

import Config from "../../config";
import Template from './template.html'; // template
import './style.scss'; //styles


export default function() {
    var self;
    var View = Backbone.View.extend({
        tagName: 'section',
        className: 'projects',

        template: _.template(Template),
        initialize: function() {
            self = this;
            self.loader();
        },

        loader: function() {
            self.render(Config().copydeck.projects);

        },

        render: function(copydeck) {
            var json = {
                projects: copydeck,
                permalink:function(val){
                    var removeTag = val.replace(/<\/?[^>]+(>|$)/g, " ");
                    var spaces = removeTag.replace(/\s+/g, '-').toLowerCase();
                    var special = spaces.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
                    var slug = special.toLowerCase();
                    
                    return slug
                },
            };

            var setTemplate = this.template(json);
            var appendData = this.$el.append(setTemplate)[0];
            $('main').html(appendData)
        }

    });

    new View();

}