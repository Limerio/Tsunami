import { EventsWs } from '@tsunami-clone/constants'
import * as net from 'net'
import { io } from 'socket.io-client'

export default async (ip: string, username: string) => {
  const socketIo = io('http://localhost:4001', {
    auth: { username: 'scanner' },
  })

  socketIo.on('connect', () => {
    socketIo.emit(EventsWs.ScanInProgress, { ip, username })
  })

  socketIo.on(
    'connect_error',
    err =>
      err.message.includes('ECONNREFUSED') &&
      console.log("Can't connect to the ws server")
  )

  const scan = {
    ip,
    ports: [],
  }

  for (let i = 1; i < 65536; i++) {
    const socket = new net.Socket()
    socket
      .connect(i, ip)
      .on('ready', () => {
        scan.ports.push({
          port: i,
          open: true,
        })
        console.log('Port', i, 'in use', socket.remoteFamily)
      })
      .on('error', err => {
        if (err.message.includes('ECONNREFUSED')) {
          scan.ports.push({
            port: i,
            open: true,
          })
          return
        }
      })
      .end()
    if (i === 65535) {
      socketIo.emit(EventsWs.ScanFinish, { scan, username })
    }
  }
}
