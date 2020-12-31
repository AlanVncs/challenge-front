const gulp = require('gulp');
const {src, dest, series, parallel, watch} = gulp;

// Gulp plugins
const clean       = require('gulp-clean');
const sourcemaps  = require('gulp-sourcemaps');
const sass        = require('gulp-sass');
const rename      = require('gulp-rename');
const ts          = require('gulp-typescript');
const babelMinify = require('gulp-babel-minify');

const browserSync = require('browser-sync').create(); // Modo de desenvolvimento
const server = require('./server');                   // Modo de produção

const SERVER_PORT = 1337;

const SRC_DIR = './src'
const DIST_DIR = './dist';
const SASS_FILES = `${SRC_DIR}/scss/**/*.scss`;
const TS_FILES = `${SRC_DIR}/ts/**/*.ts`;
const OTHER_FILES = [`${SRC_DIR}/**`, `!${SRC_DIR}/+(scss|ts)/**`];


// Apaga o diretório dist
gulp.task('clean', () => {
    return src(DIST_DIR, {read: false, allowEmpty: true})
    .pipe(clean({force: true}));
});

// Constrói os arquivos CSS
gulp.task('sass', () => {
    return src(SASS_FILES)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('../css_map'))
    .pipe(dest(`${DIST_DIR}/css`))
    .pipe(browserSync.stream());
});

// Constrói os arquivos Javascript
gulp.task('typescript', () => {
    return src(TS_FILES)
    .pipe(sourcemaps.init())
    .pipe(ts({target: 'ES6'}))
    .pipe(babelMinify({mangle: {topLevel: true}}))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('../js_map'))
    .pipe(dest(`${DIST_DIR}/js`))
});

// Constrói o restante dos arquivos
gulp.task('copyOther', () => {
    return src(OTHER_FILES)
    .pipe(dest(DIST_DIR))
});


// Executa as tasks de construção da pasta './dist/
gulp.task('build', parallel(['sass', 'typescript', 'copyOther']));


// Inicia o BrowserSync
gulp.task('startDevServer', () => {
    browserSync.init({
            server: {baseDir: `${DIST_DIR}`},
            port: SERVER_PORT
        },
        () => console.log('\n\x1b[32mServer online\x1b[0m') // <green>Server online</green>
    ); 
});


// Atualiza o BrowserSync
gulp.task('reloadDevServer', (cb) => {
    browserSync.reload();
    cb();
});


// Inicia o modo de desenvolvimento
gulp.task('dev', () => {
    // TODO Modificar de forma que somente o arquivo modificado ser recompilado/compiado
    watch(SASS_FILES,  series(['sass']));
    watch(TS_FILES, series('typescript', 'reloadDevServer'));
    watch(OTHER_FILES, series('copyOther', 'reloadDevServer'));

    series(['clean', 'build', 'startDevServer'])();
});


// Inicia o Express
gulp.task('startProdServer', () => {
    server.start(SERVER_PORT);
});

// Inicia o modo de produção
gulp.task('prod', series(['clean', 'build', 'startProdServer']));