import { CreateUserDto, UpdateUserDto } from '../dtos'
import { UserDocument } from '../utils/types'

export interface IUsersService {
  findOne(username: string): Promise<UserDocument>
  create(data: CreateUserDto): Promise<UserDocument>
  update(username: string, data: UpdateUserDto): Promise<UserDocument>
  delete(username: string): Promise<boolean>
  comparePassword(password: string, encrypted: string): Promise<boolean>
}
