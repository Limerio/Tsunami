import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { PortScanEntity } from '../entities'

export class CreateScanDto {
  @ApiProperty()
  @IsString()
  ip: string

  @ApiProperty({
    type: [PortScanEntity],
  })
  ports: PortScanEntity[]
}
