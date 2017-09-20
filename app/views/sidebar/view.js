import Backbone from 'Backbone';
import _ from 'lodash';
import $ from 'jquery';

import Config from "../../config";
import Template from './template.rhtml'; // template
import './style.scss'; //styles

import iconGallery from '../../common/svg/icon-gallery.svg';


export default function() {
    var self;
    var View = Backbone.View.extend({

        tagName: 'aside',
        className: 'sidebar',

        template: _.template(Template),

        initialize: function() {
            self = this;
            this.getData();
        },

        getData: function() {
            var data = Config().live + 'wp/v2/pages';

            var query = $.ajax({
                dataType: "json",
                url: data,
                xhrFields: {
                    withCredentials: true
                }
            });

            $.when(query)
                .done(function(result) {
                    self.setData(result);
                });
        },

        setData: function(result) {
            console.log(result);
            for (var index = 0; index < result.length; index++) {
                var element = result[index];

                if (element.slug === 'info') {
                    console.log(element);
                    var info = {
                        contact: element.acf.contact,
                        about: element.acf.about,
                        iconGallery: iconGallery,
                    };

                    self.render(info);


                }
            }
        },


        render: function(info) {
            var json = {
                info: info
            };


            var setTemplate = this.template(json);
            var appendData = this.$el.append(setTemplate);

            appendData.insertBefore($('main'));
            // $('body').append(appendData);
        }

    });

    new View();

}