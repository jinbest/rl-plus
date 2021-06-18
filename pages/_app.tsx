import React from "react"
import Head from "next/head"
import type { AppProps } from "next/app"
import config from "../static/config.json"
import "../styles/index.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{config.headerData.title}</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
