import { Module } from '@nestjs/common'
import { AppModule } from './app/app.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [AppModule, AuthModule],
})
export class RoutesModule {}
