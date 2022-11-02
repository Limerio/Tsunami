import {
  applyDecorators,
  ClassSerializerInterceptor,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common'

export const ExcludePrefixes = (...prefixes: string[]) =>
  applyDecorators(
    UseInterceptors(ClassSerializerInterceptor),
    SerializeOptions({
      excludePrefixes: ['_', 'password', ...prefixes],
    })
  )
