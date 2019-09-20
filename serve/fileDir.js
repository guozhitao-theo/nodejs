// 读取文件并返回文件的目录到页面

// 引入模块
let http = require("http")
let url = require("url")
let fs = require("fs")

// 引入一个变量计数
let count = 0;

// 创建一个服务器
let server =  http.createServer(function(req,res){
    // 解析路径 
    let pathname = url.parse(req.url).pathname
    // 监听路径
    if(pathname=="/static"){
        // 更改头文件的类型
        res.writeHead(200,{
            "Content-Type":"text/html;charset=utf-8"
        })
        getFile(pathname,function(item,count,fsContent,isDir){   
            console.log(count)
            if(isDir){
                res.write('<a href="'+pathname+"/"+item+'">'+item+'</a></br>')
            }else{
                res.write('<a>'+item+'</a></br>') 
            }         
                       
            if(count>=fsContent.length-1){
                res.end("<h1>这是里没有文件了</h1>")
            }else{
                // console.log(count)
            }
        })
    }else{
       
        res.end("你访问的目录不存在")
    }
}).listen(3000)




// 通过获取的服务器地址找到文件的地址
// 传的参数为获取的地址
function getFile(pathname,callback){
    // 读取文件目录
    let fsContent = fs.readdirSync(__dirname+pathname)
    // 循环数组获得其中的内容
    for(let item of fsContent){
        
        // 判断文件的类型
        fs.stat(__dirname+pathname+"/"+item,function(err,stat){
            // 将item的内容返回到页面 
            callback(item,count,fsContent,stat.isDirectory())
            count++;
        })

       
    }
}

