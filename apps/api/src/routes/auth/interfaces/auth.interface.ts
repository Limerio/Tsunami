// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TUser } from '@api/modules/users'

export interface IAuthService {
  validateUser(username: string, password: string): Promise<TUser | null>
}
