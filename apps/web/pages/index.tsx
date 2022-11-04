import { Button } from '@mantine/core'
import Link from 'next/link'

function Index() {
  return (
    <div>
      TSUNAMIIIIII{' '}
      <Button>
        <Link href="/auth/login">Login</Link>
      </Button>
    </div>
  )
}

export default Index
