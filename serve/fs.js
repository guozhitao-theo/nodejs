// 创建一个文件监听服务器并且返回index中的页面

let http = require('http')
let url = require('url')
let fs = require('fs')
let path = require('path')
// 创建一个服务器
let server =  http.createServer(function(req,res){
// 解析地址
let obj = url.parse(req.url)
// 获得当前地址的路径
let filePath = obj.pathname
 
// 判断路径不含  "/favicon.ico" 
if(filePath!="/favicon.ico"){
    filePath = __dirname+"/static"+filePath
    fileAccess(filePath)  
}




// 一个文件访问的方法
function fileAccess(filePath){
    // 读取文件index.html

    //获取地址文件的扩展名
    let extname = path.extname(filePath)
    fs.readFile(filePath,function(err,data){
      // 判断err
        if(!err){
            // 调用获取文件扩展名函数
            getType(extname,function(fileType){
                // 更改头文件,改变编码格式
                res.writeHead(200,{
                    "Content-Type":fileType
                })
                res.end(data)
            })  
        }else{
            res.writeHead(200,{
                "Content-Type":"text/html;charset=utf-8"
            })
            res.end( "文件读取失败!")
        }
    })
}
}).listen(3000)


// 获得文件扩展名的方法
function getType(extname,callback){
    //1.访问文件
    fs.readFile("./mime.json",function(err,data){
        // data为buffer输出
        // 将data转换成JSON对象
        data = JSON.parse(data)
        // 匹配对应的后缀名
        let fileType = data[extname] || "text/plain"
        callback(fileType)
    })
}