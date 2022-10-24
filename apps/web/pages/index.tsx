import { Button } from '@mantine/core'
import Head from 'next/head'
import Link from 'next/link'

function Index() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Link href="/auth/login" passHref>
        <Button component="a">Login</Button>
      </Link>
    </>
  )
}

export default Index
