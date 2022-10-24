import { checkAuth } from '@web/hooks'
import { InferGetServerSidePropsType } from 'next'

export async function getServerSideProps() {
  const data = await checkAuth()
  return data
}

export default function Dashboard({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <>{user.username}</>
}
