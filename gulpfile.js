const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyes');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const del = require('del');
const cache = require('gulp-cache');
const babel = require('gulp-babel');


gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: 'src',
        },
        notify: false,
    });
});


gulp.task('sass', () => {
    gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
            cascade: false,
        }))   
        .pipe(cleanCss())     
        .pipe(browserSync.reload({
            stream: true,
        }))
        .pipe(gulp.dest('src/css'));
});


// gulp.task('uglifyCss', () => {
//     gulp.src('src/css/*.css') 
//         .pipe(cleanCss())  
//         .pipe(browserSync.reload({
//             stream: true,
//         }))
//         .pipe(gulp.dest('src/css'));
// });


gulp.task('babel', () => {
    gulp.src('src/js/main.min.js')
        .pipe(babel({
            presets: ['@babel/env'],
        }))
        .pipe(gulp.dest('dist/ES5'));
});


gulp.task('img', () => {
    gulp.src('src/img/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
        })))
        .pipe(gulp.dest('dist/img'));
});


gulp.task('scripts', () => {
    gulp.src('src/js/assets/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.reload({
            stream: true,
        }));
});


gulp.task('clean', () => {
    del.sync('dist');
});


gulp.task ('watch', ['browserSync', 'sass', 'scripts'], () => {
    gulp.watch('src/scss/**/*.scss', ['sass']); // cледим за всемми scss файлами и применяем к нему плагин sass
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', ['scripts']);
});


gulp.task('build', ['clean', 'img', 'scripts', 'sass'], () => {
    const buldFonts = gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
    const buildJs = gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'));
    const buildImg = gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img'));
    const buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    const buildCss = gulp.src('src/css/*.css')
        .pipe(gulp.dest('dist/css'));   
});


gulp.task('default', ['watch']);
