/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Module } from '@nestjs/common'

import { portsQueue } from '@tsunami-clone/constants'
import { Services } from '@api/utils/constants'
import { ScanModule } from '@api/modules/scans'
import { ScanController } from './controllers'

@Module({
  imports: [
    ScanModule,
    ClientsModule.register([
      {
        name: Services.RabbitMq,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: portsQueue,
          queueOptions: {
            durable: true,
            autoDelete: true,
          },
        },
      },
    ]),
  ],
  controllers: [ScanController],
})
export class ScanRouteModule {}
