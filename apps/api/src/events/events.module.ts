/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Module } from '@nestjs/common'

import { SessionsModule } from '@api/modules/sessions'
import { EventsGateway } from './events.gateway'

@Module({
  imports: [SessionsModule],
  providers: [EventsGateway],
})
export class EventsModule {}
