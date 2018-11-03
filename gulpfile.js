var gulp = require('gulp');
var sass = require('gulp-sass'); //编译css
var server = require('gulp-webserver'); //起服务
var bodyParser = require('body-parser');
var uglify = require('gulp-uglify'); //压缩js
var clean = require('gulp-clean-css') //压缩css
var minhtml = require('gulp-htmlmin') //压缩html
var path = require('path');
var fs = require('fs');
var url = require('url');
var data = require('./src/data/data.json')


gulp.task('sass', function() {
    return gulp.src('./src/scss/*.{sass,scss}')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.{sass,scss}', gulp.series("sass"))
});
// gulp.task('default', gulp.series('sass', 'watch'));

gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 9090,
            host: 'localhost',
            livereload: true,
            middleware: [bodyParser.urlencoded({ extended: false }), function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return res.end('')
                }
                var pathname = url.parse(req.url, true).pathname;
                if (/^\/api/.test(pathname)) { //接口
                    if (pathname === '/api/car') {
                        res.end(JSON.stringify({ result: data }))
                    }
                } else { //对文件的访问
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }]
        }))
})

//开发环境
gulp.task('dev', gulp.series('sass', 'server', 'watch')) //watch要放在后面

// //线上环境  //压缩css
// gulp.task('bulidCss', function() {
//     return gulp.src('./src/css/*.css')
//         .pipe(clean())
//         .pipe(gulp.dest('./bulid/css'))
// })

// //压缩js
// gulp.task('bulidjs', function() {
//     return gulp.src('./src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('./bulid/js'))
// })

// // //压缩html
// // gulp.task('bulidhtml', function() {
// //     return gulp.src('./src/*.html')
// //         .pipe(minhtml())
// //         .pipe(gulp.dest('./bulid/html'))
// // })
// gulp.task('minline', gulp.series('bulidCss', 'bulidjs'))