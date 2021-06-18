import React from "react"
import Link from "next/link"
import { pageRoutes } from "../routes"
import Image from "next/image"
import logo from "../public/img/header/logo.png"
import alarm from "../public/img/header/alarm.svg"
import config from "../static/config.json"

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link href="/">
          <a>
            <Image src={logo} alt="logo" width="126" height="52" />
          </a>
        </Link>
      </div>
      <div className="nav-link">
        {pageRoutes.map((item: any, index: number) => {
          return (
            <React.Fragment key={index}>
              {item.name && (
                <Link href={item.path}>
                  <a>{item.name}</a>
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
        <div className="username">
          <div className="avatar">
            <img src={config.header.user.avatar} alt="avatar" />
          </div>
          <div className="user">
            <p className="name">{config.header.user.name}</p>
            <p>{config.header.user.info}</p>
          </div>
        </div>
        <div className="drawer">
          <img src={config.header.drawer.menu} alt="menu" />
        </div>
      </div>
    </div>
  )
}

export default Header
