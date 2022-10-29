import { Text, UnstyledButton } from '@mantine/core'
import { TablerIcon } from '@tabler/icons'
import { useStyles } from './PluginCard.styles'

export type TPluginCard = {
  Icon: TablerIcon
  title: string
}

export function PluginCard({ Icon, title }: TPluginCard) {
  const { classes } = useStyles()

  return (
    <UnstyledButton p="md" className={classes.item}>
      <Icon size={32} />
      <Text size="xs" mt={7}>
        {title}
      </Text>
    </UnstyledButton>
  )
}
