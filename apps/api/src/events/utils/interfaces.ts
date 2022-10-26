import { Socket } from 'socket.io'

import type { TUserWithPassword } from '@api/modules/users'

export interface AuthenticatedSocket extends Socket {
  user?: TUserWithPassword
}
