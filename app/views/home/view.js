import Backbone from 'Backbone';
import _ from 'lodash';
import $ from 'jquery';

import Config from "../../config";
import Template from './template.html'; // template
import './style.scss'; //styles

import preloader from 'preloader';

export default function(args) {
    var self;
    var View = Backbone.View.extend({

        tagName: 'section',
        className: 'home',

        template: _.template(Template),
        initialize: function() {
            self = this;
            self.render();
           // this.getData();
        },

        getData: function() {
            var data = Config().live + 'wp/v2/clients';

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
            var story = {
                'title': result[0].acf.title,
                'description': result[0].acf.description,
                'moments': result[0].acf.moments
            };
            var moments = result[0].acf.moments;
            var images = [];

            for (var index = 0; index < moments.length; index++) {
                var gallery = moments[index].gallery;
                for (var j = 0; j < gallery.length; j++) {
                    var item = gallery[j];
                    var img = item.url;
                    images.push(img);
                }
            }


            var loader = preloader({
                // xhrImages: false
            });

            var counter = 0;
            var maxLength = images.length;

            for (var i = 0; i < maxLength; i++) {
                var url = images[i];
                loader.addImage(url, {
                    onComplete: function() {
                        counter = counter + 1;
                        var percent = (counter * 100) / maxLength;
                        console.log(counter, maxLength, percent + '%');
                        if (counter === maxLength) {
                            self.setup(story);
                        }
                    }
                });
            }

            loader.load();


        },

        setup: function(story) {
            self.render(story);
        },

        render: function(story) {
            var json = {
               // 'story': story
            };

            console.log(json);
            var setTemplate = this.template(json);
            var appendData = this.$el.append(setTemplate)[0];
            $('main').html(appendData);
        }

    });
    new View();

}