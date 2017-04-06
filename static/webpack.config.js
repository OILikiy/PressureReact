const webpack = require('webpack');

var config = {
    entry: [
        "./src/index.jsx"
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [require("babel-plugin-transform-class-properties"),
                                  "babel-plugin-transform-decorators-legacy"],
                        presets: ['stage-0', 'es2015', 'react']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}

module.exports = config;
