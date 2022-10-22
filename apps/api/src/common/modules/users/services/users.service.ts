import { Injectable } from '@nestjs/common'

import { IUsersService } from '../interfaces'
import { TUser } from '@tsunami-clone/types'

@Injectable()
export class UsersService implements IUsersService {
  findOne(id: string): Promise<TUser> {
    throw new Error('Method not implemented.')
  }
}
