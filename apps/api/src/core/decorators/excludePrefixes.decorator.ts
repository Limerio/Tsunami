import {
  applyDecorators,
  ClassSerializerInterceptor,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common'

export const ExcludePrefixes = () =>
  applyDecorators(
    UseInterceptors(ClassSerializerInterceptor),
    SerializeOptions({
      excludePrefixes: ['_', 'password'],
    })
  )
