/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { DashboardLayout } from '@web/layouts'
import { useForm } from '@mantine/form'
import { Button, Container, TextInput } from '@mantine/core'
import { Form, TitleForm } from '@web/utils/styles'
import { ScanService } from '@web/services'
import { useRouter } from 'next/router'

export default function DashboardOldScans() {
  const router = useRouter()
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

  const handleSubmit = async (values: typeof form.values) => {
    const { data, status } = await ScanService.create(values)
    console.log(data, status)
    if (status === 201) {
      router.push(`/dashboard/scans/${data.id}/live`)
    }
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
