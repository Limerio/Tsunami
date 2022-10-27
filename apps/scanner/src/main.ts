import * as net from 'net'
import { io } from 'socket.io-client'

const socketIo = io('http://localhost:4001')

socketIo.on('connect_error', err => console.error(err))

for (let i = 1; i < 65536; i++) {
  const socket = new net.Socket()
  socket
    .connect(i, 'localhost')
    .on('ready', () => {
      console.log('Port', i, 'in use', socket.remoteFamily)
    })
    .on('error', err => {
      if (err.message.includes('ECONNREFUSED')) {
        return
      }
    })
    .end()
}
