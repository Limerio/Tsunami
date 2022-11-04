/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Button, Container, Loader, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'

import { Form, TitleForm, TitleDashboardMain } from '@web/utils/styles'
import { useSocketContext } from '@web/contexts/socket'
import { EventsWs } from '@tsunami-clone/constants'
import { DashboardLayout } from '@web/layouts'
import { TScan } from '@tsunami-clone/types'
import { ScanService } from '@web/services'
import { useNavigate } from 'react-router-dom'

export function DashboardScansNewPage() {
  const navigate = useNavigate()
  const socket = useSocketContext()
  const form = useForm({
    initialValues: {
      ip: '',
    },
    validate: {
      ip: (value: string) => {
        if (value.length > 4) {
          if (value === 'localhost') value = '127.0.0.7'

          return null
        } else {
          return 'Ip not valid'
        }
      },
    },
  })
  const [scan, setScan] = useState<TScan>()
  const [scanState, setScanState] = useState({
    loading: false,
    inProgress: false,
    finish: false,
  })

  useEffect(() => {
    socket.on(EventsWs.ScanInProgress, data => {
      setScan(data.scan)
      setScanState({
        loading: false,
        inProgress: true,
        finish: false,
      })
    })
    socket.on(EventsWs.ScanFinish, data => {
      setScanState({
        loading: false,
        inProgress: false,
        finish: true,
      })
      setScan(data.scan)

      setTimeout(() => navigate(`/dashboard/scans/${data.scan.id}/view`), 5000)
    })
    return () => {
      socket.off(EventsWs.ScanInProgress)
      socket.off(EventsWs.ScanFinish)
    }
  }, [socket, scan, navigate])

  const handleSubmit = async (values: typeof form.values) => {
    const { status } = await ScanService.create(values)
    if (status === 201) {
      setScanState({
        loading: true,
        inProgress: false,
        finish: false,
      })
    }
  }

  if (scanState.inProgress && !scanState.finish && !scanState.loading) {
    return (
      <DashboardLayout title="Scan in progress">
        <Container fluid my="lg" style={{ width: '100%' }}>
          <TitleDashboardMain>
            {`Scan in progress of ${scan?.ip}`}
          </TitleDashboardMain>
        </Container>
      </DashboardLayout>
    )
  }

  if (scanState.finish && !scanState.inProgress && !scanState.loading) {
    return (
      <DashboardLayout title="Scan in progress">
        <Container fluid my="lg" style={{ width: '100%' }}>
          <TitleDashboardMain>
            {`Scan finish of ${scan?.ip} redirect in 5 seconds`}
          </TitleDashboardMain>
        </Container>
      </DashboardLayout>
    )
  }

  if (scanState.loading && !scanState.finish && !scanState.inProgress) {
    return (
      <DashboardLayout title="Scan in progress">
        <Container fluid my="lg" style={{ width: '100%' }}>
          <TitleDashboardMain>Loading...</TitleDashboardMain>
          <Loader size="xl" variant="bars" />
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
