import { NotFoundException } from '@nestjs/common'

export class ScanNotFoundException extends NotFoundException {
  constructor() {
    super('Scan not found')
  }
}
