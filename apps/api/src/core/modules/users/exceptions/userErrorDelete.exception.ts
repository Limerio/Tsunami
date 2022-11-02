import { InternalServerErrorException } from '@nestjs/common'

export class UserErrorDeleteException extends InternalServerErrorException {
  constructor() {
    super('Error when user deleted')
  }
}
