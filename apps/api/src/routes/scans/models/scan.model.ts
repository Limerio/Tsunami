import { ModelDefinition } from '@nestjs/mongoose'
import { Schema } from 'mongoose'
import { PortSchema } from './port.schema'

export const Scan: ModelDefinition = {
  name: 'scan',
  collection: 'scans',
  schema: new Schema(
    {
      ip: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['IPv6', 'IPv4'],
      },
      user: { ref: 'user', type: Schema.Types.ObjectId },
      ports: [PortSchema],
    },
    { timestamps: true }
  ),
}
