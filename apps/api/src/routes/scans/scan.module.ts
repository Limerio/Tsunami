import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'

import { Services } from '@api/utils/constants'
import { ScanController } from './controllers'
import { ScanService } from './services'
import { Scan } from './models'

@Module({
  imports: [MongooseModule.forFeature([Scan])],
  controllers: [ScanController],
  providers: [
    {
      provide: Services.Scans,
      useClass: ScanService,
    },
  ],
})
export class ScanModule {}
