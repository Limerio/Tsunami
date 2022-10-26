/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { Inject } from '@nestjs/common'

import { AuthenticatedSocket } from './utils/interfaces'
import { ISessionsService } from '@api/modules/sessions'
import { Services } from '@api/utils/constants'

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:4200'],
    credentials: true,
  },
  pingInterval: 10000,
  pingTimeout: 15000,
})
export class EventsGateway {
  constructor(
    @Inject(Services.Sessions)
    private readonly sessions: ISessionsService
  ) {}

  handleConnection(client: AuthenticatedSocket): void {
    this.sessions.addUserSession(client.user.username, client)
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this.sessions.removeUserSession(client.user.username)
  }

  @SubscribeMessage('test')
  handleSomething(@MessageBody() data) {
    console.log(data)
    return { event: 'test', data }
  }
}
