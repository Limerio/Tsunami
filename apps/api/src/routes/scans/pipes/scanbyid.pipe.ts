/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Services } from '@api/utils/constants'
import { PipeTransform, Injectable, Inject } from '@nestjs/common'
import { IScanService } from '@api/modules/scans'

@Injectable()
export class ScanByIdPipe implements PipeTransform {
  constructor(
    @Inject(Services.Scans) private readonly scanService: IScanService
  ) {}

  async transform(value: string) {
    return await this.scanService.findOne(value)
  }
}
