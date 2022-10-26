/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useEffect } from 'react'

import { useUserContext } from '@web/contexts/user'
import { AuthService } from '@web/services'

export function useAuth() {
  const { user, setUser } = useUserContext()

  useEffect(() => {
    AuthService.userAccount()
      .then(({ data }) => {
        setUser(data)
      })
      .catch(err => {
        console.log(err)
        window.location.href = '/auth/login'
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user }
}
