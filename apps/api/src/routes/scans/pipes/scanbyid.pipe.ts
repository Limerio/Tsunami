/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Services } from '@api/utils/constants'
import {
  PipeTransform,
  Injectable,
  Inject,
  NotFoundException,
} from '@nestjs/common'
import { IScanService } from '../interfaces'

@Injectable()
export class ScanByIdPipe implements PipeTransform {
  constructor(
    @Inject(Services.Scans) private readonly scanService: IScanService
  ) {}

  async transform(value: string) {
    const scan = await this.scanService.findOne(value)
    if (!scan) throw new NotFoundException()

    return scan
  }
}
