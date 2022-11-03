/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Button, Container, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/router'

import { Form, TitleForm, TitleDashboardMain } from '@web/utils/styles'
import { useSocketContext } from '@web/contexts/socket'
import { EventsWs } from '@tsunami-clone/constants'
import { DashboardLayout } from '@web/layouts'
import { TScan } from '@tsunami-clone/types'
import { ScanService } from '@web/services'

export default function DashboardOldScans() {
  const router = useRouter()
  const socket = useSocketContext()
  const form = useForm({
    initialValues: {
      ip: '',
    },
    validate: {
      ip: (value: string) => {
        if (value.length > 4) {
          return null
        } else {
          return 'Ip not valid'
        }
      },
    },
  })
  const [scan, setScan] = useState<TScan>()
  const [loading, setLoading] = useState(false)
  const [scanInProgress, setScanInProgress] = useState(false)
  const [scanFinish, setScanFinish] = useState(false)

  useEffect(() => {
    socket.on(EventsWs.ScanInProgress, data => {
      setScan(data.scan)
      setLoading(false)
      setScanInProgress(true)
      setScanFinish(false)
    })
    socket.on(EventsWs.ScanFinish, data => {
      setLoading(false)
      setScanInProgress(false)
      setScanFinish(true)
      setScan(data.scan)
      setTimeout(() => {
        router.push(`/dashboard/scans/${data.scan.id}/view`)
      }, 5000)
    })
    return () => {
      socket.off(EventsWs.ScanInProgress)
      socket.off(EventsWs.ScanFinish)
    }
  }, [socket, router, scan])

  const handleSubmit = async (values: typeof form.values) => {
    const { data, status } = await ScanService.create(values)
    console.log(data, status)
    if (status === 201) {
      setLoading(true)
    }
  }

  if (scanInProgress && !scanFinish && !loading) {
    return (
      <DashboardLayout title="Scan in progress">
        <Container fluid my="lg" style={{ width: '100%' }}>
          <TitleDashboardMain>
            {`Scan in progress of ${scan && scan.ip}`}
          </TitleDashboardMain>
        </Container>
      </DashboardLayout>
    )
  }

  if (scanFinish && !scanInProgress && !loading) {
    return (
      <DashboardLayout title="Scan in progress">
        <Container fluid my="lg" style={{ width: '100%' }}>
          <TitleDashboardMain>
            {`Scan finish of ${scan && scan.ip} redirect in 5 seconds`}
          </TitleDashboardMain>
        </Container>
      </DashboardLayout>
    )
  }

  if (loading && !scanFinish && !scanInProgress) {
    return (
      <DashboardLayout title="Scan in progress">
        <Container fluid my="lg" style={{ width: '100%' }}>
          <TitleDashboardMain>Loading...</TitleDashboardMain>
        </Container>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Scan an ip">
      <Container my="lg">
        <Form onSubmit={form.onSubmit(handleSubmit)}>
          <TitleForm>Create a new scan</TitleForm>
          <TextInput
            label="IP"
            placeholder="ip"
            my="md"
            {...form.getInputProps('ip')}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </DashboardLayout>
  )
}
