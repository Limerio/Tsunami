import { ForbiddenException } from '@nestjs/common'
import { ApiForbiddenResponse as SwaggerApiForbiddenResponse } from '@nestjs/swagger'

export const ApiForbiddenResponse = () =>
  SwaggerApiForbiddenResponse({
    description: 'Account not auth',
    type: ForbiddenException,
  })
