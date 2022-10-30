/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Res,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { Response } from 'express'

import { Controllers, Params, Services } from '@api/utils/constants'
import { IScanService } from '../interfaces'
import { ScanEntity } from '../entities'
import { ScanByIdPipe } from '../pipes'
import { CreateScanDto } from '../dtos'
import { AuthGuard } from '@api/guards'
import { User } from '../../auth'
import { TUserWithPassword } from '@api/modules/users'
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  excludePrefixes: ['_'],
})
@ApiTags(Controllers.Scans)
@Controller(Controllers.Scans)
@UseGuards(AuthGuard)
@ApiForbiddenResponse({
  description: 'Account not auth',
  type: ForbiddenException,
})
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
    type: NotFoundException,
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
    type: NotFoundException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error scan when is deleting',
    type: InternalServerErrorException,
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
      throw new InternalServerErrorException()
    }
  }
}
