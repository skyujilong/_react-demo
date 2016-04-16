/**
 * Created by YU on 2015/9/17.
 */
var webpackConfig = require('./webpack-config');

var webpack = require('webpack-stream');

var gulp = require('gulp');

var plumber = require('gulp-plumber');

var less = require('gulp-less');

var cssMinify = require('gulp-clean-css');

var named = require('vinyl-named');

var less_source_maps = require('gulp-sourcemaps');

//MD5版本生成工具
var rev = require('gulp-rev');
//MD5版本生成工具 HTML资源路径修改
var revCollector = require('gulp-rev-collector');

//删除文件
var del = require('del');
//删除文件
var vinylPaths = require('vinyl-paths');

var path = require('path');

var tmpPath = path.join(__dirname,'dist','tmp');

var distPath = path.join(__dirname,'dist');

gulp.task('less-to-css',function(){
    return gulp.src(path.join(__dirname , '/less/*.less'))
        .pipe(plumber())
        .pipe(less_source_maps.init())
        .pipe(less({
            path:[path.join(__dirname , '/less/common')]
        }))
        .pipe(less_source_maps.write('./maps'))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.join(__dirname , '/bundle/css/')));
});

gulp.task('watch:less-dev',function(){
    gulp.watch(path.join(__dirname , '/less/**/*.less'),['less-to-css']);
});

gulp.task('less-dev',function(){
    return gulp.src(path.join(__dirname , '/less/**/*.less'))
        .pipe(less_source_maps.init())
        .pipe(less({
            path:[path.join(__dirname , '/less/common')]
        }))
        .pipe(less_source_maps.write('./maps'))
        .pipe(gulp.dest(path.join(__dirname , '/bundle/css/')));
});

gulp.task('watch:js-dev',function(){
    return gulp.src(path.join(__dirname , '/js/**/*.js'))//dev模式下扫描业务js pro模式下扫描main文件夹下js
        .pipe(named())
        .pipe(webpack(webpackConfig(true,true,false)))
        .pipe(gulp.dest(path.join(__dirname , '/bundle/js/')));
});

gulp.task('js-dev',['publish-static-js'],function(){
    return gulp.src(path.join(__dirname , '/js/main/*.js'))
        .pipe(named())
        .pipe(webpack(webpackConfig(false,true,false)))
        .pipe(gulp.dest(path.join(__dirname , '/bundle/js/')));
});

gulp.task('publish-img',function(){
    return gulp.src(path.join(__dirname , '/img/**/*.*'))
        .pipe(gulp.dest(path.join(__dirname , '/bundle/img/')));
});
//静态文件for dev
gulp.task('publish-static-js',function(){
    return gulp.src([path.join(__dirname , '/dep/jquery-1.9.1.min.js'),path.join(__dirname,'dep','web-uploader','Uploader.swf')])
        .pipe(gulp.dest(path.join(__dirname , '/bundle/js/')));
});

gulp.task('watch-dev',['watch:less-dev','watch:js-dev','publish-img','publish-static-js']);


gulp.task('test-package',['less-dev','js-dev','publish-img','publish-static-js']);

/******************************正式包***********************************/

gulp.task('package',['publish-assets']);


gulp.task('less',['del-tmp'],function(){
    return gulp.src(path.join(__dirname , '/less/**/*.less'))
        .pipe(less({
            path:[path.join(__dirname , '/less/common')]
        }))
        .pipe(cssMinify({keepBreaks:true,compatibility:'ie8,+spaceAfterClosingBrace'}))
        .pipe(rev())
        .pipe(gulp.dest(path.join(tmpPath , '/css/')))
        .pipe(rev.manifest())
        .pipe(gulp.dest(path.join(distPath)));
});

gulp.task('js',['less'],function(){
    return gulp.src(path.join(__dirname , '/js/main/*.js'))
        .pipe(named())
        .pipe(webpack(webpackConfig(false,false,true)))
        .pipe(gulp.dest(path.join(tmpPath , 'js')));
});


gulp.task('html-css',['js'],function(){
    return gulp.src([path.join(distPath,'rev-manifest.json'),path.join(__dirname,'html','**/*.html')])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': 'css'
            }
        }))
        .pipe(gulp.dest(path.join(tmpPath,'html')));
});

gulp.task('html-js',['html-css'],function(){
    return gulp.src([path.join(distPath,'stats.json'),path.join(tmpPath,'html','**/*.html')])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'js': 'js'
            },
            //revCollector原理是将 压缩有的文件名字通过正则表达是进行匹配为 原来的文件名字格式，如果是就进行替换，否则不换
            revSuffix:'-[0-9a-f]{5,20}(\.chunk){0,1}\.min'
        }))
        .pipe(gulp.dest(path.join(tmpPath,'html')));
});
/*发布静态资源*/
gulp.task('publish-dist-html',['html-js','del-dist'],function(){
    return gulp.src(path.join(tmpPath,'html','**/*.html'))
        .pipe(gulp.dest(path.join(distPath,'acareport','html')));
});
gulp.task('publish-dist-css',['publish-dist-html'],function(){
    return gulp.src(path.join(tmpPath,'css','*.css'))
        .pipe(gulp.dest(path.join(distPath,'acareport','bundle','css')));
});
gulp.task('publish-dist-js', ['publish-dist-css'],function(){
    return gulp.src(path.join(tmpPath,'js','*.js'))
        .pipe(gulp.dest(path.join(distPath,'acareport','bundle','js')));
});
gulp.task('publish-dist-dep-js', ['publish-dist-js'],function(){
    return gulp.src([path.join(__dirname,'dep','jquery-1.9.1.min.js'),path.join(__dirname,'dep','web-uploader','Uploader.swf')])
        .pipe(gulp.dest(path.join(distPath,'acareport','bundle','js')));
});
gulp.task('publish-dist-img', ['publish-dist-dep-js'],function(){
    return gulp.src(path.join(__dirname,'img','*.*'))
        .pipe(gulp.dest(path.join(distPath,'acareport','bundle','img')));
});

gulp.task('publish-assets',['publish-dist-img']);

//删除临时文件
gulp.task('del-tmp',function(){
    return gulp.src(tmpPath)
        .pipe(vinylPaths(del));
});
//删除上线文件
gulp.task('del-dist',function(){
    return gulp.src(path.join(distPath,'acareport'))
        .pipe(vinylPaths(del));
});
