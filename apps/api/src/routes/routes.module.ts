import { Module } from '@nestjs/common'
import { AppModule } from './app'
import { AuthModule } from './auth'
import { ScanModule } from './scans'

@Module({
  imports: [AppModule, AuthModule, ScanModule],
})
export class RoutesModule {}
