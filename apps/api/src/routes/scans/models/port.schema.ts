import { Schema } from 'mongoose'

export const PortSchema = new Schema({
  port: Number,
  open: Boolean,
})
