import { Exclude } from 'class-transformer'
import { ObjectId } from 'mongoose'

export class UserEntity {
  username: string
  updateAt: Date
  createdAt: Date

  @Exclude()
  password: string

  @Exclude()
  __v: number

  @Exclude()
  _id: ObjectId

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}
