import { Module } from '@nestjs/common'

import { AppController } from './controllers'

@Module({
  controllers: [AppController],
})
export class AppModule {}
