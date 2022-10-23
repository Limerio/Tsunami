import { Button } from '@mantine/core'
import Link from 'next/link'

function Index() {
  return (
    <Link href="/auth/login" passHref>
      <Button component="a">Login</Button>
    </Link>
  )
}

export default Index
