/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useAuth } from '@web/hooks'
import { DashboardLayout } from '@web/layouts'

export default function DashboardSettings() {
  const { user } = useAuth()
  return <DashboardLayout title="Settings">Insane</DashboardLayout>
}
