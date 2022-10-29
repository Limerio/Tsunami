/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { TitleDashboardMain } from '@web/utils/styles'
import { DashboardLayout } from '@web/layouts'
import { useAuth } from '@web/hooks'
import {
  LastReportsDashboard,
  PluginsDashboard,
} from '@web/pages/dashboard/Index'
import { Container, Grid } from '@mantine/core'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <DashboardLayout title="Home">
      <Container fluid my="lg" style={{ width: '100%' }}>
        <Grid>
          <Grid.Col>
            <TitleDashboardMain>
              Welcome back, {user?.username}
            </TitleDashboardMain>
          </Grid.Col>
          <Grid.Col xs={2}>
            <LastReportsDashboard />
          </Grid.Col>
          <Grid.Col xs={3} offset={2}>
            <PluginsDashboard />
          </Grid.Col>
        </Grid>
      </Container>
    </DashboardLayout>
  )
}
