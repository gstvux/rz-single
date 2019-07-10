var cfg = require("./gulpfile.config");
var gulp = require("gulp");
var sync = require("browser-sync").create();
var $ = require("gulp-load-plugins")();

$.sass.compiler = require("node-sass");

gulp.task("sass", () => {
    return (
        gulp
            .src(cfg.path.sass + "/**/*.scss", { allowEmpty: true })
            .pipe($.sass().on("error", $.sass.logError))
            .pipe(
                $.autoprefixer(["last 5 versions", "> 1%", "ie 8", "ie 7"], {
                    cascade: true
                })
            )
            .pipe($.groupCssMediaQueries())
            //.pipe($.cleanCss({ compatibility: "ie8" }))
            .pipe($.sourcemaps.write(cfg.path.css))
            .pipe(gulp.dest(cfg.path.css))
            .pipe(sync.stream())
    );
});

/** js */
gulp.task("js", () => {
    return gulp
        .src(cfg.loads.js, { allowEmpty: true })
        .pipe($.concat(cfg.fileName.js))
        .pipe($.uglify())
        .pipe(gulp.dest(cfg.path.js));
});

/** php */
gulp.task("php", () => {
    return sync.stream();
});

gulp.task("html", () => {
    return sync.stream();
});

/** browser-sync */
gulp.task("sync", () => {
    sync.init(cfg.filesToWatch, {
        //server: "./",
        //proxy: "localhost/" + cfg.project_name + "/wp-content/themes/tyche",
        proxy: "localhost/" + cfg.project_name
        //files:[cfg.path.sass + "/**/*.scss", cfg.path.js + "/**/*.js", cfg.path.base + "/**/*.php"]
    });
    gulp.watch(cfg.path.sass + "/**/*.scss", gulp.parallel(["sass"]));
    gulp.watch(cfg.path.js + "/**/*.js", gulp.parallel(["js"])).on(
        "change",
        sync.reload
    );
    //gulp.watch(cfg.path.b + "/**/*.html", gulp.parallel("html")).on("change", sync.reload);
});

/** tasks */

gulp.task("default", gulp.parallel([cfg.tasks]));
