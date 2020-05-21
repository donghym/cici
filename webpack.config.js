const htmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path") // 优化
 let config = {
	"entry":"./src/app.jsx",
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
				"test":/\.css$/,
				"loader":"style-loader!css-loader"
			},
			{
				"test":/\.less$/,
				"loader":"style!css!less-loader"
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


module.exports =(env,args)=>{
	console.log(env);
	console.log(args);
	if(args.mode !=="development"){
		config.output.publicPath="http://cdn.com/"
	}
	return config
}