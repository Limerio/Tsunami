import * as net from 'net'

for (let i = 4000; i < 4010; i++) {
  const socket = new net.Socket()
  socket
    .connect(i, '127.0.0.1')
    .on('ready', () => {
      console.log('Port in use', socket.remoteFamily)
    })
    .on('error', err => {
      if (err.message.includes('ECONNREFUSED')) {
        console.log('port not in use')
      }
    })
    .end()
}
