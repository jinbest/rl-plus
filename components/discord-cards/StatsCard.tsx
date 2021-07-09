import React from "react"
import {
  MenuListDataParam,
  StatsCardParam,
  MenuListDataContentWithLinkParam,
  GeneralLinkParam,
} from "../../models/discord-bot-params"
import Image from "next/image"

type Props = {
  data: MenuListDataParam
}

const StatsCard = ({ data }: Props) => {
  const thisData = (data.statsCard ? data.statsCard : {}) as StatsCardParam

  return (
    <div className="discord-card">
      <div className="card-vertical-bar" />
      <div className="card-container">
        {thisData.contentWithLink && (
          <div className="flex flex-wrap align-center">
            {thisData.contentWithLink.map((it: MenuListDataContentWithLinkParam, index: number) => {
              return (
                <React.Fragment key={index}>
                  {it.text && (
                    <p
                      className="discord-main-subtitle"
                      style={{ marginRight: "5px", color: "white" }}
                    >
                      {it.text}
                    </p>
                  )}
                  <a
                    className="discord-main-sublink"
                    href={it.link?.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginTop: "4px" }}
                  >
                    {it.link?.title}
                  </a>
                </React.Fragment>
              )
            })}
          </div>
        )}
        <div className="flex flex-wrap">
          {thisData.links.map((item: GeneralLinkParam, index: number) => {
            return (
              <div key={index} className="price-set-1-link">
                <a href={item.link} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
                {index < thisData.links.length - 1 && <span> | </span>}
              </div>
            )
          })}
        </div>
        <Image
          width="480"
          height="226"
          layout="responsive"
          className="card-child-img"
          src={thisData.img_src}
          alt="stats-logo"
        />
      </div>
    </div>
  )
}

export default StatsCard
