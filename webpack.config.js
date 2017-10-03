'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

let path 			  = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let precss       	  = require('precss');
let autoprefixer 	  = require('autoprefixer');

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
		filename: '[name].js'
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
				test: /\.(png|jpg|svg)$/,
				include: [path.resolve(__dirname, 'src/static')],
				loader: 'file-loader?name=assets/images/[name].[ext]' },
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				include: [path.resolve(__dirname, 'src/static')],
				loader: 'file-loader?name=assets/fonts/[name].[ext]' },
			{
				test: /\.pug$/,
				loader: 'pug?pretty=true' }
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
			template: path.resolve('src/template/index.pug')
		}),
		new ExtractTextPlugin('main.css')
	]
};
