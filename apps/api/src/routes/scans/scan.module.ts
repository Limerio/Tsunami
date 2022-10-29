/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { MongooseModule } from '@nestjs/mongoose'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Module } from '@nestjs/common'

import { portsQueue } from '@tsunami-clone/constants'
import { UsersModule } from '@api/modules/users'
import { Services } from '@api/utils/constants'
import { ScanController } from './controllers'
import { ScanService } from './services'
import { Scan } from './models'

@Module({
  imports: [
    MongooseModule.forFeature([Scan]),
    UsersModule,
    ClientsModule.register([
      {
        name: Services.RabbitMq,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: portsQueue,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ScanController],
  providers: [
    {
      provide: Services.Scans,
      useClass: ScanService,
    },
  ],
})
export class ScanModule {}
