// 引入框架
let express = require("express")
let url = require("url")
let path = require("path")
// 执行express方法
let app = express()

// 引入静态模块使用express.use(文件的路径)
app.use(express.static("../"))

// 请求跨域app.all("*") 相当于请求拦截，所有的请求都会经过app.all()
// *监听所有的文件地址
app.all("*",function(req,res,nextfunction){
    // 
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    nextfunction()
})


// 监听get请求
// app.get(监听地址，回调函数有req,和res两个参数)
app.get("/index",function(req,res){
    // // 获取路径
    // let reqUrl = req.url
    // // 将获取的url转为对象 并且获得其路径名（pathname）
    // let pathName = url.parse(reqUrl).pathname
    // // 获取路径的后缀名
    // console.log(path.extname(pathName))

    //读取请求完成需要加载的文件 
    let fs = require('fs')
    fs.readFile("../static/index.html",function(err,data){
        if(!err){

        //    res.writeHead(200,{"Content-Type":"text/plain" })
           return res.json(data.toString())
           // res.send(data.toString());
            // res.end(data)
        }
        console.log(err)
    })

    
})
app.listen(3000)


// 获取拓展名的方法
function getType(){

}
