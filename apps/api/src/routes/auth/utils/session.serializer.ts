import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { TUser } from '@tsunami-clone/types'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: TUser, done: (err: Error, user: TUser) => void): void {
    done(null, user)
  }
  deserializeUser(
    payload: string,
    done: (err: Error, payload: string) => void
  ): void {
    done(null, payload)
  }
}
