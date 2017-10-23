const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        sourceMapFilename: 'index.map',
        library: 'jslib',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
};
