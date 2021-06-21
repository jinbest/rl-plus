import React from "react"
import { MenuListDataParam, NavItemParam, AuthCardParam } from "../../models/discord-bot-params"
// import { isEmpty } from "lodash"

type Props = {
  data: MenuListDataParam
  navData: NavItemParam
}

const DiscordAuthCard = ({ data, navData }: Props) => {
  const cardData = (data.authCard ? data.authCard : {}) as AuthCardParam
  console.log("discord-auth-card", cardData, navData)

  return (
    <div style={{ color: "#9e9e9e", fontSize: "9px" }}>
      <i>Discord Auth Card will be created here</i>
    </div>
  )
}

export default DiscordAuthCard
