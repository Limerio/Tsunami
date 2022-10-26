/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Controller,
  Post,
  Delete,
  Get,
  Inject,
  Body,
  UseGuards,
  Request,
  Res,
  HttpStatus,
  ClassSerializerInterceptor,
  UseInterceptors,
  SerializeOptions,
} from '@nestjs/common'

import type { IUsersService, TUserWithPassword } from '@api/modules/users'
import { AuthenticatedRequest } from '@api/utils/interfaces'
import { AuthGuard, LocalAuthGuard } from '../guards'
import { Services } from '@api/utils/constants'
import { UserEntity } from '../entities'
import { CreateUserDto } from '../dtos'
import { User } from '../decorators'
import { Response } from 'express'

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  excludePrefixes: ['_'],
})
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Services.Users) private readonly userService: IUsersService
  ) {}

  @UseGuards(AuthGuard)
  @Get('user')
  async getUser(@User() user: TUserWithPassword): Promise<UserEntity> {
    return new UserEntity(user)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  postLogin(@Res() res: Response): void {
    res.sendStatus(HttpStatus.OK)
  }

  @Post('register')
  async postRegister(@Body() data: CreateUserDto) {
    const user = await this.userService.create(data)
    return new UserEntity(user)
  }

  @Delete('logout')
  deleteLogout(
    @Request() req: AuthenticatedRequest,
    @Res() res: Response
  ): void {
    req.logout(err => {
      return err
        ? res.sendStatus(HttpStatus.BAD_REQUEST)
        : res.sendStatus(HttpStatus.OK)
    })
  }
}
