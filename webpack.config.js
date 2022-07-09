
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "production",
    entry: {
        main: "./src/index.js",
        handler: "./src/handler.js",
    },
    output: {
        filename: "[name].[hash:4].js"
    },
    plugins: [
        // 打包分析工具
        new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin({
            // 不删除手动打包出来dll文件
            cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/*"],
        }),
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new webpack.DllReferencePlugin({
            manifest: require("./dll/jquery.manifest.json"),
        }),
        new webpack.DllReferencePlugin({
            manifest: require("./dll/lodash.manifest.json")
        })
    ]
}