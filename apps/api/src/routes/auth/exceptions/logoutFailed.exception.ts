import { InternalServerErrorException } from '@nestjs/common'

export class LogoutFailedException extends InternalServerErrorException {
  constructor() {
    super('Logout failed')
  }
}
