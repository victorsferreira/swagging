const gulp = require('gulp');
const gulpYamlToJson = require('gulp-yaml');
const path = require('path');
const cwd = process.cwd();

const targetYaml = path.join(cwd, 'swagger.yaml');

function symlinkYaml() {
    return gulp.src(targetYaml).pipe(gulp.symlink('./api/swagger'));
}

function convertYamlToJson() {
    return gulp.src('./api/swagger/swagger.yaml')
        .pipe(gulpYamlToJson())
        .pipe(gulp.dest('./public/ui'));
}

function watchYaml() {
    gulp.watch("api/swagger/swagger.yaml", convertYamlToJson);
}

exports.default = gulp.series(symlinkYaml, watchYaml);