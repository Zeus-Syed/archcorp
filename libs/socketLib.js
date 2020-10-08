
const socketio = require('socket.io');
const mongoose = require('mongoose');
const tokenLib = require('../libs/tokenLib');



let setServer = (server)=>{
let OnlineUsers = [];
 let io = socketio.listen(server);
 let myIo = io.of('');

 myIo.on('connection', (socket)=>{
     console.log('verify user emitting');
     socket.emit('verifyUser','');

     socket.on('set-user',(authToken)=>{
        console.log('setting user');
        tokenLib.verifyClaimWithoutSecret(authToken, (err, user)=>{
            if(err){
                socket.emit('auth-error', {status: 500, error: 'Please provide valid auth Token'});
            }
            else{
                console.log("user is verified ...setting details");
                let currentUser = user.data;
                socket.userId = currentUser.userId;
                let fullName = `${currentUser.firstName} ${currentUser.lastName}`;
                console.log(`${fullName} is online`);
                //socket.emit(currentUser.userId, 'You are online');
                 let flag =0;
                let userObj = {userId: currentUser.userId, fullName: fullName};
                for(let x of OnlineUsers){
                    if(x.userId == currentUser.userId){
                  flag = 1;
                break;
                    }
                }
              if(flag == 0){
                OnlineUsers.push(userObj);
              }
                console.log(OnlineUsers);
   
                socket.room = 'edChat';
                socket.join(socket.room);
                socket.to(socket.room).broadcast.emit('online-user-list', OnlineUsers);
            }
        })
    }) // set-user

    socket.on('history',(message)=>{
      console.log(message);
      console.log("Message received");
     socket.to(socket.room).broadcast.emit('history-details', message);
     //socket.emit('history-details', message);
    })

    socket.on('disconnect', ()=>{
        console.log('Logged out Successfully!!!');
        console.log(socket.userId);
      //  let removeIndex = OnlineUsers.map(function(user){ user.userId; }).indexOf(socket.userId);
        // OnlineUsers.splice(removeIndex,1);
          OnlineUsers = OnlineUsers.filter((e)=>{
              return e.userId !== socket.userId;
          })
        console.log(OnlineUsers);
       
        socket.to(socket.room).broadcast.emit('online-user-list', OnlineUsers);
        socket.leave(socket.room);
        //socket.open();
       
       } );

      


 }) //myIO Connection

 

}

module.exports = {
    setServer: setServer
}