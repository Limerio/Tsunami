import { ScanEntity } from '../entities'
import { CreateScanDto } from '../dtos'

export interface IScanService {
  find(): Promise<ScanEntity[]>
  create(body: CreateScanDto): Promise<ScanEntity>
  findOne(scanId: string): Promise<ScanEntity>
  delete(scanId: string): Promise<boolean>
}
