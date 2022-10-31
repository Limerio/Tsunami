import { UseGuards } from '@nestjs/common'
import { AuthGuard as AuthGuardLocal } from '@api/guards'

export const AuthGuard = () => UseGuards(AuthGuardLocal)
