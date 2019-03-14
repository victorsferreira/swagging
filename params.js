const { getParams } = require('./helpers');

const params = getParams(process.argv, {
    'ui-port': 3010,
    'editor-port': 3030,
    'swagger': 'swagger.yaml'
});

module.exports = {
    ...params,
    toString: function(){
        return Object.keys(params).map(key => `--${key} ${params[key]}`).join(' ');
    }
};