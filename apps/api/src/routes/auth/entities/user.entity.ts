import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { ScanEntity } from '../../scans/entities'

export class UserEntity {
  @ApiProperty()
  username: string

  @ApiProperty()
  updateAt: Date

  @ApiProperty()
  createdAt: Date

  @ApiProperty({
    type: [ScanEntity],
  })
  scans: unknown[]

  @Exclude()
  password: string

  @Exclude()
  __v: number

  @Exclude()
  _id: unknown

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}
