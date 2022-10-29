/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { InjectModel } from '@nestjs/mongoose'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Model } from 'mongoose'
import { v4 } from 'uuid'

import { IUsersService, TUserWithPassword } from '@api/modules/users'
import { Services } from '@api/utils/constants'
import { ScanDocument } from '../utils/types'
import { IScanService } from '../interfaces'
import { ScanEntity } from '../entities'
import { CreateScanDto } from '../dtos'
import { Scan } from '../models'

@Injectable()
export class ScanService implements IScanService {
  constructor(
    @InjectModel(Scan.name) private readonly scanModel: Model<ScanDocument>,
    @Inject(Services.Users) private readonly userService: IUsersService,
    @Inject(Services.RabbitMq) private readonly rabbitMqService: ClientProxy
  ) {}

  async find(): Promise<ScanEntity[]> {
    return await this.scanModel.find().populate('user')
  }

  async create(
    body: CreateScanDto,
    user: TUserWithPassword
  ): Promise<ScanEntity> {
    const userData = await this.userService.findOne(user.username)
    const scan = new this.scanModel({
      id: v4(),
      user: userData._id,
      ...body,
    })
    const scanCreated = await scan.save()
    userData.scans.push(scanCreated._id)
    await userData.save()
    return new ScanEntity(scanCreated.toJSON())
  }

  async findOne(scanId: string): Promise<ScanEntity> {
    const scan = await this.scanModel
      .where('id')
      .equals(scanId)
      .limit(1)
      .populate('user')

    return new ScanEntity(scan[0].toJSON())
  }

  delete(scanId: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
