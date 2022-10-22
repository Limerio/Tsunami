import type { TUser } from '@tsunami-clone/types'

export interface IAuthService {
  validateUser(username: string, password: string): Promise<TUser | null>
}
