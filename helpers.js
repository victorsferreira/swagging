const path = require('path');
const cwd = process.cwd();
const config = require('./package');
const callerConfig = require(path.join(cwd, 'package'));

const { name } = config;
const isCaller = callerConfig.name === name;
const isDev = process.env.NODE_ENV === 'development';
const dirPattern = '/node_modules/swagging/';
const parentDir = resolveParentDir();
const moduleDir = resolveModuleDir();

function resolveParentDir() {
    const tempPath = cwd + '/';
    return removeExtraSlashes(tempPath.replace(dirPattern, ''));
}

function resolveModuleDir() {
    let tempPath = resolveParentDir();
    if (!isDev) tempPath = tempPath + dirPattern;
    return removeExtraSlashes(tempPath);
}

function removeExtraSlashes(fullPath) {
    if(fullPath.substr(-1) === '/') fullPath = fullPath.slice(0, -1);
    return path.normalize(fullPath);
}

function getTargetYamlPath() {
    let targetPath;

    if (isDev) targetPath = moduleDir;
    else targetPath = parentDir;

    return path.join(targetPath, 'swagger.yaml');
};

function resolveWorkingPath() {
    const workingPath = ['./'];
    if (!isCaller) workingPath.push('node_modules/', name + '/');

    return workingPath.join('');
}

module.exports.removeExtraSlashes = removeExtraSlashes;
module.exports.resolveModuleDir = resolveModuleDir;
module.exports.resolveParentDir = resolveParentDir;
module.exports.getTargetYamlPath = getTargetYamlPath;
module.exports.resolveWorkingPath = resolveWorkingPath;
module.exports.parentDir = parentDir;
module.exports.moduleDir = moduleDir;