/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { DashboardLayout } from '@web/layouts'
import { Button, Container, Grid, ScrollArea, Table, Text } from '@mantine/core'
import { TitleDashboardMain } from '@web/utils/styles'
import { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@web/contexts/user'
import { useStyles } from '@web/pages/dashboard/Scans/Old'

export default function DashboardOldScans() {
  const { user } = useUserContext()
  const router = useRouter()
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)

  const handleViewScan = (id: string) => {
    return (e: MouseEvent<HTMLTableRowElement | HTMLButtonElement>) => {
      router.push(`/dashboard/scans/${id}`)
    }
  }

  return (
    <DashboardLayout title="Old Scans">
      <Container fluid my="lg" style={{ width: '100%' }}>
        <Grid>
          <Grid.Col>
            <TitleDashboardMain>Old Scans</TitleDashboardMain>
          </Grid.Col>
          <Grid.Col>
            {user && user.scans.length !== 0 ? (
              <ScrollArea
                sx={{ height: 300 }}
                onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
              >
                <Table
                  striped
                  highlightOnHover
                  withBorder
                  withColumnBorders
                  sx={{ minWidth: 800 }}
                  verticalSpacing="xs"
                >
                  <thead
                    className={cx(classes.header, {
                      [classes.scrolled]: scrolled,
                    })}
                  >
                    <tr>
                      <th>Ip</th>
                      <th>Ports</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.scans.map((scan, i) => (
                      <tr
                        onClick={handleViewScan(scan.id)}
                        key={`${scan.ip}-${i}`}
                      >
                        <td>{scan.ip}</td>
                        <td>
                          <Button onClick={handleViewScan(scan.id)}>
                            View all
                          </Button>
                        </td>
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
            ) : (
              <Text>No scans</Text>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </DashboardLayout>
  )
}
