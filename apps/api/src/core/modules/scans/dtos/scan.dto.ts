import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { PortScanEntity } from '../entities'

export class CreateScanDto {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  ip: string

  username: string

  @ApiProperty({
    type: [PortScanEntity],
  })
  ports: PortScanEntity[]
}
