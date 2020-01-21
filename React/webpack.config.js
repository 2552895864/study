var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js','.jsx','less'],
        alias: {
            '@': path.resolve(__dirname,'src')
        }
    },
    devServer: {
        port: 3000,
        progress: true,
        contentBase: 'dist',
        compress: true,
        open: true
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader',{
                    loader: 'css-loader',
                    options: {
                        modules: {
                            mode: 'local',
                            localIdentName: '[path][name]-[local]-[hash:5]'
                        }                    
                    }
                },'less-loader']
            },
            {
                test:/\.woff|woff2|eot|ttf|svg$/,
                use: ['file-loader']
            }
        ]
    }
}