import React from "react"
import Header from "../components/Header"

type Props = {
  children?: any
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-pages">{children}</div>
    </div>
  )
}

export default MainLayout
