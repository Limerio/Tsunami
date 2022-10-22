import { TUser } from '@tsunami-clone/types'

export interface IUsersService {
  findOne(id: string): Promise<TUser | undefined>
}
