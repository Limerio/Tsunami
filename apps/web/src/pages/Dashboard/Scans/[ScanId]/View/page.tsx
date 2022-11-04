/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { IconSearch } from '@tabler/icons'
import { TPortScan, TScan } from '@tsunami-clone/types'
import { useUserContext } from '@web/contexts/user'
import { DashboardLayout } from '@web/layouts'
import { TitleDashboardMain } from '@web/utils/styles'
import { useState, ChangeEvent, useEffect, useRef, Ref } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStyles } from './useStyles'

export function DashboardScansIdViewPage() {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const { scanId } = useParams()
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)
  const searchRef = useRef<HTMLInputElement>()
  const scanDefault = user?.scans.find(scan => scan.id === scanId)
  const [scan, setScan] = useState<TScan>()
  const [selectFilter, setSelectFilter] = useState('Close')
  const selectors = ['Open', 'Close', 'Reset']

  useEffect(() => {
    setScan({
      ...scanDefault,
      ports: scanDefault?.ports.filter(port => port.open) as TPortScan[],
    } as TScan)
  }, [scanId, scanDefault])

  const redirect = () => navigate('/dashboard')
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    if (value === '') {
      setScan(scanDefault!)
    } else {
      setScan(
        scanPrev =>
          ({
            ...scanPrev,
            ports: scanDefault!.ports.filter(
              ({ port }) => port === searchRef.current?.value
            ),
          } as TScan)
      )
    }
  }
  const filterOpenCloseReset = (event: string) => {
    setSelectFilter(event)
    searchRef.current!.value = ''
    switch (selectFilter) {
      case 'Close':
        setScan(
          scanPrev =>
            ({
              ...scanPrev,
              ports: scanDefault!.ports.filter(port => port.open),
            } as TScan)
        )
        break

      case 'Open':
        setScan(
          scanPrev =>
            ({
              ...scanPrev,
              ports: scanDefault!.ports.filter(port => !port.open),
            } as TScan)
        )
        break

      case 'Reset':
        setScan(scanDefault!)
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
                {Intl.DateTimeFormat('fr-FR').format(new Date(scan.createdAt))}
              </Text>

              <TextInput
                placeholder="Search by any field"
                mb="md"
                size="sm"
                radius="xl"
                icon={<IconSearch size={14} stroke={1.5} />}
                ref={searchRef as Ref<HTMLInputElement>}
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
