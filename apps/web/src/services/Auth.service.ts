import type { TAuthData } from '@web/utils/types'
import fetch from 'node-fetch'

export class AuthService {
  static async registerAccount(values: TAuthData) {
    const res = await fetch('http://localhost:4200/auth/register', {
      method: 'POST',
      body: JSON.stringify(values.user),
    })
    return { data: await res.json(), status: res.status }
  }

  static async loginAccount(values: TAuthData) {
    const res = await fetch('http://localhost:4200/auth/login', {
      method: 'POST',
      body: JSON.stringify(values.user),
    })
    return { data: await res.json(), status: res.status }
  }

  static async user() {
    const res = await fetch('http://localhost:4200/auth/user')
    return { data: await res.json(), status: res.status }
  }
}
