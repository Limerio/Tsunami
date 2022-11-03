/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import type { PropsWithChildren } from 'react'
import Head from 'next/head'

import { Sidebar } from '@web/components/layouts/Sidebar'
import { SocketProvider } from '@web/contexts/socket'
import { SidebarMain } from '@web/utils/styles'
import { useAuth } from '@web/hooks'

interface DashboardLayoutProps {
  title: string
}

export function DashboardLayout({
  children,
  title,
}: PropsWithChildren<DashboardLayoutProps>) {
  const { loading } = useAuth()

  return (
    <SocketProvider>
      <SidebarMain>
        <Head>
          <title>Dashboard {title}</title>
        </Head>
        {!loading && <Sidebar />}
        {!loading ? children : 'loading...'}
      </SidebarMain>
    </SocketProvider>
  )
}
