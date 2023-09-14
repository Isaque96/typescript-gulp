import gulp from "gulp";
const { series, parallel, src, dest } = gulp;
import { deleteAsync as del } from "del";
import browserify from "browserify";
import source from "vinyl-source-stream";
import tsify from "tsify";
import uglify from "gulp-uglify";
import rename from "gulp-rename";

function limparDist() {
  return del(["dist"]);
}

function copiarHTML() {
  return src("public/**/*").pipe(dest("dist"));
}

function gerarJS() {
  return browserify({
    basedir: ".",
    entries: ["src/main.ts"],
  })
    .plugin(tsify)
    .bundle()
    .pipe(source("app.js"))
    .pipe(dest("dist"));
}

function gerarJSProducao() {
  return src("dist/app.js")
    .pipe(rename("app.min.js"))
    .pipe(uglify())
    .pipe(dest("dist"));
}

export default series(
  limparDist,
  parallel(gerarJS, copiarHTML),
  gerarJSProducao
);
