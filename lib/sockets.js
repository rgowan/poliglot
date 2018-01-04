const socketIo = require('socket.io');

let connection = null;

function connect(server) {
  
  const io = socketIo(server);

  const nsp = io.of('/sockets');

  nsp.on('connection', socket => {
    console.log('browser connected to socket');
    socket.on('newMessage', data => socket.broadcast.emit('newMessage', data));
    
    socket.on('disconnect', () => console.log('browser disconnected from socket'));
  });

  connection = nsp;
  return connection;
}

function getConnection() {
  return connection;
}

module.exports = { connect, getConnection };