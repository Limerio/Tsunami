import { TScan } from '@tsunami-clone/types'
import { Exclude } from 'class-transformer'

export class UserEntity {
  username: string
  updateAt: Date
  createdAt: Date
  scans: TScan[]

  @Exclude()
  password: string

  @Exclude()
  __v: number

  @Exclude()
  _id: unknown

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}
