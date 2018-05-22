const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    watch: false,
    entry: {
        main: ['babel-polyfill', './src/js/app.js','./src/sass/main.sass']
    },
    output: {
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, "dist"),
        filename: '[name].js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["babel-preset-env", "babel-preset-stage-0"]
                    }
                }
            },
            {
                test: /\.sass$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMap: false,
                            },
                        },
                    ],
                }),
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({ filename: './app.css', disable: false, allChunks: true }),
        new UglifyJsPlugin({
            uglifyOptions: {
              ecma: 8,
              warnings: false,
              output: {
                comments: false,
                beautify: false,
              },
              toplevel: false,
              nameCache: null,
              ie8: false,
              keep_classnames: undefined,
              keep_fnames: false,
              safari10: false,
            }
          })
    ]
    
}