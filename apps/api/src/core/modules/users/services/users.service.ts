import { InjectModel } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import type { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { CreateUserDto, UpdateUserDto } from '../dtos'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import type { EnvKeys } from '@api/utils/types'
import { IUsersService } from '../interfaces'
import { UserDocument } from '../utils/types'
import { User } from '../models'
import {
  UserAlReadyExistException,
  UserErrorUpdateException,
} from '../exceptions'

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService<Record<EnvKeys, unknown>>
  ) {}

  async delete(username: string): Promise<boolean> {
    try {
      const userDeleted = await this.userModel.deleteOne({ username })
      if (userDeleted.deletedCount === 1) {
        return true
      }
    } catch (err) {
      throw new UserErrorUpdateException()
    }
  }

  async findOne(username: string): Promise<UserDocument> {
    const user = await this.userModel
      .where('username')
      .equals(username)
      .populate('scans')
      .limit(1)

    return user[0]
  }

  async create(data: CreateUserDto): Promise<UserDocument> {
    const user = await this.findOne(data.username)
    if (!user) {
      const hash = await bcrypt.hash(
        data.password,
        parseInt(this.configService.get('BCRYPT_SALT'))
      )
      const userCreated = new this.userModel({ ...data, password: hash })

      return await userCreated.save()
    }
    throw new UserAlReadyExistException()
  }

  async update(username: string, data: UpdateUserDto): Promise<UserDocument> {
    const user = await this.findOne(username)

    if (user) {
      try {
        await user.updateOne(data)
        return await user.save()
      } catch (err) {
        throw new UserErrorUpdateException()
      }
    }
  }

  async comparePassword(password: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(password, encrypted)
  }
}
