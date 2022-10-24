import { checkAuth } from '@web/hooks'

export async function getServerSideProps() {
  const data = await checkAuth()
  return data
}

export default function User() {
  return
}
