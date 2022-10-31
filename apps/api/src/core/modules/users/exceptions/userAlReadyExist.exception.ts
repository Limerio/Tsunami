import { BadRequestException } from '@nestjs/common'

export class UserAlReadyExistException extends BadRequestException {
  constructor() {
    super('User already exist')
  }
}
