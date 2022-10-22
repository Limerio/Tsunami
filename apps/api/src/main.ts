import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { MainModule } from './main.module'

async function bootstrap() {
  const port = process.env.PORT
  const app = await NestFactory.create(MainModule)

  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
