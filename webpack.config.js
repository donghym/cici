const path = require('path')
const webpack = require('webpack')
const moment = require('moment')
const autoprefixer = require('autoprefixer')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CssSourcemapPlugin = require('css-sourcemaps-webpack-plugin')
const version = require('uuid')()
const TerserPlugin = require('terser-webpack-plugin');
const GenerateAssetPlugin = require('generate-asset-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const WatchChangedPlugin = require("webpack-watch-changed")
const { UnusedFilesWebpackPlugin } = require("unused-files-webpack-plugin")
const htmlWebpackPlugin = require("html-webpack-plugin")

const isProduction = process.env.NODE_ENV === 'production'

const envName = isProduction ? 'production' : 'development'
const nowDateStr = moment().format("YYYY-MM-DD HH:mm:ss")
const smp = new SpeedMeasurePlugin()
const __ZIP__ = process.env.ZIP === 'true';
const scriptPort = process.env.SCRIPT_PORT || 3004;
let localPath = 'localhost';
//获取本机ip
if (process.env.IP === 'true') {
  const os = require('os');
  const ifaces = os.networkInterfaces();
  const ips = [];
  for (let dev in ifaces) {
    let alias = 0;
    ifaces[dev].forEach(function (details) {
      if (details.family == 'IPv4') {
        ips.push(details.address)
        ++alias;
      }
    });
  }
  localPath = ips[1];
}

const origin = [ path.resolve('src')];

const cssPath = isProduction ? 'public/stylesheets/[name].min.css' : 'static/stylesheets/[name].css'
const cssChunkFilename = isProduction ? 'public/stylesheets/[name].[contenthash:5].min.css' : 'static/stylesheets/[name].[contenthash:5].css'

const publicPath = isProduction ? '/' : `http://${localPath}:${scriptPort}/`
const outputPath = path.join(__dirname, isProduction ? 'static' : './')
const outputFilename = isProduction ? 'public/javascripts/[name].min.js' : 'static/javascripts/[name].js'
const chunkFilename = isProduction ? `public/javascripts/[name].[contenthash:5].bundle.js` : undefined

const config = {
  mode: isProduction ? 'production' : 'development',
  entry:"./src/web/client",
  output: {
    publicPath,
    path: outputPath,
    filename: outputFilename,
    chunkFilename
  },
  resolve: {
    alias: {
      src: path.join(__dirname, './src')
    },
    extensions: [".js", ".jsx"],
  },
  externals: ['meta-touch'].concat(process.env.BUILD_TYPE ? [] : ['role', 'authority']),
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: origin,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      }, {
        loader: 'webpack-conditional-loader'
      }
      ],
    }, {
      test: /\.(js|jsx)$/,
      loader: 'source-map-loader',
      include: origin
    },
    {
      test: /\.(map)$/,
      loader: 'ignore-map-loader',
      include: origin,
    }, {
      test: /\.(jpg|png|gif|ico|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: 'styles/default/images/[hash:8].[name].[ext]'
      },
      include: [
        origin,
        path.resolve('static'),
      ]
    }, {
      test: /\.(woff|eot|ttf)\??.*$/,
      loader: 'url-loader',
      options: {
        name: 'fonts/[name].[md5:hash:hex:7].[ext]'
      }
    }, {
      test: /\.less$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: !isProduction
        },
      }, {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: !isProduction
        },
      }, {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          sourceMap: !isProduction,
          plugins: [
            autoprefixer()
          ]
        }
      }, {
        loader: 'less-loader',
        options: {
          sourceMap: !isProduction
        }
      }]
    }, {
      test: /\.css$/,
      use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProduction
            },
          },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: !isProduction
          },
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            sourceMap: !isProduction,
            plugins: [
              autoprefixer()
            ]
          }
        }]
    }]
  },
  optimization: {
    minimize: false //使用外部压缩插件
  },
  plugins: [
	new htmlWebpackPlugin({
		"filename":"index.html",
		"template":"./src/index.html",
		"inject":"head",
		"title":"dhy-01",
		"date":new Date(),
		"showErrors": true
	}),
    new MiniCssExtractPlugin({
      filename: cssPath,
      chunkFilename: cssChunkFilename,
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new webpack.DefinePlugin({
      'process.env.__CLIENT__': 'true',
      'process.env.__LANG__': process.env.MDF_LANG,
      'process.env.BUILD_TYPE': process.env.BUILD_TYPE && JSON.stringify(process.env.BUILD_TYPE) || 'false',
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(`./static/scripts/manifest.${envName}.json`)
    })
  ].concat(
    isProduction
      ? [
        new CaseSensitivePathsPlugin(),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            safe: true,
            mergeLonghand: false,
            discardComments: { removeAll: true }
          },
          canPrint: true
        }),
        new GenerateAssetPlugin({
          filename: '../bin/version.json',
          fn: (compilation, cb) => {
            cb(null, JSON.stringify({ version: version }, null, '\t'));
          },
          extraFiles: []
        })
      ].concat(
        __ZIP__ ? [new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        })] : [],
      )
      : [
        new webpack.HotModuleReplacementPlugin(),
        new CssSourcemapPlugin(),
        new WatchChangedPlugin()
      ]
  ),
  devtool: 'source-map'
  // 为了方便调试样式，这里为dev环境也使用了source-map，有可能对性能略有影响，后面再考虑优化
  // devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map'
};

if (!isProduction) {
  config.devServer = {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    host: '0.0.0.0',
    hot: true,
    inline: true,
    port: scriptPort,
    historyApiFallback: true,
    disableHostCheck: true
  }
  config.cache = true
  config.watchOptions = {
    aggregateTimeout: 1000
  }
}

module.exports = isProduction ? config : smp.wrap(config)
