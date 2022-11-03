/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { InjectModel } from '@nestjs/mongoose'
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotImplementedException,
} from '@nestjs/common'
import { Model } from 'mongoose'

import { ScanNotFoundException } from '../exceptions'
import { ScanDocument } from '../utils/types'
import { IScanService } from '../interfaces'
import { ScanEntity } from '../entities'
import { CreateScanDto } from '../dtos'
import { Scan } from '../models'
import { Services } from '@api/utils/constants'
import { IUsersService, TUserWithPassword } from '@api/modules/users'

@Injectable()
export class ScanService implements IScanService {
  constructor(
    @InjectModel(Scan.name) private readonly scanModel: Model<ScanDocument>,
    @Inject(Services.Users) private readonly userService: IUsersService
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

    if (!scan[0]) throw new ScanNotFoundException()

    return new ScanEntity(scan[0].toJSON())
  }

  async delete(scanId: string): Promise<boolean> {
    try {
      const scan = await this.scanModel.deleteOne({ id: scanId })
      if (scan.deletedCount === 1) {
        return true
      } else {
        throw new NotImplementedException()
      }
    } catch (err) {
      console.error(err)
      throw new InternalServerErrorException()
    }
  }
}
