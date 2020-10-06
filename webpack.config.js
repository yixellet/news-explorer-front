const path = require('path');
const webpack = require('webpack');
const CSSNano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/script/index.js',
    news: './src/script/news.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg|ico|webp)$/i,
        use: [
          'file-loader?name=./images/[name].[ext]&exModule=false',
          {
            loader: 'image-webpack-loader',
            options: {
              esModule: false,
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './pages/[name].[contenthash].css',
    }),
    new MiniCssExtractPlugin({
      filename: './pages/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'news.html',
      template: './src/news.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: CSSNano,
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
  ],
};
