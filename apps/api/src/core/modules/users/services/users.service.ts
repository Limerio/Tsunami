import { InjectModel } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import type { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { CreateUserDto, UpdateUserDto } from '../dtos'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import type { EnvKeys } from '@api/utils/types'
import { IUsersService } from '../interfaces'
import { UserDocument } from '../utils/types'
import { User } from '../models'

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService<Record<EnvKeys, unknown>>
  ) {}

  async findOne(username: string): Promise<UserDocument> {
    const user = await this.userModel
      .where('username')
      .equals(username)
      .populate('scans')
      .limit(1)

    return user[0]
  }

  async create(data: CreateUserDto): Promise<UserDocument> {
    const hash = await bcrypt.hash(
      data.password,
      parseInt(this.configService.get('BCRYPT_SALT'))
    )
    const user = new this.userModel({ ...data, password: hash })

    return await user.save()
  }

  async update(username: string, data: UpdateUserDto): Promise<UserDocument> {
    const user = await this.findOne(username)

    if (user) {
      try {
        await user.updateOne(data)
        return await user.save()
      } catch (err) {
        throw new InternalServerErrorException()
      }
    }
  }

  async comparePassword(password: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(password, encrypted)
  }
}
