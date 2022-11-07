import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => (
  <Html lang="jp">
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=M+PLUS+1p&display=swap"
        rel="stylesheet"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="picture/VRooMIcon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="picture/VRooMIcon.png"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
