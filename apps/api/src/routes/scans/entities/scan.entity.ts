import { TPortScan } from '@tsunami-clone/types'
import { Exclude } from 'class-transformer'
import { UserEntity } from '../../auth/entities'

export class ScanEntity {
  @Exclude()
  _id: unknown
  id: string
  ip: string
  user: UserEntity
  ports: TPortScan[]
  constructor(partial: Partial<ScanEntity>) {
    Object.assign(this, partial)
  }
}
