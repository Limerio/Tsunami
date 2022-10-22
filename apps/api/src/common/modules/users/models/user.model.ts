import { ModelDefinition } from '@nestjs/mongoose'

export const User: ModelDefinition = {
  name: 'user',
  collection: 'users',
  schema: {},
}
