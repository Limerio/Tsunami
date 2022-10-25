import { Tooltip, UnstyledButton } from '@mantine/core'
import type { TablerIcon } from '@tabler/icons'
import { useStyles } from './SidebarLink.style'

export interface SidebarLinkProps {
  icon: TablerIcon
  label: string
  href?: string
  active?: boolean
  onClick?(): void
}

export function SidebarLink({
  icon: Icon,
  label,
  active,
  onClick,
}: SidebarLinkProps) {
  const { classes, cx } = useStyles()
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  )
}
