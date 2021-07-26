import React from "react"
import MainLayout from "../layouts/MainLayout"
import { useRouter } from "next/router"
import { pageRoutes } from "../routes"
import _ from "lodash"

export default function Index() {
  const router = useRouter()
  let path = router.asPath.split("#")[0].split("/");
  
  if(path.length === 3) path[2] = ":slug"
  
  let pathString = path.join("/")

  const pathIndex = Math.max(_.findIndex(pageRoutes, { path: pathString }), 0)

  return <MainLayout>{pageRoutes[pathIndex].component()}</MainLayout>
}
