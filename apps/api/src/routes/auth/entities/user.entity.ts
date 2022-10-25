import { Exclude } from 'class-transformer'

export class UserEntity {
  username: string
  updateAt: Date
  createdAt: Date

  @Exclude()
  password: string

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}
