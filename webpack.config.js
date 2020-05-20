const htmlWebpackPlugin = require("html-webpack-plugin")
 let config = {
    "entry":{
        "a":__dirname+'/src/js/main.js',
        "b":__dirname+'/src/js/index.js',
        "c":__dirname+'/src/js/index2.js'
    },
    "output":{
        "path":__dirname+"/dist",
        "filename":"js/[name].[chunkhash].js"
    },
    "plugins":[
        new htmlWebpackPlugin({
            "filename":"index.html",
            "template":"index.html",
            "inject":"head",
            "title":"dhy",
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