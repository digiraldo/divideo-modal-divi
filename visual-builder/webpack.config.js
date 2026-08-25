const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    'divideo-modal-divi': './src/index.jsx',
    'divideo-modal-frontend': './src/frontend.js',
  },

  // Externals: paquetes que Divi/WordPress ya proveen en el navegador.
  externals: {
    react:      ['vendor', 'React'],
    'react-dom': ['vendor', 'ReactDOM'],
    jquery:     'jQuery',
    '@wordpress/hooks':        ['vendor', 'wp', 'hooks'],
    '@wordpress/i18n':         ['vendor', 'wp', 'i18n'],
    '@divi/module':            ['divi', 'module'],
    '@divi/module-library':    ['divi', 'moduleLibrary'],
    '@divi/module-utils':      ['divi', 'moduleUtils'],
    '@divi/rest':              ['divi', 'rest'],
    '@divi/field-library':     ['divi', 'fieldLibrary'],
    '@divi/icon-library':      ['divi', 'iconLibrary'],
    '@divi/style-library':     ['divi', 'styleLibrary'],
    '@divi/data':              ['divi', 'data'],
  },

  module: {
    rules: [
      // JSX / JS
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false, targets: '> 1%' }],
              '@babel/preset-react',
            ],
          },
        },
      },
      // CSS
      {
        test: /\.css$/i,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },

  stats: { errorDetails: true },
};
