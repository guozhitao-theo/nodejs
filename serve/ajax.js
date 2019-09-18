// 新建一个xml对象
var request = new XMLHttpRequest

// 打开一个请求
request.open("GET",'http://127.0.0.1:3000',true)

// 发送请求到后台
request.send(null)

// 请求监听
request.onreadystatechange = function(){
// 判断状态是否在4状态
if(request.readyState == 4){
    // 将json字符串转成对象
    let JsonObj = JSON.parse(request.responseText)
    console.log(JsonObj)
}

}