// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthenticatedRequest } from '@api/utils/interfaces'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>()
    await super.logIn(request)
    return result
  }
}
