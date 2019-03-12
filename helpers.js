const path = require('path');
const cwd = process.cwd();

module.exports.getTargetYamlPath = function () {
    return path.join(cwd, 'swagger.yaml');
};

module.exports.resolveWorkingPath = function (name, callerPackageName) {
    const itIsCaller = name === callerPackageName;
    const workingPath = ['./'];
    if (!itIsCaller) workingPath.push('node_modules/', name + '/');

    return workingPath.join('');
}