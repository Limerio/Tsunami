/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { Loading } from '@web/components/Auth'
import { useAuth } from '@web/hooks'

export const AuthGuard: FC = () => {
  const location = useLocation()
  const { loading, user } = useAuth()

  if (loading) return <Loading />

  if (user) return <Outlet />

  return <Navigate to="/auth/login" state={{ from: location }} replace />
}
