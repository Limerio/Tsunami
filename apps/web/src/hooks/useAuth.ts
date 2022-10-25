import { AuthService } from '@web/services'
import { useUserContext } from '@web/stores/user'
import { useEffect } from 'react'

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
