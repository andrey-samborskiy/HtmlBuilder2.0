var path			  = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var precss       	  = require('precss');
var autoprefixer 	  = require('autoprefixer');

module.exports = {
	entry: path.resolve('src/app'),
	output: {
		path: __dirname + '/dist',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel?presets[]=es2015'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style','css!postcss?pack=cleaner!sass') },
			{
				test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
				include: [path.resolve(__dirname, 'src/static')],
				loader: 'file?name=[1]&regExp=src\\\\static\\\\(.*)' },  // "\\\\" -hack for windows path :(
			{
				test: /\.jade$/,
				loader: 'jade?pretty=true'
			}
		]
	},
	postcss: function () {
		return {
			default: [precss, autoprefixer],
			cleaner: [autoprefixer({browsers:["last 4 version"]})]
		}
	},
	plugins: [
		new HtmlWebpackPlugin({  // for other files add new plugin
			filename: 'index.html',
			template: path.resolve('src/template/index.jade')
		}),
		new ExtractTextPlugin('main.css')
	]
};
