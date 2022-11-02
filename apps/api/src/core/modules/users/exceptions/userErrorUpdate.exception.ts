import { InternalServerErrorException } from '@nestjs/common'

export class UserErrorUpdateException extends InternalServerErrorException {
  constructor() {
    super('Error when user update')
  }
}
