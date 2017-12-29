const socketIo = require('socket.io');

let connection = null;

function connect(server) {
  
  const io = socketIo(server);

  const nsp = io.of('/message-stream');

  nsp.on('connection', socket => {
    console.log(`${socket.id} connected`);
    socket.on('newMessage', data => socket.broadcast.emit('newMessage', data));
  });

  connection = nsp;
  return connection;
}

function getConnection() {
  return connection;
}

module.exports = { connect, getConnection };