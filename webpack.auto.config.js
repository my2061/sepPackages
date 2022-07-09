const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: "production",
    entry: {
        main: "./src/index.js",
        handler: "./src/handler.js",
    },
    output: {
        filename: "[name].[hash:4].js"
    },
    optimization: {
        splitChunks: {
            //优化配置项...
            chunks: "all",
            cacheGroups: {
                vendors: {    //属性名即是缓存的名称，改成common看看
                    test: /[\\/]node_modules[\\/]/,
                    priority: 2
                },
                default: {        //默认缓存组设置，会覆盖掉全局设置
                    minChunks: 2,
                    priority: 1,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
        })
    ],
};
