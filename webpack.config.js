
// some webpack token missing issue was there in ['@rneui/base', '@rneui/themed'] modules, added these to run in web browser. 

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
    const config = await createExpoWebpackConfigAsync({
        ...env,
        babel: {
            dangerouslyAddModulePathsToTranspile: ['@rneui/base', '@rneui/themed']
        }
    }, argv);
    return config;
};

