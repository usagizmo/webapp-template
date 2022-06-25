import Document from 'next/document'
import { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  override render() {
    return (
      <Html className="h-full">
        <Head />
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
