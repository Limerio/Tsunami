/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Inject, Injectable } from '@nestjs/common'

import { IUsersService } from '@api/modules/users'
import { Services } from '@api/utils/constants'

import { IAuthService } from '../interfaces'
import { TUser } from '@api/modules/users'

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.Users) private readonly usersService: IUsersService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<TUser | null> {
    const user = await this.usersService.findOne(username)
    if (user && this.usersService.comparePassword(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toJSON()
      return result
    }
    return null
  }
}
