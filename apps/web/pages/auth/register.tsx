import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Form, TitleForm } from '@web/utils/styles'
import { AuthService } from '@web/services'

export default function Register() {
  const router = useRouter()
  const form = useForm({
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
        confirmPassword: (value: string, values: typeof this.values) =>
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
      <TextInput
        label="Password"
        placeholder="Password"
        type="password"
        mt="md"
        {...form.getInputProps('user.password')}
      />
      <TextInput
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
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
