import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EnvKeys } from '@api/utils/interfaces'
import { IUsersService } from '../interfaces'
import { UpdateUserDto } from '../dtos'
import { User } from '../models'
import { UserDocument } from '../utils/types'
import { CreateUserDto } from 'apps/api/src/routes/auth/dtos'

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService<Record<EnvKeys, unknown>>
  ) {}

  async findOne(username: string): Promise<UserDocument> {
    return await this.userModel.findOne({ username })
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
    throw new Error('Method not implemented')
  }

  async comparePassword(password: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(password, encrypted)
  }
}
