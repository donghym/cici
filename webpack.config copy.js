const htmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path") // 优化
 let config = {
	"entry":"./src/app.js",
	"output":{
		"path":path.resolve(__dirname+"/dist"),
		"filename":"js/[name].[chunkhash:5].js"
	},
	"module":{
		"rules":[
			{
				"test":/\.(js|jsx)$/,
				"exclude": path.resolve(__dirname+"/node_modules"), // 优化
				"include":path.resolve(__dirname+"/src"),// 优化
				"loader":"babel-loader"
			},
			{
				"test":/\.(css|less)$/,
				"include":path.resolve(__dirname+"/src"),// 优化
				"use":[
					{
						"loader":"style-loader",
						"options":{
							"injectType":"singletonStyleTag"
						}
					},
					{
						"loader":"css-loader", 
						"options":{ // 引入过来的文件 需要通过postcss-loader 混用css 引用的时候
							"importLoaders":1
						}
					},
					{
						"loader":"postcss-loader",
						"options":{
							"plugins":(loader)=>[
								require("autoprefixer")({
									"overrideBrowserslist":["last 5 versions"]
								})
							]
						}
					},
					{
						"loader":"less-loader"
					}
				]
			},
			{
				"test":/\.(jpg|png|gif|svg)$/i,
				"include":path.resolve(__dirname+"/src"),// 优化
				"use":[
					{
						"loader":"url-loader",
						"options":{
							"limit":8192,
							"name":"assets/[name]-[hash:5].[ext]"
						}
					}
				]
			},
			{
				"test":/\.html$/,
				"include":path.resolve(__dirname+"/src/components"),// 优化
				"loader":"html-loader"
			},
			{
				"test":/\.(ejs|tpl)$/,
				"include":path.resolve(__dirname+"/src/components"),// 优化
				"loader":"ejs-loader"
			}
		]
	},
	"plugins":[
		new htmlWebpackPlugin({
			"filename":"index.html",
			"template":"./src/index.html",
			"inject":"head",
			"title":"dhy-01",
			"date":new Date(),
			"showErrors": true
		})
	]
}


module.exports =(env,args)=>{
	console.log(env);
	console.log(args);
	if(args.mode !=="development"){
		config.output.publicPath="http://cdn.com/"
	}
	return config
}