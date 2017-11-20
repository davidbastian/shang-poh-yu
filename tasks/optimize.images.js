const path = require('path');
const imagemin = require('imagemin');

const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminMozjpeg = require('imagemin-mozjpeg');

var input = path.join(__dirname, '../app/common/media/images/clients/')+'*.jpg';
var ouput = path.join(__dirname, '../dist/common/media/images/clients');
 

imagemin([input],ouput,{
    plugins: [
        imageminJpegRecompress({
            quality:'low',
            min:30,
            max:75,
        })
    ]
}).then(() => {
    console.log('Images optimized');
});