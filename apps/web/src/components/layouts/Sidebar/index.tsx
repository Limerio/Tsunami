/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  IconHome2,
  IconReportSearch,
  IconSettings,
  IconLogout,
  IconReportAnalytics,
} from '@tabler/icons'
import { Navbar, Center, Stack } from '@mantine/core'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { SidebarLink, type SidebarLinkProps } from './SidebarLink'
import { IconUserSidebar } from './IconUserSidebar'
import { AuthService } from '@web/services'

const sidebarLinks: SidebarLinkProps[] = [
  { icon: IconHome2, label: 'Home', href: '/' },
  { icon: IconReportAnalytics, label: 'Scan an ip', href: 'scans/new' },
  { icon: IconReportSearch, label: 'Old scans', href: 'scans/old' },
  { icon: IconSettings, label: 'Settings', href: 'settings' },
]

export function Sidebar() {
  const router = useRouter()
  const [active] = useState(
    sidebarLinks.findIndex(route => `/dashboard/${route.href}` === router.route)
  )

  const logoutAction = () => {
    AuthService.logoutAccount().then(() => {
      router.push('/auth/login')
    })
  }

  return (
    <Navbar width={{ base: 80 }} p="md">
      <Center>
        <IconUserSidebar />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {sidebarLinks.map((link, index) => (
            <SidebarLink
              {...link}
              key={link.label}
              active={index === active}
              onClick={() => router.push(`/dashboard/${link.href}`)}
            />
          ))}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <SidebarLink
            icon={IconLogout}
            label="Logout"
            onClick={logoutAction}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  )
}
