/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import type { PropsWithChildren } from 'react'

import { Sidebar } from '@web/components/layouts/Sidebar'
import { SocketProvider } from '@web/contexts/socket'
import { SidebarMain } from '@web/utils/styles'

interface DashboardLayoutProps {
  title: string
}

export function DashboardLayout({
  children,
  title,
}: PropsWithChildren<DashboardLayoutProps>) {
  document.title = title
  return (
    <SocketProvider>
      <SidebarMain>
        <Sidebar />
        {children}
      </SidebarMain>
    </SocketProvider>
  )
}
