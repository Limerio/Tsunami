/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { TextInput, Button, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Link, useNavigate } from 'react-router-dom'

import { Form, TitleForm } from '@web/utils/styles'
import { useUserContext } from '@web/contexts/user'
import { AuthService } from '@web/services'

export function LoginPage() {
  const { setUser } = useUserContext()
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      user: {
        username: '',
        password: '',
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
      navigate('/dashboard')
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
          <Link to="/auth/register">Register an account</Link>
        </Button>
      </Button.Group>
    </Form>
  )
}
