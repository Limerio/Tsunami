/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Module } from '@nestjs/common'

import { portsQueue } from '@tsunami-clone/constants'
import { Services } from '@api/utils/constants'
import { ScanModule } from '@api/modules/scans'
import { ScanController } from './controllers'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EnvKeys } from '@api/utils/types'

@Module({
  imports: [
    ScanModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: Services.RabbitMq,
        useFactory(configService: ConfigService<Record<EnvKeys, unknown>>) {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [configService.get('RABBITMQ_URL') as string],
              queue: portsQueue,
              queueOptions: {
                durable: true,
                autoDelete: true,
              },
            },
          }
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ScanController],
})
export class ScanRouteModule {}
