/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { TUserWithPassword } from '@api/modules/users'
import { ScanEntity } from '../entities'
import { CreateScanDto } from '../dtos'

export interface IScanService {
  find(): Promise<ScanEntity[]>
  create(body: CreateScanDto, user: TUserWithPassword): Promise<ScanEntity>
  findOne(scanId: string): Promise<ScanEntity>
  delete(scanId: string): Promise<boolean>
}
