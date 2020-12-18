const gulp = require('gulp');
const {src, dest, series, parallel, watch} = gulp;

// Gulp plugins
const clean  = require('gulp-clean');
const sass   = require('gulp-sass');
const rename = require('gulp-rename');
const ts     = require('gulp-typescript');

const browserSync = require('browser-sync').create();

const SRC_DIR = './src'
const DIST_DIR = './dist';
const SASS_FILES = `${SRC_DIR}/scss/*.scss`;
const TS_FILES = `${SRC_DIR}/ts/*.ts`;
const OTHER_FILES = [`${SRC_DIR}/**`, `!${SRC_DIR}/+(scss|ts)/**`];


// Apaga o diretório dist
gulp.task('clean', () => {
    return src(DIST_DIR, {read: false, allowEmpty: true}).pipe(clean({force: true}));
});

// Transpila e copia os arquivos sass
gulp.task('sass', () => {
    return src(SASS_FILES)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(`${DIST_DIR}/css`))
    .pipe(browserSync.stream());
});

// Transpila e copia os arquivos typescript
gulp.task('typescript', () => {
    return src(TS_FILES)
    .pipe(ts({target: 'ES6'}))
    .pipe(dest(`${DIST_DIR}/js`))
});

// Copia tudo, exceto os arquivos que serão transpilados
gulp.task('copy', () => src(OTHER_FILES).pipe(dest(DIST_DIR)));


// Constrói o diretório dist sem iniciar o server de desenvolvimento
gulp.task('build', series(['clean', parallel(['copy', 'sass', 'typescript'])]));


// Default task
gulp.task('default', async () => {
    browserSync.init({
        server: {
            baseDir: `${DIST_DIR}`
        },
        port: 1337
    });

    watch(SASS_FILES,  {ignoreInitial: false}, series(['sass']));
    watch(TS_FILES,    {ignoreInitial: false}, series(['typescript'])).on('change', browserSync.reload);
    watch(OTHER_FILES, {ignoreInitial: false}, series(['copy'])).on('change', browserSync.reload);

    browserSync.reload();
});