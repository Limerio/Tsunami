import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthenticatedRequest } from '../interfaces'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>()
    return request.isAuthenticated()
  }
}
