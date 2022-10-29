/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { DashboardLayout } from '@web/layouts'
import { useAuth } from '@web/hooks'

export default function DashboardOldScans() {
  const { user } = useAuth()
  return <DashboardLayout title="Scan an ip"></DashboardLayout>
}
