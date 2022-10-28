import { TPortScan } from '@tsunami-clone/types'
import { UserEntity } from '../../auth/entities'

export class ScanEntity {
  ip: string
  user: UserEntity
  ports: TPortScan[]
  constructor(partial: Partial<ScanEntity>) {
    Object.assign(this, partial)
  }
}
