import { Server } from 'socket.io';

let io;

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('* Inicializando Socket.io');

    io = new Server(res.socket.server, {
      path: '/api/socket_io',
      addTrailingSlash: false,
      cors: {
        origin: '*',
      },
    });

    io.on('connection', socket => {
      console.log('Novo usuário conectado');

      socket.on('puzzle-action', data => {
        io.emit('puzzle-update', data);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}