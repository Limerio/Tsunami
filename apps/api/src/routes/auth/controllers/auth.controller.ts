/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Post,
  Delete,
  Get,
  Inject,
  Body,
  UseGuards,
  Request,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common'
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger'

import {
  ApiForbiddenResponse,
  AuthGuard,
  Controller,
  ExcludePrefixes,
} from '@api/decorators'
import type {
  IUsersService,
  TUserWithPassword,
  UpdateUserDto,
} from '@api/modules/users'
import { Controllers, Services } from '@api/utils/constants'
import { AuthenticatedRequest } from '@api/utils/interfaces'
import { LogoutFailedException } from '../exceptions'
import { CreateUserDto } from '@api/modules/users'
import { LocalAuthGuard } from '../guards'
import { UserEntity } from '../entities'
import { User } from '../decorators'
import { Response } from 'express'
import {
  UserErrorDeleteException,
  UserErrorUpdateException,
} from '@api/modules/users/exceptions'

@ExcludePrefixes()
@Controller(Controllers.Auth)
export class AuthController {
  constructor(
    @Inject(Services.Users) private readonly userService: IUsersService
  ) {}

  @ApiOkResponse({
    description: 'login data',
    type: UserEntity,
  })
  @ApiForbiddenResponse()
  @AuthGuard()
  @Get('user')
  async getUser(@User() user: TUserWithPassword): Promise<UserEntity> {
    return new UserEntity(user)
  }

  @ApiOkResponse({
    description: 'login data',
    type: UserEntity,
  })
  @ApiForbiddenResponse()
  @AuthGuard()
  @Put('user')
  async putUser(
    @User() user: TUserWithPassword,
    @Body() body: UpdateUserDto
  ): Promise<UserEntity> {
    try {
      const userUpdated = await this.userService.update(user.username, body)
      return new UserEntity(userUpdated.toJSON())
    } catch (err) {
      throw new UserErrorUpdateException()
    }
  }

  @ApiOkResponse({
    description: 'login data',
    type: UserEntity,
  })
  @ApiForbiddenResponse()
  @AuthGuard()
  @Delete('user')
  async deleteUser(
    @User() user: TUserWithPassword,
    @Res() res: Response
  ): Promise<void> {
    try {
      await this.userService.delete(user.username)
      res.sendStatus(HttpStatus.OK)
    } catch (err) {
      throw new UserErrorDeleteException()
    }
  }

  @ApiOkResponse({
    description: 'Account log in',
    type: UserEntity,
  })
  @ApiForbiddenResponse()
  @ApiBody({
    type: CreateUserDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  postLogin(@Res() res: Response): void {
    res.sendStatus(HttpStatus.OK)
  }

  @ApiOkResponse({
    description: 'Account Registered',
  })
  @Post('register')
  async postRegister(@Body() data: CreateUserDto) {
    const user = await this.userService.create(data)

    return new UserEntity(user.toJSON())
  }

  @ApiOkResponse({
    description: 'The account has been successfully disconnected.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error',
    type: 'string',
  })
  @Delete('logout')
  deleteLogout(
    @Request() req: AuthenticatedRequest,
    @Res() res: Response
  ): void {
    req.logout(err => {
      console.error(err)
      return err ? new LogoutFailedException() : res.sendStatus(HttpStatus.OK)
    })
  }
}
