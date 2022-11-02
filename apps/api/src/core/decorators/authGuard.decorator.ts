import { UseGuards } from '@nestjs/common'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthGuard as AuthGuardLocal } from '@api/guards'

export const AuthGuard = () => UseGuards(AuthGuardLocal)
