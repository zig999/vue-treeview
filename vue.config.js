const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
	outputDir: __dirname + '/../server/public/treeview/',
	baseUrl: '/treeview/',

	configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([
				{ from: './src/assets/data/tree2.json', to: 'data/' },
				//{ from: './logo.png', to: './' }
			])
		]
	}
};