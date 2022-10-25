/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common'
import { AuthService } from '../services'
import { Services } from '@api/utils/constants'
import { TUser } from '@tsunami-clone/types'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(Services.Auth) private readonly authService: AuthService
  ) {
    super()
  }

  async validate(username: string, password: string): Promise<TUser> {
    const user = await this.authService.validateUser(username, password)
    if (!user) throw new UnauthorizedException()

    return user
  }
}
