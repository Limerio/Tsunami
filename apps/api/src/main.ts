import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as compression from 'compression'
import * as session from 'express-session'
import * as passport from 'passport'

import { MainModule } from './main.module'

async function bootstrap() {
  const port = process.env.PORT
  const app = await NestFactory.create<NestExpressApplication>(MainModule)

  app.useGlobalPipes(new ValidationPipe())
  app.use(compression())
  app.set('trust proxy', 'loopback')
  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
  })
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 86400000,
      },
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
