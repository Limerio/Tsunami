import { NestExpressApplication } from '@nestjs/platform-express'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as compression from 'compression'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'
import { createClient } from 'redis'
import * as passport from 'passport'

import { MainModule } from './main.module'
import { WsAdapter } from './events'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule)
  const port = process.env.PORT
  const RedisStore = connectRedis(session)
  const redisClient = createClient({ legacyMode: true })
  await redisClient.connect()

  app.useWebSocketAdapter(new WsAdapter(app))
  app.useGlobalPipes(new ValidationPipe())
  app.use(compression())
  app.set('trust proxy', 'loopback')
  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
  })
  app.use(
    session({
      name: 'SESSION_ID',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 86400000,
      },
      store: new RedisStore({ client: redisClient }),
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(port)
  Logger.log(`🚀 Application API is running on: http://localhost:${port}`)
}

bootstrap()
