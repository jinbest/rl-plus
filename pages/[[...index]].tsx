import React from "react"
import MainLayout from "../layouts/MainLayout"
import { useRouter } from "next/router"
import { pageRoutes } from "../routes"
import _ from "lodash"

export default function Index() {
  const router = useRouter()
  const pathIndex = Math.max(_.findIndex(pageRoutes, { path: router.asPath.split("#")[0] }), 0)

  return <MainLayout>{pageRoutes[pathIndex].component()}</MainLayout>
}
