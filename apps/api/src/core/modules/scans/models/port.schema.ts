import { Schema } from 'mongoose'
import type { TPortScan } from '@tsunami-clone/types'

export const PortSchema = new Schema<TPortScan>({
  port: Number,
  open: Boolean,
  type: String,
})
