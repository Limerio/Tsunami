import { PassportModule } from '@nestjs/passport'
import { Module } from '@nestjs/common'

import { UsersModule } from '@api/modules/users'
import { Services } from '@api/utils/constants'

import { LocalStrategy } from './utils/local.strategy'
import { AuthController } from './controllers'
import { AuthService } from './services'

@Module({
  imports: [PassportModule.register({ session: true }), UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: Services.Auth,
      useClass: AuthService,
    },
    LocalStrategy,
  ],
})
export class AuthModule {}
