var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var bodyParser = require('body-parser');
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
gulp.task('default', gulp.series('sass', 'watch'));

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