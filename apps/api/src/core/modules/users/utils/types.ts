import { Document } from 'mongoose'

export type TUser = {
  username: string
  updateAt: Date
  createdAt: Date
  scans: unknown[]
}

export type TUserWithPassword = TUser & { password: string }
export type UserDocument = Document<unknown, unknown, TUserWithPassword> &
  TUserWithPassword
