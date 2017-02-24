var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app: ["./src/app.js"]
	},
	output: {
		entry: path.resolve('src/app'),
		output: {
			path: __dirname + '/dist',
			filename: 'js/[name].js'
		},
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel?presets[]=es2015'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style','css!sass') },
			{
				test: /\.(png|jpg|svg)$/,
				include: [path.resolve(__dirname, 'src/static')],
				loader: 'file-loader?name=assets/images/[name].[ext]' },
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				include: [path.resolve(__dirname, 'src/static')],
				loader: 'file-loader?name=assets/fonts/[name].[ext]' },
			{
				test: /\.jade$/,
				loader: 'jade?pretty=true' }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({  // for other files add new plugin
			filename: 'index.html',
			template: path.resolve('src/template/index.jade')
		}),
		new ExtractTextPlugin('main.css')
	]
};
