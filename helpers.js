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

function getParams(args, defaultValues = {}) {
    const params = {};
    for (let i = 0, l = args.length; i < l; i++) {
        if (args[i].substr(0, 2) === '--') {
            // It's an argument
            params[args[i].substr(2)] = args[i + 1];
            // Skip next arg
            i++;
        }
    }

    return { ...defaultValues, ...params };
}

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
    if (fullPath.substr(-1) === '/') fullPath = fullPath.slice(0, -1);
    return path.normalize(fullPath);
}

function getTargetYamlPath(pathFromRoot = 'swagger.yaml') {
    let targetPath;

    if (isDev) targetPath = moduleDir;
    else targetPath = parentDir;

    return path.join(targetPath, pathFromRoot);
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
module.exports.getParams = getParams;