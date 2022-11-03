import { ApiProperty } from '@nestjs/swagger'

export class PortScanEntity {
  @ApiProperty()
  port: string
}
