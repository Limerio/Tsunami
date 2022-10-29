/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
  Res,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { Response } from 'express'

import { Params, Services } from '@api/utils/constants'
import { IScanService } from '../interfaces'
import { ScanEntity } from '../entities'
import { ScanByIdPipe } from '../pipes'
import { CreateScanDto } from '../dtos'
import { AuthGuard } from '@api/guards'
import { User } from '../../auth'
import { TUserWithPassword } from '@api/modules/users'

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  excludePrefixes: ['_'],
})
@Controller('scans')
@UseGuards(AuthGuard)
export class ScanController {
  constructor(
    @Inject(Services.Scans) private readonly scanService: IScanService
  ) {}

  @Get(`:${Params.ScanId}`)
  getScan(@Param(Params.ScanId, ScanByIdPipe) scan: ScanEntity): ScanEntity {
    return scan
  }

  @Post()
  async postScan(
    @Body() body: CreateScanDto,
    @User() user: TUserWithPassword
  ): Promise<ScanEntity> {
    return await this.scanService.create(body, user)
  }

  @Delete(`:${Params.ScanId}`)
  async deleteScan(
    @Param(Params.ScanId) scanId: string,
    @Res() res: Response
  ): Promise<void> {
    try {
      await this.scanService.delete(scanId)
      res.sendStatus(HttpStatus.OK)
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
