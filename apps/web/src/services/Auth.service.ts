/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import type { AxiosResponse } from 'axios'

import type { TAuthDataUpdate, TAuthLoginData } from '@web/utils/types'
import { withCredentials } from '@tsunami-clone/constants'
import type { TUser } from '@tsunami-clone/types'
import { api } from '@web/utils/api'

export class AuthService {
  static async registerAccount(
    values: TAuthLoginData
  ): Promise<AxiosResponse<TUser>> {
    return await api.post('/auth/register', values.user, withCredentials)
  }

  static async loginAccount(
    values: TAuthLoginData
  ): Promise<AxiosResponse<TUser>> {
    return await api.post('/auth/login', values.user, withCredentials)
  }

  static async userAccount(): Promise<AxiosResponse<TUser>> {
    return await api.get('/auth/user', withCredentials)
  }

  static async logoutAccount(): Promise<AxiosResponse> {
    return await api.delete('/auth/logout', withCredentials)
  }

  static async updateUser(
    data: TAuthDataUpdate
  ): Promise<AxiosResponse<TUser>> {
    return await api.put('/auth/user', data, withCredentials)
  }

  static async deleteAccount(): Promise<AxiosResponse> {
    return await api.delete('/auth/user', withCredentials)
  }
}
