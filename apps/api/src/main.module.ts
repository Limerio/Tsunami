import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'

import type { ConfigServiceWithKeys } from '@api/utils/interfaces'
import { RoutesModule } from './routes'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigServiceWithKeys) => {
        return configService.get('DATABASE_URL')
      },
      inject: [ConfigService],
    }),
    RoutesModule,
  ],
})
export class MainModule {}
