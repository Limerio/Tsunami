import { TPortScan } from '@tsunami-clone/types'
import { IsString } from 'class-validator'

export class CreateScanDto {
  @IsString()
  ip: string

  ports: TPortScan[]
}
