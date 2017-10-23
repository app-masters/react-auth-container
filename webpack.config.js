var path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        sourceMapFilename: 'index.map',
        library: 'jslib',
        libraryTarget: 'umd'
    },
    externals: [
        {
            "window": "window"
        }
    ],
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: 'babel-loader'
            }
        ]
    }
};
