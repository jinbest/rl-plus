import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { pageRoutes } from "../routes"
import Image from "next/image"
import logo from "../public/img/header/logo.png"
import alarm from "../public/img/header/alarm.svg"
import config from "../static/config.json"
import ReactDrawer from "react-drawer"
import SignModal from "./modal/SignModal"
import ForgotPassModal from "./modal/ForgotPassModal"
import "react-drawer/lib/react-drawer.css"
import Toast from "./toast/Toast"
import { ToastMsgParams } from "./toast/toast-msg-params"

console.warn = () => {
  // EMPTY
}

const Header = () => {
  const router = useRouter()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [path, setPath] = useState("/")
  const [toastParam, setToastParam] = useState<ToastMsgParams>({
    msg: "",
  })
  const [openForgotModal, setOpenForgotModal] = useState(false)
  const [openSignModal, setOpenSignModal] = useState(false)

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
    return () => {
      setOpenDrawer(false)
    }
  }

  const handleNavItem = (link: string) => {
    setOpenDrawer(false)
    router.push(link)
  }

  useEffect(() => {
    setPath(router.asPath)
  }, [router])

  const resetToastStatus = () => {
    setToastParam({
      msg: "",
      isSuccess: false,
      isError: false,
      isWarning: false,
    })
  }

  return (
    <React.Fragment>
      <div className="header">
        <div className="logo">
          <Link href="/">
            <a>
              <Image src={logo} alt="logo" width="120" height="54" />
            </a>
          </Link>
        </div>
        <div className="nav-link">
          {pageRoutes.map((item: any, index: number) => {
            return (
              <React.Fragment key={index}>
                {item.name && item.visible && (
                  <Link href={item.path}>
                    <a style={{ color: item.path === path ? "white" : "" }}>{item.name}</a>
                  </Link>
                )}
              </React.Fragment>
            )
          })}
        </div>
        <div className="others">
          <div className="download">
            <p>
              <span>+</span>
              DOWNLOAD
            </p>
          </div>
          <div className="premium">
            <div>
              <p>RL.PLUS Premium</p>
            </div>
            <div>
              <div className="alarm-img">
                <Image src={alarm} alt="logo" width="15" height="18" />
                <div className="badge" />
              </div>
            </div>
          </div>
          <div
            className="username"
            onClick={() => {
              setOpenSignModal(true)
            }}
          >
            <div className="avatar">
              <img src={config.header.user.avatar} alt="avatar" />
            </div>
            <div className="user">
              <p className="name">{config.header.user.name}</p>
              <p>{config.header.user.info}</p>
            </div>
          </div>
          <div className="drawer" onClick={toggleDrawer}>
            <img src={config.header.drawer.menu} alt="menu" />
          </div>
        </div>
      </div>
      <ReactDrawer
        open={openDrawer}
        position="right"
        onClose={() => {
          setOpenDrawer(false)
        }}
        noOverlay={false}
        style={{ zIndex: 100 }}
      >
        <div className="drawer-nav-link">
          <div
            className="drawer-cancel"
            onClick={() => {
              setOpenDrawer(false)
            }}
          >
            <img src={config.header.drawer.cancel} alt="cancel" />
          </div>
          <div
            className="drawer-logo"
            onClick={() => {
              handleNavItem("/")
            }}
          >
            <Image src={logo} alt="logo" width="126" height="52" />
          </div>
          <div
            className="drawer-nav-item"
            onClick={() => {
              handleNavItem("/")
            }}
            style={{ color: path === "/" ? "#FAC800" : "" }}
          >
            HOME
          </div>
          {pageRoutes.map((item: any, index: number) => {
            return (
              <React.Fragment key={index}>
                {item.name ? (
                  <div
                    className="drawer-nav-item"
                    onClick={() => {
                      handleNavItem(item.path)
                    }}
                    style={{ color: item.path === path ? "#FAC800" : "" }}
                  >
                    {item.name}
                  </div>
                ) : (
                  <></>
                )}
              </React.Fragment>
            )
          })}
          <div
            onClick={() => {
              setOpenDrawer(false)
              setOpenSignModal(true)
            }}
          >
            <p className="drawer-sign-trigger">SIGN</p>
          </div>
        </div>
      </ReactDrawer>
      <SignModal
        open={openSignModal}
        setOpen={setOpenSignModal}
        setToastParam={setToastParam}
        setForgotModal={setOpenForgotModal}
      />
      <ForgotPassModal
        openForgotModal={openForgotModal}
        setOpenForgotModal={setOpenForgotModal}
        setOpenSignModal={setOpenSignModal}
      />
      <Toast param={toastParam} resetStatus={resetToastStatus} />
    </React.Fragment>
  )
}

export default Header
