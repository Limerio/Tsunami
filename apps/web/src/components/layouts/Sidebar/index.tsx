/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  IconHome2,
  IconReportSearch,
  IconSettings,
  IconLogout,
  IconReportAnalytics,
} from '@tabler/icons'
import { Navbar, Center, Stack } from '@mantine/core'
import { useState } from 'react'

import { SidebarLink, type SidebarLinkProps } from './SidebarLink'
import { IconUserSidebar } from './IconUserSidebar'
import { AuthService } from '@web/services'
import { useLocation, useNavigate } from 'react-router-dom'

const sidebarLinks: SidebarLinkProps[] = [
  { icon: IconHome2, label: 'Home', href: '/' },
  { icon: IconReportAnalytics, label: 'Scan an ip', href: 'scans/new' },
  { icon: IconReportSearch, label: 'Old scans', href: 'scans/old' },
  { icon: IconSettings, label: 'Settings', href: 'settings' },
]

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [active] = useState(
    sidebarLinks.findIndex(
      route => `/dashboard/${route.href}` === location.pathname
    )
  )

  const logoutAction = () => {
    AuthService.logoutAccount().then(() => {
      navigate('/auth/login')
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
              onClick={() => navigate(`/dashboard/${link.href}`)}
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
