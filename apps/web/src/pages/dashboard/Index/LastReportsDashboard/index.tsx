/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Button, Card, Group, Text } from '@mantine/core'
import { useUserContext } from '@web/contexts/user'
import Link from 'next/link'

export function LastReportsDashboard() {
  const { user } = useUserContext()

  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500}>Last Scans</Text>
        </Group>
      </Card.Section>

      {user.scans.slice(0, 3).map(scan => (
        <Card.Section key={scan.ip} withBorder inheritPadding py="xs">
          {scan.ip}
        </Card.Section>
      ))}

      <Card.Section withBorder inheritPadding py="xs">
        <Button color="blue" fullWidth mt="md" radius="md">
          <Link href="/dashboard/scans/old">View all</Link>
        </Button>
      </Card.Section>
    </Card>
  )
}
