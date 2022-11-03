import type { Document, ObjectId } from 'mongoose'

import type { TScan } from '@tsunami-clone/types'

export type ScanDocument = TScan & Document<ObjectId, unknown, TScan>
