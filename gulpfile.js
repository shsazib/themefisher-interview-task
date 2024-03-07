const tailwindcss = require("tailwindcss");
const postcss = require("gulp-postcss");
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browser_sync = require("browser-sync").create();

gulp.task("pages", function () {
  return gulp
    .src("src/pages/**/*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(
      browser_sync.reload({
        stream: true,
      })
    );
});

gulp.task("styles", function () {
  return gulp
    .src("src/styles/**/*.scss")
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(
      postcss([tailwindcss("./tailwind.config.js"), require("autoprefixer")])
    )
    .pipe(gulp.dest("dist/styles/"))
    .pipe(
      browser_sync.reload({
        stream: true,
      })
    );
});

// public files
gulp.task("public", function () {
  return gulp.src('src/public/images/**/*').pipe(gulp.dest('dist/images/'));
});

gulp.task("scripts", function () {
  return gulp
    .src("src/scripts/**/*.js")
    .pipe(gulp.dest("dist/scripts/"))
    .pipe(
      browser_sync.reload({
        stream: true,
      })
    );
});


gulp.task("watch", function () {
  gulp.watch("src/pages/**/*.html", gulp.parallel("pages", "styles"));
  gulp.watch("src/styles/**/*.scss", gulp.parallel("styles"));
  gulp.watch("src/scripts/**/*.js", gulp.parallel("scripts", "styles"));
  gulp.watch('src/public/images/**/*', gulp.parallel("public", "styles"));
});


gulp.task(
  "dev",
  gulp.series(
    "pages",
    "scripts",
    "styles",
    "public",
    gulp.parallel("watch", function () {
      browser_sync.init({
        server: {
          baseDir: "dist/",
        },
      });
    })
  )
);

gulp.task(
  "build",
  gulp.series("pages", "styles","scripts", "public")
);
