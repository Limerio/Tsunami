import { TUser } from '@tsunami-clone/types'
import { Document } from 'mongoose'

export type TUserWithPassword = TUser & { password: string }
export type UserDocument = Document<unknown, unknown, TUserWithPassword> &
  TUserWithPassword
