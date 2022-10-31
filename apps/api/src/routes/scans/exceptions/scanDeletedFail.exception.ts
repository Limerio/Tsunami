import { InternalServerErrorException } from '@nestjs/common'

export class ScanDeletedFailException extends InternalServerErrorException {
  constructor() {
    super('Error scan when is deleting')
  }
}
