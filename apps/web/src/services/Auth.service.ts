import { withCredentials } from '@tsunami-clone/constants'
import type { TUser } from '@tsunami-clone/types'
import { api } from '@web/utils/api'
import type { TAuthLoginData } from '@web/utils/types'
import type { AxiosResponse } from 'axios'

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
}
