/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { IUsersService } from '@api/modules/users'
import { Services } from '@api/utils/constants'
import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { TUser } from '@tsunami-clone/types'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.Users)
    private readonly userService: IUsersService
  ) {
    super()
  }

  serializeUser(user: TUser, done: (err: Error, user: TUser) => void): void {
    done(null, user)
  }

  async deserializeUser(
    user: TUser,
    done: (err: Error, payload: TUser) => void
  ): Promise<void> {
    const userDb = await this.userService.findOne(user.username)
    return userDb ? done(null, userDb.toJSON()) : done(null, null)
  }
}
