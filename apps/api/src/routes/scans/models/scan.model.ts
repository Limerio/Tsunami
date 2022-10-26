import { ModelDefinition } from '@nestjs/mongoose'
import { Schema } from 'mongoose'

export const Scan: ModelDefinition = {
  name: 'scan',
  collection: 'scans',
  schema: new Schema({}, { timestamps: true }),
}
