import React, { useState } from "react"
import { NavItemParam, MenuListParam, MenuListDataParam } from "../../models/discord-bot-params"
import config from "../../static/config.json"
import DiscordAddmeCard from "../../components/discord-cards/DiscordAddmeCard"
import DiscordAuthCard from "../../components/discord-cards/DiscordAuthCard"
import _ from "lodash"

const DiscordBot = () => {
  const navList: NavItemParam[] = config.discordBot.navList
  const menuList: MenuListParam[] = _.sortBy(config.discordBot.menuList, (o) => o.order)

  const [navIndex, setNavIndex] = useState(0)
  const [menuIndex, setMenuIndex] = useState(0)

  return (
    <div className="discord-bot">
      <div className="empty-board"></div>
      <div className="discord-board">
        <div className="discord-navbar">
          <div className="navbar-icons">
            <div className="icon-red"></div>
            <div className="icon-yellow"></div>
            <div className="icon-green"></div>
          </div>
          {navList.map((item: NavItemParam, index: number) => {
            return (
              <div
                key={index}
                className="nav-logo"
                onClick={() => {
                  setNavIndex(index)
                }}
              >
                <img src={item.logo} alt={`nav-logo-${index}`} />
              </div>
            )
          })}
          <div className="add-nav">
            <div>
              <p>+</p>
            </div>
          </div>
        </div>
        <div className="discord-list">
          <div className="discord-list-header">
            <p>{navList[navIndex].name}</p>
          </div>
          <div className="discord-list-container">
            {menuList.map((item: MenuListParam, index: number) => {
              return (
                <div
                  key={index}
                  style={{ background: index === menuIndex ? "#1E2023" : "" }}
                  onClick={() => {
                    setMenuIndex(index)
                  }}
                >
                  <p style={{ color: index === menuIndex ? "white" : "" }}>{item.title.label1}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="discord-main">
          <div className="discord-main-header">
            <p>{menuList[menuIndex].title.label2}</p>
          </div>
          <div className="discord-main-container">
            {menuList[menuIndex].data.map((item: MenuListDataParam, index: number) => {
              return (
                <div key={index}>
                  <img
                    src={item.logo ? item.logo : navList[navIndex].logo}
                    alt={`discord-main-logo-${index}`}
                  />
                  <div className="discord-main-data">
                    <p>{item.name ? item.name : navList[navIndex].name}</p>
                    {item.subtitle && <p className="discord-main-subtitle">{item.subtitle}</p>}
                    <div>
                      {menuList[menuIndex].key === "addme" && (
                        <DiscordAddmeCard data={item} navData={navList[navIndex]} />
                      )}
                      {menuList[menuIndex].key === "auth" && (
                        <DiscordAuthCard data={item} navData={navList[navIndex]} />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscordBot
