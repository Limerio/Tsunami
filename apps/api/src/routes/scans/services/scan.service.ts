import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

import { ScanDocument } from '../utils/types'
import { IScanService } from '../interfaces'
import { ScanEntity } from '../entities'
import { CreateScanDto } from '../dtos'
import { Scan } from '../models'

@Injectable()
export class ScanService implements IScanService {
  constructor(
    @InjectModel(Scan.name) private readonly scanModel: Model<ScanDocument>
  ) {}

  find(): Promise<ScanEntity[]> {
    throw new Error('Method not implemented.')
  }
  create(body: CreateScanDto): Promise<ScanEntity> {
    throw new Error('Method not implemented.')
  }
  findOne(scanId: string): Promise<ScanEntity> {
    throw new Error('Method not implemented.')
  }
  delete(scanId: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
