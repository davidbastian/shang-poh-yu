import Backbone from 'Backbone';
import _ from 'lodash';
import $ from 'jquery';

import Config from "../../config";
import Template from './template.html'; // template
import './style.scss'; //styles


export default function(args) {
    var self;
    var View = Backbone.View.extend({

          tagName: 'section',
        className: 'single',

        template: _.template(Template),

        initialize: function() {
            self = this;
            self.args = args;

            self.loader();
            this.setup();

        },

        loader:function(){
            self.getCurrent(Config().copydeck.projects);
        },

        permalink:function(val){
            var removeTag = val.replace(/<\/?[^>]+(>|$)/g, " ");
            var spaces = removeTag.replace(/\s+/g, '-').toLowerCase();
            var special = spaces.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
            var slug = special.toLowerCase();
            
            return slug

        },

        getCurrent:function(projects){
            for (var i = 0; i < projects.length; i++) {
                var project = projects[i];
                var title = project.title;
                if (self.permalink(title) === self.args) {
                    self.render(project);
                    console.log(project);
                }               
            }
        },


        setup: function() {

        },

        render: function(project) {
            var json = {
                project: project
            };
            console.log(json);
            var setTemplate = this.template(json);
            var appendData = this.$el.append(setTemplate)[0];
            $('main').html(appendData)
        }

    });
    new View();

}