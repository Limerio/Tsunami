// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import type { TUserWithPassword } from '@api/modules/users'
import { Request } from 'express'

export interface AuthenticatedRequest extends Request {
  user: TUserWithPassword
}
