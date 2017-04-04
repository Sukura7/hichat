window.onload=function(){
  var hichat=new HiChat();
  hichat.init();

}
// HiChat类
var HiChat=function(){
  this.socket=null;
}
HiChat.prototype={
  init:function(){
    var that=this;
    // io就是我们的socket对象，调用connect方法跟
    // 服务器端连接上
    this.socket=io.connect();
    this.socket.on('connect',function(){
      document.getElementById('info').textContent='输入您的昵称';
      document.getElementById('nickWrapper').style.display='block';
      document.getElementById('nicknameInput').focus();
    });
    this.socket.on('loginSuccess',function(){
      document.title='hichat |'+document.getElementById('nicknameInput').value;
      document.getElementById('loginWrapper').style.display='none';
      document.getElementById('messageInput').focus();
    })
    this.socket.on('nickExisted',function(){
      document.getElementById('info').textContent='你的昵称已占用';
    })
    this.socket.on('system',function(nickName,userCount,type){
      var msg=`${nickName} ${type=='login'?'来到聊天室':'离开了'}`;
      that._displayNewMsg('系统',msg,'red');
      document.getElementById('status').textContent=`${userCount}+位用户在线`;
    })
    document.getElementById('loginBtn').addEventListener('click',function(){
      var nickName=document.getElementById('nicknameInput').value;
      if(nickName.trim().length!=0){
        that.socket.emit('login',nickName);
      }else{
        document.getElementById('nicknameInput').focus();
      }
    },false);
  },
  _displayNewMsg:function(user,msg,color){
    var container=document.getElementById('historyMsg'),
        msgToDisplay=document.createElement('p'),
        date=new Date().toTimeString().substr(0,8);
        console.log(container);
        console.log(msgToDisplay);
        msgToDisplay.style.color=color || '#000';
        msgToDisplay.innerHTML=`${user}<span class="timespan">(${date}):</span>${msg}`;
        container.appendChild(msgToDisplay);
        container.scrollTop=container.scrollHeight;
  }
}
