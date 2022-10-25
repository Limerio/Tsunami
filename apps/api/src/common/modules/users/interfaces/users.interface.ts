import { CreateUserDto } from 'apps/api/src/routes/auth/dtos'
import { UpdateUserDto } from '../dtos'
import { UserDocument } from '../utils/types'

export interface IUsersService {
  findOne(username: string): Promise<UserDocument>
  create(data: CreateUserDto): Promise<UserDocument>
  update(username: string, data: UpdateUserDto): Promise<UserDocument>
  comparePassword(password: string, encrypted: string): Promise<boolean>
}
