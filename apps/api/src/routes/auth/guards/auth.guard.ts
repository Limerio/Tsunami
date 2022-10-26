// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthenticatedRequest } from '@api/utils/interfaces'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>()
    return request.isAuthenticated()
  }
}
