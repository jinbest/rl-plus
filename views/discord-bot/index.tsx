import React, { useState } from "react"
import {
  NavItemParam,
  MenuListParam,
  MenuListDataParam,
  DiscordBotMenuKeysParam,
  MenuListDataContentWithLinkParam,
} from "../../models/discord-bot-params"
import config from "../../static/config.json"
import DiscordAddmeCard from "../../components/discord-cards/DiscordAddmeCard"
import DiscordAuthCard from "../../components/discord-cards/DiscordAuthCard"
import PriceSetCard1 from "../../components/discord-cards/PriceSetCard1"
import PriceSetCard2 from "../../components/discord-cards/PriceSetCard2"
import RepCard from "../../components/discord-cards/RepCard"
import StatsCard from "../../components/discord-cards/StatsCard"
import MeCard from "../../components/discord-cards/MeCard"
import VerifyCard1 from "../../components/discord-cards/VerifyCard1"
import VerifyCard2 from "../../components/discord-cards/VerifyCard2"
import ReportCard from "../../components/discord-cards/ReportCard"
import _, { isEmpty } from "lodash"
import Image from "next/image"

const HIDE_MENU_KEYS = ["stats", "me", "scam", "price"]

const DiscordBot = () => {
  const navList: NavItemParam[] = config.discordBot.navList
  const menuList: MenuListParam[] = _.sortBy(config.discordBot.menuList, (o) => o.order)

  const filteredMenuList = _.filter(menuList, (o) => !HIDE_MENU_KEYS.includes(o.key))

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
                <Image width="55" height="55" src={item.logo} alt={`nav-logo-${index}`} />
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
            <h3>{navList[navIndex].name}</h3>
          </div>
          <div className="discord-list-container">
            {filteredMenuList.map((item: MenuListParam, index: number) => {
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
            <h3>{filteredMenuList[menuIndex].title.label2}</h3>
          </div>
          <div className="discord-main-container">
            {filteredMenuList[menuIndex].data.map((item: MenuListDataParam, index: number) => {
              return (
                <div key={index}>
                  <div style={{ width: "45px", height: "45px" }}>
                    <Image
                      width="45"
                      height="45"
                      src={item.logo ? item.logo : navList[navIndex].logo}
                      alt={`discord-main-logo-${index}`}
                    />
                  </div>
                  <div className="discord-main-data">
                    <h3>{item.name ? item.name : navList[navIndex].name}</h3>
                    {item.subtitle?.length && (
                      <>
                        {item.subtitle.map((it: string, idx: number) => {
                          return (
                            <p className="discord-main-subtitle" key={`${index}-${idx}`}>
                              {it}
                            </p>
                          )
                        })}
                      </>
                    )}
                    {item.contentWithLink?.length && (
                      <div
                        className={
                          filteredMenuList[menuIndex].key ===
                            ("verify" as DiscordBotMenuKeysParam) ||
                          filteredMenuList[menuIndex].key === ("scam" as DiscordBotMenuKeysParam)
                            ? ""
                            : "flex flex-wrap align-center"
                        }
                      >
                        {item.contentWithLink.map(
                          (it: MenuListDataContentWithLinkParam, idx: number) => {
                            return (
                              <div key={`${index}-${idx}`} className="flex flex-wrap align-center">
                                {it.text && (
                                  <p
                                    className="discord-main-subtitle"
                                    style={{ marginRight: "5px" }}
                                  >
                                    {it.text}
                                  </p>
                                )}
                                <a
                                  className="discord-main-sublink"
                                  href={it.link?.link}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {it.link?.title}
                                </a>
                              </div>
                            )
                          }
                        )}
                      </div>
                    )}
                    {item.statsPlayList && !isEmpty(item.statsPlayList) && (
                      <div className="discord-code-pan">
                        <pre className="stats-pre-code">
                          <code style={{ textDecoration: "underline" }}>Playlists:</code>
                        </pre>
                        <pre className="stats-pre-code">
                          <code>{`Due1: ${item.statsPlayList.due1}`}</code>
                        </pre>
                        <pre className="stats-pre-code">
                          <code>{`Double: ${item.statsPlayList.double}`}</code>
                        </pre>
                        <pre className="stats-pre-code">
                          <code>{`Solo Standard: ${item.statsPlayList.solo}`}</code>
                        </pre>
                        <pre className="stats-pre-code">
                          <code>{`Standard: ${item.statsPlayList.standard}`}</code>
                        </pre>
                      </div>
                    )}
                    <div>
                      {filteredMenuList[menuIndex].key === ("addme" as DiscordBotMenuKeysParam) && (
                        <DiscordAddmeCard data={item} navData={navList[navIndex]} />
                      )}
                      {filteredMenuList[menuIndex].key === ("auth" as DiscordBotMenuKeysParam) &&
                        item.authCard && <DiscordAuthCard data={item} />}
                      {filteredMenuList[menuIndex].key === ("price" as DiscordBotMenuKeysParam) &&
                        item.priceSetCard1 && <PriceSetCard1 data={item} />}
                      {filteredMenuList[menuIndex].key === ("price" as DiscordBotMenuKeysParam) &&
                        item.priceSetCard2 && <PriceSetCard2 data={item} />}
                      {filteredMenuList[menuIndex].key === ("rep" as DiscordBotMenuKeysParam) &&
                        item.repCard && <RepCard data={item} />}
                      {filteredMenuList[menuIndex].key === ("stats" as DiscordBotMenuKeysParam) &&
                        item.statsCard && <StatsCard data={item} />}
                      {filteredMenuList[menuIndex].key === ("me" as DiscordBotMenuKeysParam) &&
                        item.meCard && <MeCard data={item} />}
                      {filteredMenuList[menuIndex].key === ("verify" as DiscordBotMenuKeysParam) &&
                        item.verifyCard1 && <VerifyCard1 data={item} />}
                      {filteredMenuList[menuIndex].key === ("verify" as DiscordBotMenuKeysParam) &&
                        item.verifyCard2 && <VerifyCard2 data={item} />}
                      {filteredMenuList[menuIndex].key === ("report" as DiscordBotMenuKeysParam) &&
                        item.reportCard && <ReportCard data={item} />}
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
