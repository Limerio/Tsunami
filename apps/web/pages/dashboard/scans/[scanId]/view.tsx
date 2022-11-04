/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Button,
  Container,
  Paper,
  ScrollArea,
  Select,
  Table,
  Text,
  TextInput,
} from '@mantine/core'
import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'

import { useStyles } from '@web/pages/dashboard/Scans/View'
import { TitleDashboardMain } from '@web/utils/styles'
import { useUserContext } from '@web/contexts/user'
import { DashboardLayout } from '@web/layouts'
import { IconSearch } from '@tabler/icons'
import { TScan } from '@tsunami-clone/types'

export default function ScanView() {
  const { user } = useUserContext()
  const router = useRouter()
  console.log(router.query.scanId)
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)
  const [search, setSearch] = useState('')
  const scanDefault =
    user && user.scans.find(scan => scan.id === router.query.scanId)
  const [scan, setScan] = useState<TScan>({
    ...scanDefault,
    ports: scanDefault?.ports.filter(port => port.open),
  })
  const [selectFilter, setSelectFilter] = useState('Close')
  const selectors = ['Open', 'Close', 'Reset']

  const redirect = () => router.push('/dashboard')
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    if (value === '') {
      setScan(scanDefault)
    } else {
      setScan(scanPrev => ({
        ...scanPrev,
        ports: scanDefault.ports.filter(({ port }) => port === search),
      }))
    }
  }
  const filterOpenCloseReset = (event: string) => {
    setSelectFilter(event)
    setSearch('')
    switch (selectFilter) {
      case 'Close':
        setScan(scanPrev => ({
          ...scanPrev,
          ports: scanDefault.ports.filter(port => port.open),
        }))
        break

      case 'Open':
        setScan(scanPrev => ({
          ...scanPrev,
          ports: scanDefault.ports.filter(port => !port.open),
        }))
        break

      case 'Reset':
        setScan(scanDefault)
        break
    }
  }

  return (
    <DashboardLayout title="View Scan">
      <Container fluid my="lg" style={{ width: '100%' }}>
        <TitleDashboardMain>
          {scan ? `Scan of ${scan.ip}` : 'Unknown scan'}
        </TitleDashboardMain>
        {scan ? (
          <Container my="md">
            <Paper withBorder radius="md" className={classes.card}>
              <Text size="xl" weight={500} mt="md">
                Created at{' '}
                {user &&
                  scan &&
                  Intl.DateTimeFormat().format(new Date(scan.createdAt))}
              </Text>

              <TextInput
                placeholder="Search by any field"
                mb="md"
                size="sm"
                radius="xl"
                icon={<IconSearch size={14} stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
              />

              <ScrollArea
                sx={{ height: 800 }}
                onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
              >
                <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                  <thead
                    className={cx(classes.header, {
                      [classes.scrolled]: scrolled,
                    })}
                  >
                    <tr>
                      <th>Port</th>
                      <th>
                        <Select
                          radius="xl"
                          allowDeselect
                          value={selectFilter}
                          onChange={filterOpenCloseReset}
                          placeholder="By Default is Reset"
                          data={selectors}
                        />
                      </th>
                      <th>System</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user &&
                      scan?.ports?.map(({ port, open, type }) => (
                        <tr key={port}>
                          <td>{port}</td>
                          <td>{open ? 'Close' : 'Open'}</td>
                          <td>{type}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </ScrollArea>
            </Paper>
          </Container>
        ) : (
          <Button onClick={redirect}>Go to Home</Button>
        )}
      </Container>
    </DashboardLayout>
  )
}
