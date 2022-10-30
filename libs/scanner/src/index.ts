import { EventsWs } from '@tsunami-clone/constants'
import * as net from 'net'
import { io } from 'socket.io-client'

export default (ip: string) => {
  const socketIo = io('http://localhost:4001', {
    auth: { username: 'scanner' },
  })

  socketIo.on('connect_error', err => console.error(err))

  for (let i = 1; i < 65536; i++) {
    const socket = new net.Socket()
    socket
      .connect(i, ip)
      .on('ready', () => {
        const data = {
          port: i,
          open: true,
        }
        socketIo.emit(EventsWs.PortReady, data)
        console.log('Port', i, 'in use', socket.remoteFamily)
      })
      .on('error', err => {
        console.log(err)
        if (err.message.includes('ECONNREFUSED')) {
          const data = {
            port: i,
            open: true,
          }
          socketIo.emit('scan.port.down', data)
          return
        }
      })
      .end()
  }
}
