import { Avatar } from '@mantine/core'
import { useUserContext } from '@web/stores/user'

export function IconUserSidebar() {
  const { user } = useUserContext()
  return (
    <Avatar variant="filled" radius="xl" color="blue">
      {user?.username.at(0)}
    </Avatar>
  )
}
