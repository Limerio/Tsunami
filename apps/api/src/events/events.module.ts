/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Module } from '@nestjs/common'

import { SessionsModule } from '@api/modules/sessions'
import { EventsGateway } from './events.gateway'
import { ScanModule } from '@api/modules/scans'

@Module({
  imports: [SessionsModule, ScanModule],
  providers: [EventsGateway],
})
export class EventsModule {}
