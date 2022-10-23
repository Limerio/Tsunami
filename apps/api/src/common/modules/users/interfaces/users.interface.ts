import type { TUser } from '@tsunami-clone/types'
import { UpdateUserDto } from '../dtos'
import { UserDocument } from '../utils/types'

export interface IUsersService {
  findOne(username: string): Promise<UserDocument>
  create(data: TUser): Promise<UserDocument>
  update(username: string, data: UpdateUserDto): Promise<UserDocument>
  comparePassword(password: string, encrypted: string): Promise<boolean>
}
