/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useEffect, useState } from 'react'
import { Container } from '@mantine/core'
import { useRouter } from 'next/router'
import { EventsWs } from '@tsunami-clone/constants'
import { useSocketContext } from '@web/contexts/socket'
import { TitleDashboardMain } from '@web/utils/styles'
import { DashboardLayout } from '@web/layouts'
import { TScan } from '@tsunami-clone/types'

export default function ScanLive() {
  const router = useRouter()
  const socket = useSocketContext()
  const [scan, setScan] = useState<TScan>()
  const [scanFinish, setScanFinish] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    socket.on(EventsWs.ScanInProgress, data => {
      setScan(data)
      setLoading(false)
    })
    socket.on(EventsWs.ScanFinish, () => {
      setScanFinish(true)
      setTimeout(() => {
        router.push(`/dashboard/scans/${router.query.scanId}/view`)
      }, 5000)
    })
    return () => {
      socket.off(EventsWs.ScanInProgress)
      socket.off(EventsWs.ScanFinish)
    }
  }, [socket, router])

  return (
    <DashboardLayout title="Scan in progress">
      <Container fluid my="lg" style={{ width: '100%' }}>
        <TitleDashboardMain>
          {loading
            ? 'Loading...'
            : !scanFinish
            ? `Scan in progress of ${scan.ip}`
            : `Scan finish redirect in 5 seconds...`}
          {}
        </TitleDashboardMain>
      </Container>
    </DashboardLayout>
  )
}
