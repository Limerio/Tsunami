import type { PropsWithChildren } from 'react'
import Head from 'next/head'

import { Sidebar } from '@web/components/layouts/Sidebar'
import { SidebarMain } from '@web/utils/styles'

interface DashboardLayoutProps {
  title: string
}

export function DashboardLayout({
  children,
  title,
}: PropsWithChildren<DashboardLayoutProps>) {
  return (
    <SidebarMain>
      <Head>
        <title>Dashboard {title}</title>
      </Head>
      <Sidebar />
      {children}
    </SidebarMain>
  )
}