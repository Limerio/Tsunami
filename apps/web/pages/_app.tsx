/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { MantineProvider } from '@mantine/core'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { UserProvider } from '@web/contexts/user'

import '@web/styles/styles.css'
import { SocketProvider } from '@web/contexts/socket'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tsunami</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <UserProvider>
          <SocketProvider>
            <Component {...pageProps} />
          </SocketProvider>
        </UserProvider>
      </MantineProvider>
    </>
  )
}
