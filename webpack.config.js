const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const themeSrc = './themes/terminal/src';
const themeDest = './themes/terminal/static';

module.exports = {
    entry: path.join(__dirname, themeSrc, 'scripts/main.ts'),
    output: {
        path: path.resolve(__dirname, themeDest, 'js'),
        filename: 'script.js'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: require.resolve('prismjs'),
                use: [{
                    loader: 'expose-loader',
                    options: 'Prism'
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('../css/style.css')
    ],
    devtool: "eval-source-map"
};
