import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"
import config from "../static/config.json"

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content={config.headerData.description} />
          <link rel="icon" href={config.headerData.favicon} />
        </Head>

        <body>
          <Main />
        </body>

        <NextScript />
      </Html>
    )
  }
}
