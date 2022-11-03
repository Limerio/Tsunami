import { Module } from '@nestjs/common'
import { AppModule } from './app'
import { AuthModule } from './auth'
import { ScanRouteModule } from './scans'

@Module({
  imports: [AppModule, AuthModule, ScanRouteModule],
})
export class RoutesModule {}
