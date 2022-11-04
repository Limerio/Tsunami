/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Avatar } from '@mantine/core'

import { useUserContext } from '@web/contexts/user'

export function IconUserSidebar() {
  const { user } = useUserContext()
  return (
    <Avatar variant="filled" radius="xl" color="blue">
      {user?.username.at(0)}
    </Avatar>
  )
}
