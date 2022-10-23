import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AuthenticatedRequest } from '../interfaces'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>()
    await super.logIn(request)
    return result
  }
}
