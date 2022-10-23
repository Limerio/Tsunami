// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TUserWithoutPassword } from '@api/modules/users'
import { Request } from 'express'

export interface IAuthService {
  validateUser(
    username: string,
    password: string
  ): Promise<TUserWithoutPassword | null>
}

export interface AuthenticatedRequest extends Request {
  user: TUserWithoutPassword
}
