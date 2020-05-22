const path = require("path") // 优化
 let config = {
	"entry":"./src/app.js",
	"output":{
		"path":path.resolve(__dirname+"/dist"),
		"filename":"js/[name].[chunkhash].js"
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
						"options":{ // 引入过来的文件 需要通过postcss-loader
							"importLoaders":1
						}
					},
					{
						"loader":"postcss-loader",
						"options":{
							"plugins":(loader)=>[
								require("autoprefixer")({
									"browsers":["last 5 versions"]
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
				"test":/\.(jpg|png|gif)$/,
				"use":[
					{
						"loader":"file-loader"
					},
					{
						"loader":"url-loader",
						"options":{
							"limit":1000
						}
					}
				]
			}
		]
	},
	"plugins":[
		new htmlWebpackPlugin({
			"filename":"index.html",
			"template":"src/index.html",
			"inject":"head",
			"title":"dhy-01",
			"date":new Date()
		})
	]
}
