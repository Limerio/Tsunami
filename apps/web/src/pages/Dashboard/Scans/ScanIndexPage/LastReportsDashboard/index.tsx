/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Button, Card, Group, Skeleton, Text } from '@mantine/core'

import { useUserContext } from '@web/contexts/user'
import { useNavigate } from 'react-router-dom'

export function LastReportsDashboard() {
  const { user } = useUserContext()
  const navigate = useNavigate()

  const redirect = () => navigate('/dashboard/scans/old')

  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500}>Last Scans</Text>
        </Group>
      </Card.Section>

      {user ? (
        user.scans.slice(0, 3).map((scan, i) => (
          <Card.Section
            key={`${scan.ip}-${i}`}
            withBorder
            inheritPadding
            py="xs"
          >
            {scan.ip}
          </Card.Section>
        ))
      ) : (
        <Skeleton>
          <Card.Section></Card.Section>
        </Skeleton>
      )}

      <Card.Section withBorder inheritPadding py="xs">
        <Button onClick={redirect} color="blue" fullWidth mt="md" radius="md">
          View all
        </Button>
      </Card.Section>
    </Card>
  )
}
