/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { TextInput, Button, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import Link from 'next/link'

import { Form, TitleForm } from '@web/utils/styles'
import { useUserContext } from '@web/contexts/user'
import { AuthService } from '@web/services'
import { useRouter } from 'next/router'

export default function Login() {
  const { setUser } = useUserContext()
  const router = useRouter()
  const form = useForm({
    initialValues: {
      user: {
        username: 'Test',
        password: 'password',
      },
    },

    validate: {
      user: {
        username: (value: string) =>
          value.length < 2 ? 'Username must have at least 2 letters' : null,
      },
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    const { data, status } = await AuthService.loginAccount(values)
    if (status === 200) {
      setUser(data)
      router.push('/dashboard')
    }
  }

  return (
    <Form onSubmit={form.onSubmit(handleSubmit)}>
      <TitleForm>Login</TitleForm>
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
      <Button.Group style={{ marginTop: '12px' }}>
        <Button type="submit">Submit</Button>
        <Button color="indigo">
          <Link href="/auth/register">Register an account</Link>
        </Button>
      </Button.Group>
    </Form>
  )
}
