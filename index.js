const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render("index")
});

io.on('connection', (socket) => {
    console.log('user connected');
    var roomId=1
    socket.on("connectroom",roomid =>{
      socket.join(`room${roomid}`)
      roomId=roomid
      io.sockets.in(`room${roomid}`).emit("connectedtoroom","joined in room"+roomid)
    })
    
    socket.on('chat message', (msg) => {
        console.log(socket.rooms);
      io.sockets.in(`room${roomId}`).emit('chat message', msg);
    });
  });



















server.listen(3000, () => {
  console.log('listening on *:3000');
});