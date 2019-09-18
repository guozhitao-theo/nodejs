// 引入框架
let express = require("express")
// 执行express方法
let app = express()

// 引入静态模块使用express.use(文件的路径)
app.use(express.static("../"))

// 请求跨域app.all("*") 相当于请求拦截，所有的请求都会经过app.all()
// *监听所有的文件地址
app.all("*",function(req,res,nextfunction){
    res.header("Access-Control-Allow-Origin","*")
    nextfunction()
})


// 监听get请求
// app.get(监听地址，回调函数有req,和res两个参数)
app.get("/index",function(req,res){
let fs = require('fs')
fs.readFile("../static/index.html",function(err,data){
    if(!err){
        console.log(data.toString())
        res.json(data.toString())
    }
    console.log(err)
})

    
})
app.listen(3000)