import React from "react"
import {
  MenuListDataParam,
  AuthCardParam,
  AuthCardContentsParam,
} from "../../models/discord-bot-params"
import { isEmpty } from "lodash"

type Props = {
  data: MenuListDataParam
}

const DiscordAuthCard = ({ data }: Props) => {
  const cardData = (data.authCard ? data.authCard : {}) as AuthCardParam

  return (
    <div className="discord-card">
      <div className="card-vertical-bar" />
      <div className="card-container" style={{ maxWidth: "100%" }}>
        {!isEmpty(cardData) && (
          <>
            {cardData.data.map((item: AuthCardContentsParam, index: number) => {
              return (
                <React.Fragment key={index}>
                  <p>{item.title}:</p>
                  <div className="card-child-content">
                    {item.contents.map((it: string, idx: number) => {
                      return <p key={`${index}-${idx}`}>{`- ${it}`}</p>
                    })}
                  </div>
                </React.Fragment>
              )
            })}
            <img className="card-child-img" src={cardData.img_src} alt="auth-card" />
          </>
        )}
      </div>
    </div>
  )
}

export default DiscordAuthCard
