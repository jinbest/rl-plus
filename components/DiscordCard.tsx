import React from "react"
import { MenuListDataParam, NavItemParam } from "../models/discord-bot-params"

type Props = {
  data: MenuListDataParam
  navData: NavItemParam
}

const DiscordCard = ({data, navData}: Props) => {
  return (
    <div className="discord-card">
      <div className="card-vertical-bar" />
      <div className="card-container">
        <p>{data.title}:</p>
        <a href={data.link.href}>{data.link.name}</a>
        <div className="card-child-board">
          <p className="card-child-board-title">{data.content}</p>
          <div>
            <div>
              <div className="child-img-container">
                <img src={navData.logo} alt="discord-card-child-logo" />
              </div>
              <div className="child-data-container">
                <p className="child-card-data-title">{navData.name}</p>
                <div className="flex">
                  {data.child.servers ? <div><div className="badge green" />{data.child.servers} Servers</div> : <></>}
                  {data.child.online ? <div><div className="badge green" />{data.child.online} Online</div> : <></>}
                  {data.child.members ? <div><div className="badge grey" />{data.child.members} Members</div> : <></>}
                </div>
              </div>
            </div>
            <button>ADD</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscordCard