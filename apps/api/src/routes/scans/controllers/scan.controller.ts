import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'

import { Params, Services } from '@api/utils/constants'
import { IScanService } from '../interfaces'
import { ScanEntity } from '../entities'
import { ScanByIdPipe } from '../pipes'
import { CreateScanDto } from '../dtos'
import { AuthGuard } from '@api/guards'

@Controller('scans')
@UseGuards(AuthGuard)
export class ScanController {
  constructor(
    @Inject(Services.Scans) private readonly scanService: IScanService
  ) {}

  @Get()
  async getScans() {
    return await this.scanService.find()
  }

  @Get(`:${Params.ScanId}`)
  getScan(@Param(Params.ScanId, ScanByIdPipe) scan: ScanEntity): ScanEntity {
    return scan
  }

  @Post()
  async postScan(@Body() body: CreateScanDto): Promise<ScanEntity> {
    return await this.scanService.create(body)
  }

  @Delete(`:${Params.ScanId}`)
  async deleteScan(
    @Param(Params.ScanId) scanId: string,
    @Res() res: Response
  ): Promise<void> {
    await this.scanService.delete(scanId)
    res.sendStatus(HttpStatus.OK)
  }
}
