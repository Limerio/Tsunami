// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import type { TUserWithPassword } from '@api/modules/users'
import { Request } from 'express'
import { Socket } from 'socket.io'

export type EnvKeys = 'PORT' | 'DATABASE_URL' | 'BCRYPT_SALT' | 'SESSION_SECRET'

export interface AuthenticatedSocket extends Socket {
  user?: TUserWithPassword
}

export interface AuthenticatedRequest extends Request {
  user: TUserWithPassword
}
