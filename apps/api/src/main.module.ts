import { Module } from '@nestjs/common'

import { RoutesModule } from './routes'

@Module({
  imports: [RoutesModule],
})
export class MainModule {}
