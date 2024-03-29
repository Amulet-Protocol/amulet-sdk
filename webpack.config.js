const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'index.js', // Must be consistent with package.json.
    path: path.resolve(__dirname, 'dist'), // Must be consistent with package.json.
    globalObject: 'this', // Make UMD build available on both browsers and Node.js.
    library: {
      type: 'umd', // Bundle a library that can work with CommonJS, AMD and script tag.
    },
    clean: true, // Clean the output directory before emit.
  },
  devtool: 'source-map',
  plugins: [
    // Polyfill Node.js modules.
    new NodePolyfillPlugin({
      includeAliases: [
        'Buffer',
      ],
    }),
  ],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: { // Must be consistent with package.json peer dependencies.
    '@solana/web3.js': '@solana/web3.js',
  },
  performance: {
    maxAssetSize: 5 * 1024 * 1024, // 5.0 MiB
    maxEntrypointSize: 5 * 1024 * 1024, // 5.0 MiB
  },
};
