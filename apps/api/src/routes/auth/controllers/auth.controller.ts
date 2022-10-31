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
  ForbiddenException,
} from '@nestjs/common'
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

import type { IUsersService, TUserWithPassword } from '@api/modules/users'
import { Controllers, Services } from '@api/utils/constants'
import { AuthenticatedRequest } from '@api/utils/interfaces'
import { LogoutFailedException } from '../exceptions'
import { CreateUserDto } from '@api/modules/users'
import { LocalAuthGuard } from '../guards'
import { UserEntity } from '../entities'
import { AuthGuard } from '@api/guards'
import { User } from '../decorators'
import { Response } from 'express'

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  excludePrefixes: ['_'],
})
@ApiTags(Controllers.Auth)
@Controller(Controllers.Auth)
export class AuthController {
  constructor(
    @Inject(Services.Users) private readonly userService: IUsersService
  ) {}

  @ApiOkResponse({
    description: 'login data',
    type: UserEntity,
  })
  @ApiForbiddenResponse({
    description: 'Account not auth',
    type: ForbiddenException,
  })
  @UseGuards(AuthGuard)
  @Get('user')
  async getUser(@User() user: TUserWithPassword): Promise<UserEntity> {
    return new UserEntity(user)
  }

  @ApiOkResponse({
    description: 'Account log in',
    type: UserEntity,
  })
  @ApiForbiddenResponse({
    description: 'Account not auth',
    type: ForbiddenException,
  })
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
