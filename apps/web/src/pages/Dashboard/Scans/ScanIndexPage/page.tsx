/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Container, Grid } from '@mantine/core'
import { useUserContext } from '@web/contexts/user'
import { DashboardLayout } from '@web/layouts'
import { TitleDashboardMain } from '@web/utils/styles'
import { LastReportsDashboard } from './LastReportsDashboard'
import { PluginsDashboard } from './PluginsDashboard'

export function DashboardScansIndexPage() {
  const { user } = useUserContext()
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
