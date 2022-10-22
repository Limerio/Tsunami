import { Module } from '@nestjs/common'

import { Services } from '@api/utils/constants'
import { UsersService } from './services'

@Module({
  providers: [
    {
      provide: Services.Users,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
