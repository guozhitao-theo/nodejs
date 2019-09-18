let http = require('http')
let url = require('url')
// 创建一个服务器
let server = http.createServer(function(request,reponse){
    //request.url 获取
    // 将 字符串地址转换成字符串对象
    //url.parse(需要转的字符串， )
    let gg= url.parse(request.url)
    // 更改头文件的内容
    reponse.writeHead(200,{
        "Content-Type":"text/html;charset=utf-8"
    })
    //结束当前请求
    reponse.end("是happy")   
}).listen(3000,'127.0.0.1')

