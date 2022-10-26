/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Table, ScrollArea, Text, TextInput } from '@mantine/core'
import { useState } from 'react'
import { IconSearch } from '@tabler/icons'

import {
  data,
  sortData,
  Th,
  type RowData,
} from '@web/pages/dashboard/scans/old'
import { DashboardLayout } from '@web/layouts'

export default function DashboardOldScans() {
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    )
  }

  const rows = sortedData.map(row => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>{row.email}</td>
      <td>{row.company}</td>
    </tr>
  ))
  return (
    <DashboardLayout title="Old Scans">
      <ScrollArea>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          icon={<IconSearch size={14} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: 'fixed', minWidth: 700 }}
        >
          <thead>
            <tr>
              <Th
                sorted={sortBy === 'name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('name')}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === 'email'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('email')}
              >
                Email
              </Th>
              <Th
                sorted={sortBy === 'company'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('company')}
              >
                Company
              </Th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(data[0]).length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </DashboardLayout>
  )
}
