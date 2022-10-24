import { createStylesServer, ServerStyles } from '@mantine/next'
import { ServerStyleSheet } from 'styled-components'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

const stylesServer = createStylesServer()

export default class _Document extends Document {
  static getInitialProps = async (ctx: DocumentContext) => {
    const originalRenderPage = ctx.renderPage

    const sheet = new ServerStyleSheet()

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        enhanceComponent: Component => Component,
      })

    const initialProps = await Document.getInitialProps(ctx)
    const styles = sheet.getStyleElement()

    return {
      ...initialProps,
      styles: [
        ...styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key="styles"
        />,
      ],
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
