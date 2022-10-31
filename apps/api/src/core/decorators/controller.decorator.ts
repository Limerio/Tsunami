import { applyDecorators, Controller as NestjsController } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

export const Controller = (controller: string) =>
  applyDecorators(ApiTags(controller), NestjsController(controller))
