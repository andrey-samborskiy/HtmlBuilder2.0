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
	entry: {
		app: ["./src/app.js"]
	},
	output: {
<<<<<<< HEAD
		entry: path.resolve('src/app'),
		output: {
			path: __dirname + '/dist',
			filename: 'js/[name].js'
		},
=======
		path: __dirname + '/dist',
		filename: 'js/[name].js'
>>>>>>> a7b33f2bf105b37f11b412ed8d2964334ba84b48
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
<<<<<<< HEAD
				test: /\.(png|jpg|svg)$/,
				include: [path.resolve(__dirname, 'src/static')],
				loader: 'file-loader?name=assets/images/[name].[ext]' },
			{
				test: /\.(ttf|eot|woff|woff2)$/,
=======
				test: /\.(png|jpg|svg|ttf|eot|woff|woff2|ico)$/,
>>>>>>> a7b33f2bf105b37f11b412ed8d2964334ba84b48
				include: [path.resolve(__dirname, 'src/static')],
				loader: 'file-loader?name=assets/fonts/[name].[ext]' },
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
