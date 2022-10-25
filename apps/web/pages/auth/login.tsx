import { Form, TitleForm } from '@web/utils/styles'
import { TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthService } from '@web/services'

export default function Login() {
  const router = useRouter()
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
    const { status } = await AuthService.loginAccount(values)
    if (status === 200) {
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
      <TextInput
        label="Password"
        placeholder="Password"
        type="password"
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