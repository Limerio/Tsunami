/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Body,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger'
import { Response } from 'express'

import { ScanDeletedFailException, ScanNotFoundException } from '../exceptions'
import { Controllers, Params, Services } from '@api/utils/constants'
import { TUserWithPassword } from '@api/modules/users'
import {
  ApiForbiddenResponse,
  AuthGuard,
  Controller,
  ExcludePrefixes,
} from '@api/decorators'
import { IScanService } from '../interfaces'
import { ScanEntity } from '../entities'
import { ScanByIdPipe } from '../pipes'
import { CreateScanDto } from '../dtos'
import { User } from '../../auth'

@ExcludePrefixes('scans')
@Controller(Controllers.Scans)
@AuthGuard()
@ApiForbiddenResponse()
export class ScanController {
  constructor(
    @Inject(Services.Scans) private readonly scanService: IScanService
  ) {}

  @ApiOkResponse({
    description: 'Find Scan',
    type: ScanEntity,
  })
  @ApiNotFoundResponse({
    description: 'Scan not found',
    type: ScanNotFoundException,
  })
  @ApiParam({
    name: Params.ScanId,
    type: 'string',
    example: 'b6bf947e-71ab-4147-914e-5a17cee52387',
  })
  @Get(`:${Params.ScanId}`)
  getScan(@Param(Params.ScanId, ScanByIdPipe) scan: ScanEntity): ScanEntity {
    return scan
  }

  @ApiOkResponse({
    description: 'Create new Scan',
    type: ScanEntity,
  })
  @Post()
  async postScan(
    @Body() body: CreateScanDto,
    @User() user: TUserWithPassword
  ): Promise<ScanEntity> {
    return await this.scanService.create(body, user)
  }

  @ApiOkResponse({
    description: 'Scan is deleted',
  })
  @ApiNotFoundResponse({
    description: 'Scan not found',
    type: ScanNotFoundException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error scan when is deleting',
    type: ScanDeletedFailException,
  })
  @ApiParam({
    name: Params.ScanId,
    type: 'string',
    example: 'b6bf947e-71ab-4147-914e-5a17cee52387',
  })
  @Delete(`:${Params.ScanId}`)
  async deleteScan(
    @Param(Params.ScanId, ScanByIdPipe) scan: ScanEntity,
    @Res() res: Response
  ): Promise<void> {
    const scanDeleted = await this.scanService.delete(scan.id)

    if (scanDeleted) {
      res.sendStatus(HttpStatus.OK)
    } else {
      throw new ScanDeletedFailException()
    }
  }
}
