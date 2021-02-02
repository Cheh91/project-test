'use strict';

let path = {
    build: {
        html: 'assets/build/',
        js: 'assets/build/js/',
        css: 'assets/build/css/',
        img: 'assets/build/img/',
        fonts: 'assets/build/fonts/'
    },
    src: {
        html: 'assets/src/*.html',
        js: 'assets/src/js/*.js',
        style: 'assets/src/style/main.scss',
        style2: 'assets/src/style/homepage.scss',
        img: 'assets/src/img/**/*.*',
        fonts: 'assets/src/fonts/**/*.*'
    },
    watch: {
        html: 'assets/src/**/*.html',
        js: 'assets/src/js/**/*.js',
        css: 'assets/src/style/**/*.scss',
        img: 'assets/src/img/**/*.*',
        fonts: 'assets/srs/fonts/**/*.*'
    },
    clean: './assets/build/*'
};

let gulp           = require('gulp'),
    browserSync    = require('browser-sync'),
    sourcemaps     = require('gulp-sourcemaps'),
    sass           = require('gulp-sass'),
    autoprefixer   = require('gulp-autoprefixer'),
    cleanCSS       = require('gulp-clean-css'),
    // uglify         = require('gulp-uglify'),
    uglify         = require('gulp-uglify-es').default,
    cache          = require('gulp-cache'),
    imagemin       = require('gulp-imagemin'),
    notify         = require('gulp-notify'),
    jpegrecompress = require('imagemin-jpeg-recompress'),
    pngquant       = require('imagemin-pngquant'),
    rimraf         = require('gulp-rimraf'),
    rigger         = require('gulp-rigger'),
    gcmq           = require('gulp-group-css-media-queries'),
    rename         = require('gulp-rename');

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './assets/build'
        },
        notify: true
    })
});

gulp.task('html:build', function () {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('css:build', function () {
    return gulp.src([path.src.style, path.src.style2])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
        .pipe(gcmq())
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 10 versions']
        }))
        .pipe(gulp.dest(path.build.css))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('jslibs:build', function () {
    return gulp.src([
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/slick-carousel/slick/slick.min.js'
                    ])
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('image:build', function () {
    return gulp.src(path.src.img)
        .pipe(cache(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            imagemin.svgo({ plugins: [{ removeViewBox: false }] })
        ])))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('clean:build', function () {
    return gulp.src(path.clean, { read: false })
        .pipe(rimraf());
});

gulp.task('cache:clear', function () {
    cache.clearAll();
});

gulp.task('build',
    gulp.series('clean:build',
        gulp.parallel(
            'html:build',
            'css:build',
            'jslibs:build',
            'js:build',
            'fonts:build',
            'image:build'
        )
    )
);


gulp.task('watch', function () {
    gulp.watch(path.watch.html, gulp.parallel('html:build'));
    gulp.watch(path.watch.css, gulp.parallel('css:build'));
    gulp.watch(path.watch.js, gulp.parallel('jslibs:build'));
    gulp.watch(path.watch.js, gulp.parallel('js:build'));
    gulp.watch(path.watch.img, gulp.parallel('image:build'));
    gulp.watch(path.watch.fonts, gulp.parallel('fonts:build'));
});

gulp.task('default', gulp.series(
    'build',
    gulp.parallel('browserSync','watch')      
));
