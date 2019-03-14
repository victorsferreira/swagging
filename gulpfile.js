const gulp = require('gulp');
const del = require('del');
const gulpYamlToJson = require('gulp-yaml');
const gulpSymlink = require('gulp-symlink');
const helpers = require('./helpers');
const params = require('./params');

const targetYamlPath = helpers.getTargetYamlPath(params['swagger']);

function deleteSwaggerYaml() {
    return del([
        `${helpers.moduleDir}/api/swagger/swagger.yaml`
    ]);
}

function symlinkYaml() {
    return gulp.src(targetYamlPath).pipe(gulpSymlink(`${helpers.moduleDir}/api/swagger/swagger.yaml`, { force: true }));
}

function convertYamlToJson() {
    return gulp.src(`${helpers.moduleDir}/api/swagger/swagger.yaml`)
        .pipe(gulpYamlToJson())
        .pipe(gulp.dest(`${helpers.moduleDir}/public/ui`));
}

function watchYaml() {
    return gulp.watch(`${helpers.moduleDir}/api/swagger/swagger.yaml`, convertYamlToJson);
}

exports.default = gulp.series(deleteSwaggerYaml, symlinkYaml, watchYaml);