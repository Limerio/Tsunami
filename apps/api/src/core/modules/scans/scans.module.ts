/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'

import { UsersModule } from '@api/modules/users'
import { Services } from '@api/utils/constants'
import { ScanService } from './services'
import { Scan } from './models'

const providersAndExports = [
  {
    provide: Services.Scans,
    useClass: ScanService,
  },
]

@Module({
  imports: [MongooseModule.forFeature([Scan]), UsersModule],
  providers: providersAndExports,
  exports: providersAndExports,
})
export class ScanModule {}
