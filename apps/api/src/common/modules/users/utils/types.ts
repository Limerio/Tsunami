import { TUser } from '@tsunami-clone/types'
import { Document } from 'mongoose'

export type TUserWithoutPassword = { username: string }
export type UserDocument = Document<any, any, TUser> & TUser
