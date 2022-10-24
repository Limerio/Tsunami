import { AuthService } from '@web/services'

export async function checkAuth() {
  const { status, data } = await AuthService.user()
  switch (status) {
    case 403:
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      }

    case 200:
      return {
        props: { user: data },
      }
  }
}
