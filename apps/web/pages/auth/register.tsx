import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { Form, TitleForm } from '@web/utils/styles'
import type { TAuthRegisterData } from '@web/utils/types'
import { AuthService } from '@web/services'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Register() {
  const router = useRouter()
  const form = useForm<TAuthRegisterData>({
    initialValues: {
      user: {
        username: '',
        password: '',
        confirmPassword: '',
      },
    },
    validate: {
      user: {
        username: (value: string) =>
          value.length < 2 ? 'Username must have at least 2 letters' : null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        confirmPassword: (value: string, values: any) =>
          value !== values.user.password ? 'Passwords did not match' : null,
      },
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    const { status } = await AuthService.registerAccount(values)
    if (status === 200) {
      router.push('/auth/login')
    }
  }

  return (
    <Form onSubmit={form.onSubmit(handleSubmit)}>
      <TitleForm>Register</TitleForm>
      <TextInput
        label="Username"
        placeholder="Username"
        {...form.getInputProps('user.username')}
      />
      <PasswordInput
        label="Password"
        placeholder="Password"
        mt="md"
        {...form.getInputProps('user.password')}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm Password"
        mt="md"
        {...form.getInputProps('user.confirmPassword')}
      />
      <Button.Group style={{ marginTop: '12px' }}>
        <Button type="submit">Submit</Button>
        <Button color="indigo">
          <Link href="/auth/login">Login to your account</Link>
        </Button>
      </Button.Group>
    </Form>
  )
}
