// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TUser } from '@tsunami-clone/types'

export interface IAuthService {
  validateUser(username: string, password: string): Promise<TUser | null>
}
