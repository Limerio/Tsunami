import { PipeTransform, Injectable } from '@nestjs/common'

@Injectable()
export class ScanByIdPipe implements PipeTransform {
  transform(value: string) {
    return value
  }
}
