/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import type { AxiosResponse } from 'axios'

import { withCredentials } from '@tsunami-clone/constants'
import type { TScan } from '@tsunami-clone/types'
import { TScanCreateData } from '@web/utils/types'
import { api } from '@web/utils/api'

export class ScanService {
  static async create(data: TScanCreateData): Promise<AxiosResponse<TScan>> {
    return await api.post('/scans', data, withCredentials)
  }
}
