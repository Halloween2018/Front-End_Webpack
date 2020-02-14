const path = require('path')    //引入node的 path 模块
const webpack = require('webpack')  //引入的 webpack, 引入 lodash
const HtmlWebpackPlugin = require('html-webpack-plugin')    //引入打包我们的 HTML
const ExtractTextPlugin = require('extract-text-webpack-plugin')    //打包的CSS拆分, 将一部分抽离出来

module.exports = {
    entry: './src/index.js',    //入口文件, 在vue-cli main.js
    output: {
        path: path.resolve(__dirname, 'dist'),  //定位, 输出文件的目标位置
        filename: '[name].js'   //文件名[name].js 默认,也可自行配置
    },
    module: {       //模块的相关配置
        rules: [        //根据文件的后缀提供一个 loader, 解析规则
            {
                test: /\.less$/,    //正则匹配我们以 .less 结尾的文件
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.js$/,  //es6 => es5
                include: [
                    path.resolve(__dirname, 'src')
                ],
                // exclude:[], 不匹配选项（优先级高于test和include）
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,   //匹配所有格式的图片资源
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    resolve: {  //解析模块的可选项
        extensions: ['.js', '.json', '.jsx', '.less', '.css'],  //用到文件的拓展名
        alias: {    //模块别名列表
            utils: path.resolve(__dirname, 'src/utils')
        }
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),    //[name] 默认, 也可以自定义name     声明定义
        new HtmlWebpackPlugin({     //将模板的头部和尾部添加CSS和JS模板, dist目录发布到服务器上, 项目包。 可以直接上线
            filename: 'index.html', //打造单页面应用 最后运行的不是这个
            template: 'index.html'  //vue-cli 放在根目录下
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },  //服务于webpack-dev-server  内部封装了一个 express
}


