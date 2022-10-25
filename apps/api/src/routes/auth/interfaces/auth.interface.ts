// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TUserWithPassword } from '@api/modules/users'
import { TUser } from '@tsunami-clone/types'
import { Request } from 'express'

export interface IAuthService {
  validateUser(username: string, password: string): Promise<TUser | null>
}

export interface AuthenticatedRequest extends Request {
  user: TUserWithPassword
}
