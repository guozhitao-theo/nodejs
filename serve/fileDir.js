// 读取文件并返回文件的目录到页面

// 引入模块
let http = require("http")
let url = require("url")
let fs = require("fs")
let path = require("path")
// 引入一个变量计数
let count = 0;

// 创建一个服务器
let server =  http.createServer(function(req,res){
    // 解析路径 
    let pathname = url.parse(req.url).pathname
    // 更改头文件的类型
    res.writeHead(200,{
        "Content-Type":"text/html;charset=utf-8"
    })

    // 监听路径.判断路径中是否含有某个目录
    if(!pathname.indexOf("/static")){       
        getFile(pathname,function(item,fsContent,isDir){ 
            count++;
            if(isDir){
                res.write('<a href="'+pathname+"/"+item+'">'+item+'</a></br>')
            }else{
                res.write('<a>'+item+'</a></br>') 
                console.log(__dirname+pathname+'/'+item)
                console.log( path.extname(item))
                if(path.extname(item)==".jpg"){}
            }         
            if(count>=fsContent.length){
                count = 0;                
                res.end("")
            }else{
                // console.log(count)
            }

        },function(){
            res.end("<h1>当前目录为空</h1>")
        })
    }else{
       
        res.end("你访问的目录不存在")
    }
}).listen(3000)




// 通过获取的服务器地址找到文件的地址
// 传的参数为获取的地址
function getFile(pathname,callback,callback2){
    // 读取文件目录
    let fsContent = fs.readdirSync(__dirname+pathname)

    // 判断文件是否为空，如果不为空
    if(fsContent.length){
        // 循环数组获得其中的内容
        for(let item of fsContent){
            // 判断文件的类型
            fs.stat(__dirname+pathname+"/"+item,function(err,stat){
                // 将item的内容返回到页面 
                callback(item,fsContent,stat.isDirectory())
            })
        }
    }else{
        callback2()
    }

    
}

