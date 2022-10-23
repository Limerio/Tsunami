import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import * as compression from 'compression'
import * as session from 'express-session'
import * as passport from 'passport'

import { MainModule } from './main.module'

async function bootstrap() {
  const port = process.env.PORT
  const app = await NestFactory.create(MainModule)

  app.useGlobalPipes(new ValidationPipe())
  app.use(compression())
  app.enableCors()
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
