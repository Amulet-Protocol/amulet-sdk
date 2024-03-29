const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

// Override create-react-app config using react-app-rewired.
module.exports = {
  webpack: (config) => {
    config.plugins = (config.plugins || []).concat([
      new NodePolyfillPlugin({
        includeAliases: [
          'Buffer',
          'crypto',
          'http',
          'https',
          'stream',
          'zlib',
        ],
      }),
    ]);

    config.ignoreWarnings = [/Failed to parse source map/];

    return config;
  },
};
