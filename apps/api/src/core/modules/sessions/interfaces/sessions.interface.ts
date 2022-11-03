// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthenticatedSocket } from '@api/utils/interfaces'

export interface ISessionsService {
  getUserSession(username: string): AuthenticatedSocket
  addUserSession(username: string, socket: AuthenticatedSocket): void
  removeUserSession(username: string): void
  getSessions(): Map<string, AuthenticatedSocket>
}
