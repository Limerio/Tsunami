// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthenticatedSocket } from '@api/utils/interfaces'
import { Injectable } from '@nestjs/common'
import { ISessionsService } from '../interfaces'

@Injectable()
export class SessionsService implements ISessionsService {
  private readonly sessions: Map<string, AuthenticatedSocket> = new Map()

  getUserSession(id: string): AuthenticatedSocket {
    return this.sessions.get(id)
  }

  addUserSession(userId: string, socket: AuthenticatedSocket): void {
    this.sessions.set(userId, socket)
  }

  removeUserSession(userId: string): void {
    this.sessions.delete(userId)
  }

  getSessions(): Map<string, AuthenticatedSocket> {
    return this.sessions
  }
}
