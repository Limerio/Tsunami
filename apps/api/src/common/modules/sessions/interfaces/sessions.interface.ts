// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthenticatedSocket } from '@api/utils/interfaces'

export interface ISessionsService {
  getUserSession(id: string): AuthenticatedSocket
  addUserSession(id: string, socket: AuthenticatedSocket): void
  removeUserSession(id: string): void
  getSessions(): Map<string, AuthenticatedSocket>
}
