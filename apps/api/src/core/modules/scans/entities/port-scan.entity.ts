import { ApiProperty } from '@nestjs/swagger'
import { TSystems } from '@tsunami-clone/types'

export class PortScanEntity {
  @ApiProperty()
  port: string

  @ApiProperty()
  open: boolean

  @ApiProperty()
  type: TSystems
}
