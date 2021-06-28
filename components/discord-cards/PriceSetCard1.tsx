import { isEmpty } from "lodash"
import React from "react"
import {
  MenuListDataParam,
  PriceSetCard1Param,
  GeneralLinkParam,
} from "../../models/discord-bot-params"

type Props = {
  data: MenuListDataParam
}

const PriceSetCard1 = ({ data }: Props) => {
  const thisData = (data.priceSetCard1 ? data.priceSetCard1 : {}) as PriceSetCard1Param

  return (
    <div className="discord-card">
      <div className="card-vertical-bar" style={{ background: "white" }} />
      <div className="card-container" style={{ maxWidth: "100%" }}>
        {!isEmpty(thisData) && (
          <>
            <div className="flex justify-between">
              <div>
                <p>{thisData.title}</p>
                <div className="card-child-content" style={{ marginBottom: "10px" }}>
                  <p>{thisData.content}</p>
                </div>
                <p>Links</p>
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
              </div>
              <div>
                <img className="price-set-1-logo" src={thisData.logo} alt="price-set-1-logo" />
              </div>
            </div>
            <img className="card-child-img" src={thisData.img_src} alt="price-set-card-1" />
          </>
        )}
      </div>
    </div>
  )
}

export default PriceSetCard1
