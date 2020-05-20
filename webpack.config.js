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
            "filename":"a.html",
            "template":"src/index.html",
            "inject":false,
            "title":"dhy-01",
            "date":new Date(),
            // "chunks":["a"],
            "excludeChunks":["b"]
        }),
        new htmlWebpackPlugin({
            "filename":"b.html",
            "template":"src/index.html",
            "inject":"head",
            "title":"dhy-02",
            "date":new Date(),
            "chunks":["b"]
        }),
        new htmlWebpackPlugin({
            "filename":"c.html",
            "template":"src/index.html",
            "inject":"head",
            "title":"dhy-03",
            "date":new Date(),
            "chunks":["c"],
            "minify":{ 
                "removeComments":true, //去注释
                "collapseWhitespace":true// 去空格
            }
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