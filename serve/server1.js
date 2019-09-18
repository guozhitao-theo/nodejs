let http = require('http')
// 新建一个服务器
http.createServer(function(request,response){
    console.log(request.url)
}).listen(3001,'127.0.0.1')