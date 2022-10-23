import { InjectModel } from '@nestjs/mongoose'
import type { Document, Model } from 'mongoose'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import type { TUser } from '@tsunami-clone/types'

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EnvKeys } from '@api/utils/interfaces'
import { IUsersService } from '../interfaces'
import { UpdateUserDto } from '../dtos'
import { User } from '../models'

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<TUser & Document>,
    private readonly configService: ConfigService<Record<EnvKeys, unknown>>
  ) {}

  async findOne(username: string): Promise<TUser & Document> {
    return await this.userModel.findOne({ username })
  }

  async create(data: TUser): Promise<Document & TUser> {
    const hash = await bcrypt.hash(
      data.password,
      parseInt(this.configService.get('BCRYPT_SALT'))
    )
    const user = new this.userModel({ ...data, password: hash })

    return await user.save()
  }

  async update(
    username: string,
    data: UpdateUserDto
  ): Promise<Document & TUser> {
    throw new Error('Method not implemented')
  }

  async comparePassword(password: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(password, encrypted)
  }
}
