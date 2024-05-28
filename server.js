const { Socket } = require('socket.io');

const io = require('socket.io')(8000, { cors: { origin: '*' } });

let total = 0;
let votingPolls = {
  'html-css': 0,
  javascript: 0,
  react: 0,
  'react-typescript': 0,
  nodejs: 0,
  nextjs: 0,
};

io.on('connection', (socket) => {
  socket.emit('update', { votingPolls, total });
  socket.on('send-vote', (lang) => {
    total += 1;
    votingPolls[lang] += 1;
    socket.broadcast.emit('receive-vote', { votingPolls, total });
    socket.emit('update', { votingPolls, total });
  });
});
