// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthenticatedSocket } from '@api/utils/interfaces'
import { IoAdapter } from '@nestjs/platform-socket.io'
import * as cookieParser from 'cookie-parser'
import * as cookie from 'cookie'
import { createClient } from 'redis'
import { UserEntity } from '../routes/auth/entities'

export class WsAdapter extends IoAdapter {
  createIOServer(port: number, options?: unknown) {
    const server = super.createIOServer(port, options)

    server.use(async (socket: AuthenticatedSocket, next) => {
      const { cookie: clientCookie } = socket.handshake.headers

      if (!clientCookie) {
        console.log('Client has no cookies')
        return next(new Error('Not Authenticated. No cookies were sent'))
      }

      const { SESSION_ID } = cookie.parse(clientCookie)
      if (!SESSION_ID) {
        console.log('CHAT_APP_SESSION_ID DOES NOT EXIST')
        return next(new Error('Not Authenticated'))
      }
      const signedCookie = cookieParser.signedCookie(
        SESSION_ID,
        process.env.SESSION_SECRET
      )

      if (!signedCookie) return next(new Error('Error signing cookie'))

      const redisClient = createClient()
      await redisClient.connect()

      const sessionDB = JSON.parse(
        await redisClient.get(`sess:${signedCookie}`)
      )
      if (!sessionDB) return next(new Error('No session found'))

      if (!sessionDB.passport || !sessionDB.passport.user)
        return next(new Error('Passport or User object does not exist.'))

      const userDB = new UserEntity(sessionDB.passport.user)
      socket.user = userDB
      next()
    })
    return server
  }
}
