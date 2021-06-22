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
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.3.7/css/swiper.min.css"
          ></link>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"
          ></link>
        </Head>

        <body>
          <Main />
        </body>

        <NextScript />
      </Html>
    )
  }
}
