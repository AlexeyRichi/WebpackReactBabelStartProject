const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module:{
		rules: [
			{
				test: /\.sass$/, 
        		use: ExtractTextPlugin.extract({
        		  fallback: "style-loader",
        		  use: ['css-loader','sass-loader']
        		})
			},
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: "babel-loader" }
		]
	},
	devServer: {
	  contentBase: __dirname + '/dist',
	  compress: true,
	  port: 1984,
	  stats: 'errors-only',
	  open: true,
	  openPage: ''
	},
	plugins: [
  		new HtmlWebpackPlugin({
   			title: 'Start Project',
   			minify:{
   				collapseWhitespace: true
   			},
   			hash: true,
    		template: './src/template.ejs'
  		}),
		new ExtractTextPlugin({
		  filename: 'app.css',
		  disable: false,
		  allChunks: true
		})
	]	

}
