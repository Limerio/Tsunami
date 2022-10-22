import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import * as compression from 'compression'

import { MainModule } from './main.module'

async function bootstrap() {
  const port = process.env.PORT
  const app = await NestFactory.create(MainModule)

  app.use(compression())
  app.enableCors()

  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
