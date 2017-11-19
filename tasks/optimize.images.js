const path = require('path');
const imagemin = require('imagemin');

const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminMozjpeg = require('imagemin-mozjpeg');
 
imagemin([path.join(__dirname, '../app/common/media/images/')+'*.jpg'], path.join(__dirname, '../dist/common/media/images/'), {
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