
// 
module.exports = {
    "entry":{
        a:__dirname+'/src/js/main.js',
        b:__dirname+'/src/js/index.js'
    },
    "output":{
        "path":__dirname+"/dist/js/",
        "filename":"[name].[chunkhash].js"
    }
}