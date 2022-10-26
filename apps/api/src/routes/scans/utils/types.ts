import type { Document } from 'mongoose'

import type { TScan } from '@tsunami-clone/types'

export type ScanDocument = TScan & Document<unknown, unknown, TScan>
