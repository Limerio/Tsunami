/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { TitleDashboardMain } from '@web/utils/styles'
import { DashboardLayout } from '@web/layouts'
import { useRouter } from 'next/router'
import { Container, Paper, ScrollArea, Table, Text } from '@mantine/core'
import { useStyles } from '@web/pages/dashboard/Scans/View'
import { useUserContext } from '@web/contexts/user'

export default function ScanView() {
  const { user } = useUserContext()
  const router = useRouter()
  const { classes } = useStyles()

  const scan = user && user.scans.find(scan => scan.id === router.query.scanId)

  return (
    <DashboardLayout title="View Scan">
      <TitleDashboardMain>Scan of {scan && scan.ip}</TitleDashboardMain>
      <Container>
        <Paper withBorder radius="md" className={classes.card}>
          <Text size="xl" weight={500} mt="md">
            Created at{' '}
            {scan && Intl.DateTimeFormat().format(new Date(scan.createdAt))}
          </Text>

          <ScrollArea>
            <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
              <thead>
                <tr>
                  <th>Port</th>
                  <th>Open ?</th>
                </tr>
              </thead>
              <tbody>
                {scan &&
                  scan.ports.map(({ port, open }) => (
                    <tr key={port}>
                      <td>{port}</td>
                      <td>{open}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Container>
    </DashboardLayout>
  )
}
