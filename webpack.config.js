const 	HtmlWebpackPlugin = require('html-webpack-plugin'),
		ExtractTextPlugin = require('extract-text-webpack-plugin'),
		webpack = require('webpack');

var		isProd	= process.argv.indexOf('-p') !== -1;
		cssDev	= ['style-loader','css-loader','sass-loader'],
		cssProd	= ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader','sass-loader'],
					publicPath: '/dist'
				}),
		cssConfig= isProd ? cssProd : cssDev;





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
        		use: cssConfig
			},
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: "babel-loader" 
			},
			{ 
				test: /\.(jp?g|png|gif|svg)$/i, 
				exclude: /node_modules/, 
				loader: [
					'file-loader?name=img/[name]',
					// 'file-loader?name=[hash:6].[ext]&outputPath=img/&publicPath=img/',
					'image-webpack-loader'
				]
			}
		]
	},
	devServer: {
	  contentBase: __dirname + '/dist',
	  compress: true,
	  hot: true,
	  port: 1984,
	  stats: 'errors-only',
	  open: true,
	  openPage: ''
	},
	plugins: [
  		new HtmlWebpackPlugin({
   			title: 'Start Project',
   			// minify:{
   			// 	collapseWhitespace: true
   			// },
   			// hash: true,
    		template: './src/template.ejs'
  		}),

// ############# ANOTHER TEMPLATE PAGE#############
   		// new HtmlWebpackPlugin({
   		// 	title: 'another page',
   			// minify:{
   			// 	collapseWhitespace: true
   			// },
   			// hash: true,
			//template: './src/template.ejs'
  		// }), 		
// ################################################	

		new ExtractTextPlugin({
		  filename: 'app.css',
		  disable: !isProd,
		  allChunks: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]	

}
