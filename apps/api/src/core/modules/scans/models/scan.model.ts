import { ModelDefinition } from '@nestjs/mongoose'
import { TScan } from '@tsunami-clone/types'
import { Schema } from 'mongoose'
import { PortSchema } from './port.schema'

export const Scan: ModelDefinition = {
  name: 'scan',
  collection: 'scans',
  schema: new Schema<TScan>(
    {
      id: {
        type: String,
        required: true,
      },
      ip: {
        type: String,
        required: true,
      },
      user: { ref: 'user', type: Schema.Types.ObjectId },
      ports: [PortSchema],
    },
    { timestamps: true }
  ),
}
