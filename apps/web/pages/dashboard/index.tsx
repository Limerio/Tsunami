import { useAuth } from '@web/hooks'
import { DashboardLayout } from '@web/layouts'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <DashboardLayout title="Home">
      <h1>{user?.username}</h1>
    </DashboardLayout>
  )
}
