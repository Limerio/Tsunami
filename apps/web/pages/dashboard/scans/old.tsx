/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { DashboardLayout } from '@web/layouts'
import { Container, Grid, ScrollArea, Table } from '@mantine/core'
import { TitleDashboardMain } from '@web/utils/styles'
import { MouseEvent } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@web/contexts/user'

export default function DashboardOldScans() {
  const { user } = useUserContext()
  const router = useRouter()

  const handleViewScan = (id: string) => {
    return (e: MouseEvent<HTMLTableRowElement>) => {
      router.push(`/dashboard/scans/${id}`)
    }
  }

  return (
    <DashboardLayout title="Old Scans">
      <Container fluid my="lg" style={{ width: '100%' }}>
        <Grid>
          <Grid.Col>
            <TitleDashboardMain>Title</TitleDashboardMain>
          </Grid.Col>
          <Grid.Col>
            <ScrollArea>
              <Table
                striped
                highlightOnHover
                withBorder
                withColumnBorders
                sx={{ minWidth: 800 }}
                verticalSpacing="xs"
              >
                <thead>
                  <tr>
                    <th>Ip</th>
                    <th>Ports</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {user &&
                    user.scans.map((scan, i) => (
                      <tr
                        onClick={handleViewScan(scan.id)}
                        key={`${scan.ip}-${i}`}
                      >
                        <td>{scan.ip}</td>
                        <td>{scan.ports.map(({ port }) => port).join('-')}</td>
                        <td>
                          {Intl.DateTimeFormat('fr-FR').format(
                            new Date(scan.createdAt)
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </Container>
    </DashboardLayout>
  )
}
