import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { UserEntity } from '../../auth/entities'
import { PortScanEntity } from './port-scan.entity'

export class ScanEntity {
  @Exclude()
  _id: unknown
  @ApiProperty()
  id: string

  @ApiProperty()
  ip: string

  @ApiProperty()
  user: UserEntity

  @ApiProperty({
    type: [PortScanEntity],
  })
  ports: PortScanEntity[]

  constructor(partial: Partial<ScanEntity>) {
    Object.assign(this, partial)
  }
}
