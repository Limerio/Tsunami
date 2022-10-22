import { Injectable } from '@nestjs/common'

import type { TUser } from '@tsunami-clone/types'

import { IAuthService } from '../interfaces'

@Injectable()
export class AuthService implements IAuthService {
  validateUser(username: string, password: string): Promise<TUser> {
    throw new Error('Method not implemented.')
  }
}
