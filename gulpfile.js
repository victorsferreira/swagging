const gulp = require('gulp');
const gulpYamlToJson = require('gulp-yaml');
const helpers = require('./helpers');

const targetYamlPath = helpers.getTargetYamlPath();

function symlinkYaml() {
    return gulp.src(targetYamlPath).pipe(gulp.symlink(`${helpers.moduleDir}/api/swagger`));
}

function convertYamlToJson() {
    return gulp.src(`${helpers.moduleDir}/api/swagger/swagger.yaml`)
        .pipe(gulpYamlToJson())
        .pipe(gulp.dest(`${helpers.moduleDir}/public/ui`));
}

function watchYaml() {
    gulp.watch(`${helpers.moduleDir}/api/swagger/swagger.yaml`, convertYamlToJson);
}

exports.default = gulp.series(symlinkYaml, watchYaml);