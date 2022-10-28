import { ModelDefinition } from '@nestjs/mongoose'
import { Schema } from 'mongoose'

export const User: ModelDefinition = {
  name: 'user',
  collection: 'users',
  schema: new Schema(
    {
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true, unique: true },
      scans: [{ ref: 'scan', type: Schema.Types.ObjectId }],
    },
    { timestamps: true }
  ),
}
