const rewireSass = require('react-app-rewire-scss');
const rewireMobX = require('react-app-rewire-mobx');
const {injectBabelPlugin, getBabelLoader} = require('react-app-rewired');

/* config-overrides.js */
module.exports = function override(config, env) {
	config = rewireSass(config, env);
	// with loaderOptions
	// config = rewireSass.withLoaderOptions(someLoaderOptions)(config, env);

	config = injectBabelPlugin("babel-plugin-styled-components", config);
	config = rewireMobX(config,env);

	// Удаление бабель-плагина transform-decorators-legacy.
    const loader = getBabelLoader(config.module.rules);
    const options = loader.options || loader.query;
    if (options.plugins) {
        options.plugins = (
            options.plugins.filter(plugin => plugin !== 'transform-decorators-legacy')
		);
	}

	return config;
}