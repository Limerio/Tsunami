/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useEffect, useState } from 'react'

import { useUserContext } from '@web/contexts/user'
import { AuthService } from '@web/services'

export function useAuth() {
  const { user, setUser } = useUserContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AuthService.userAccount()
      .then(({ data }) => {
        setUser(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        window.location.href = '/auth/login'
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, loading }
}
