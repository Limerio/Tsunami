/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Card, Text, SimpleGrid, Group } from '@mantine/core'

import {
  ApacheIcon,
  MongodbIcon,
  NginxIcon,
  MysqlIcon,
  DockerIcon,
} from '@web/icons/dashboard/plugins'
import { useStyles } from './Plugin.styles'
import { PluginCard, TPluginCard } from './PluginCard'

export function PluginsDashboard() {
  const { classes } = useStyles()

  const cards: TPluginCard[] = [
    { title: 'Mongodb', Icon: MongodbIcon },
    { title: 'Apache', Icon: ApacheIcon },
    { title: 'Nginx', Icon: NginxIcon },
    { title: 'Mysql', Icon: MysqlIcon },
    { title: 'Docker', Icon: DockerIcon },
  ]

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Group position="apart">
        <Text className={classes.title}>Plugins</Text>
        <Text italic>this part is not started</Text>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {cards.map(data => (
          <PluginCard {...data} key={data.title} />
        ))}
      </SimpleGrid>
    </Card>
  )
}
