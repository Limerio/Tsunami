import { EventsWs } from '@tsunami-clone/constants'
import * as net from 'net'
import { io } from 'socket.io-client'
import { API_URL } from './utils/constants'
import { checkSystem } from './utils/functions'

type ScanData = { id: string; ip: string }

export default async (scanData: ScanData, username: string) => {
  const socketIo = io(API_URL, {
    auth: { username: 'scanner' },
  })

  socketIo.on('connect', () =>
    socketIo.emit(EventsWs.ScanInProgress, { scan: scanData, username })
  )

  socketIo.on(
    'connect_error',
    err =>
      err.message.includes('ECONNREFUSED') &&
      console.log("Can't connect to the ws server")
  )

  const scan = {
    ...scanData,
    ports: [],
  }

  for (let i = 1; i < 65536; i++) {
    const socket = new net.Socket()
    socket
      .connect(i, scanData.ip)
      .on('ready', () => {
        if (checkSystem(i) !== null) {
          scan.ports.push({
            port: i,
            open: true,
            type: checkSystem(i),
          })
        } else {
          scan.ports.push({
            port: i,
            open: true,
            type: 'unknown',
          })
        }
        console.log(`Port open ${i}`)
      })
      .on('error', err => {
        if (err.message.includes('ECONNREFUSED')) {
          scan.ports.push({
            port: i,
            open: false,
            type: 'unknown',
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
