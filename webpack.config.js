const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    watch: true,
    entry: {
        main: ['babel-polyfill', './src/js/app.js','./src/sass/main.sass'],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].js'
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
    ]
    
}