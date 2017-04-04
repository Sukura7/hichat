const express=require('express');
const app=express();
const server=require('http').createServer(app);
const users=[];
// socket.io 是websocket html5是开发实时项目的利器
// js前后端通用，所以socket.io非常流行
// socket 实时通信协议 QQ 游戏
// 基于web server上再构建的一层websocket
const io=require('socket.io').listen(server);
app.use('/',express.static(__dirname+'/www'));
server.listen(3000);
// socket.io 将websocket协议抽象出来的事件 message
io.sockets.on('connection',function(socket){
  socket.on('login',function(nickname){
    if(users.indexOf(nickname)>-1){
      console.log(nickname+'重名了');
      socket.emit('nickExisted');
    }else{
    socket.nickname=nickname;
    users.push(nickname);
    // console.log(nickname);
    socket.emit('loginSuccess');
    // 服务器向所有的连接的客户端发送消息
    io.sockets.emit('system',nickname,users.length,'login')
  }

  });
})
