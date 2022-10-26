/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useSocketContext } from '@web/contexts/socket'
import { DashboardLayout } from '@web/layouts'
import { useAuth } from '@web/hooks'
import { useEffect } from 'react'

export default function Dashboard() {
  const { user } = useAuth()
  const socket = useSocketContext()

  useEffect(() => {
    socket.emit('test', { data: 'data' })
    socket.on('test', data => {
      console.log(data)
    })
  }, [socket])

  return (
    <DashboardLayout title="Home">
      <h1>{user?.username}</h1>
    </DashboardLayout>
  )
}
