'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

var path			  = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var precss       	  = require('precss');
var autoprefixer 	  = require('autoprefixer');

const webpack = require('webpack');

const autoprefixerOptions = {
	browsers: [
		'last 2 versions',
		'iOS >= 7',
		'Android >= 4',
		'Explorer >= 10',
		'ExplorerMobile >= 11'
	],
	cascade: false
};

module.exports = {
	entry: path.resolve('src/app'),
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name].js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel?presets[]=es2015'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style','css!postcss?pack=cleaner!sass') },
			{
				test: /\.(png|jpg|svg|ttf|eot|woff|woff2|ico)$/,
				include: [path.resolve(__dirname, 'src/static')],
				loader: 'file?name=[1]&regExp=src\\\\static\\\\(.*)' },  // "\\\\" -hack for windows path :(
			{
				test: /\.jade$/,
				loader: 'jade?pretty=true'
			}
		]
	},

	watch: NODE_ENV == 'development',

	devtool: NODE_ENV == 'development' ? 'source-map' : null,

	postcss: function () {
		return {
			default: [precss, autoprefixer],
			cleaner: [autoprefixer(autoprefixerOptions)]
		}
	},

	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js']
	},

	resolveLoader: {
		modulesDirectories: ['node_modules'],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js']
	},

	plugins: [
		new HtmlWebpackPlugin({  // for other files add new plugin
			filename: 'index.html',
			template: path.resolve('src/template/index.jade'),
			favicon: './src/static/favicon.ico'
		}),
		new ExtractTextPlugin('css/main.css')
	]
};
