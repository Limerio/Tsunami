/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { Inject } from '@nestjs/common'

import { AuthenticatedSocket } from '@api/utils/interfaces'
import { ISessionsService } from '@api/modules/sessions'
import { EventsWs } from '@tsunami-clone/constants'
import { IScanService } from '@api/modules/scans'
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
    private readonly sessions: ISessionsService,
    @Inject(Services.Scans) private readonly scansService: IScanService
  ) {}

  handleConnection(client: AuthenticatedSocket): void {
    this.sessions.addUserSession(client.user.username, client)
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this.sessions.removeUserSession(client.user.username)
  }

  @SubscribeMessage(EventsWs.ScanInProgress)
  scanInProgress(@MessageBody() data) {
    this.sessions
      .getUserSession(data.username)
      .emit(EventsWs.ScanInProgress, { scan: data.scan })
  }

  @SubscribeMessage(EventsWs.ScanFinish)
  scanFinish(@MessageBody() data) {
    const userSession = this.sessions.getUserSession(data.username)
    this.scansService.create(data.scan, userSession.user)
    userSession?.emit(EventsWs.ScanFinish, { scan: data.scan })
  }
}
