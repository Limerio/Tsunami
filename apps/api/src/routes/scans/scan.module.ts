import { Module } from '@nestjs/common'

import { Services } from '@api/utils/constants'
import { ScanController } from './controllers'
import { ScanService } from './services'

@Module({
  controllers: [ScanController],
  providers: [
    {
      provide: Services.Scans,
      useClass: ScanService,
    },
  ],
})
export class ScanModule {}
