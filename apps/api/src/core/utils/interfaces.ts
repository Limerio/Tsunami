// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import type { TUserWithPassword } from '@api/modules/users'
import { Socket } from 'socket.io'
import { Request } from 'express'

export interface AuthenticatedRequest extends Request {
  user: TUserWithPassword
}

export interface AuthenticatedSocket extends Socket {
  user?: TUserWithPassword
}
