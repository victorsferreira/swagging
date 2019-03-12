const gulp = require('gulp');
const gulpYamlToJson = require('gulp-yaml');
const helpers = require('./helpers');

const targetYamlPath = helpers.getTargetYamlPath();

function symlinkYaml() {
    return gulp.src(targetYamlPath).pipe(gulp.symlink('./api/swagger'));
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