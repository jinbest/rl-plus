import React from "react"
import { MenuListDataParam, NavItemParam } from "../../models/discord-bot-params"
import Image from "next/image"

type Props = {
  data: MenuListDataParam
  navData: NavItemParam
}

const DiscordAddmeCard = ({ data, navData }: Props) => {
  return (
    <div className="discord-card">
      <div className="card-vertical-bar" />
      <div className="card-container">
        <p>{data.title}:</p>
        {data.link ? (
          <a href={data.link.href} target="_blank" rel="noreferrer">
            {data.link.name}
          </a>
        ) : (
          <></>
        )}
        <div className="card-child-board">
          <p className="card-child-board-title">{data.content}</p>
          <div>
            <div>
              <div className="child-img-container">
                <Image
                  width="45"
                  height="45"
                  src={data.logo ? data.logo : navData.logo}
                  alt="discord-card-child-logo"
                />
              </div>
              <div className="child-data-container">
                <p className="child-card-data-title">{data.name ? data.name : navData.name}</p>
                {data.child ? (
                  <div>
                    {data.child.servers ? (
                      <div>
                        <div className="badge green" />
                        {data.child.servers} Servers
                      </div>
                    ) : (
                      <></>
                    )}
                    {data.child.online ? (
                      <div>
                        <div className="badge green" />
                        {data.child.online} Online
                      </div>
                    ) : (
                      <></>
                    )}
                    {data.child.members ? (
                      <div>
                        <div className="badge grey" />
                        {data.child.members} Members
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {data.link ? (
              <a href={data.link.href} target="_blank" rel="noreferrer">
                <button>ADD</button>
              </a>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscordAddmeCard
