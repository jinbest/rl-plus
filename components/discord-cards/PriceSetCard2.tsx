import { isEmpty } from "lodash"
import React from "react"
import {
  MenuListDataParam,
  PriceSetCard2Param,
  GeneralLinkParam,
  GeneralDataParam,
} from "../../models/discord-bot-params"

type Props = {
  data: MenuListDataParam
}

const PriceSetCard2 = ({ data }: Props) => {
  const thisData = (data.priceSetCard2 ? data.priceSetCard2 : {}) as PriceSetCard2Param

  return (
    <div className="discord-card">
      <div className="card-vertical-bar" />
      <div className="card-container" style={{ maxWidth: "100%" }}>
        {!isEmpty(thisData) && (
          <>
            <div className="flex justify-between" style={{ marginBottom: "10px" }}>
              <div className="flex flex-wrap">
                <div className="price-set-2-child-data">
                  <p>{thisData.title}</p>
                  <div className="card-child-content">
                    <p>{thisData.content}</p>
                    <p>-</p>
                  </div>
                </div>
                {thisData.data.map((item: GeneralDataParam, index: number) => {
                  return (
                    <div key={index} className="price-set-2-child-data">
                      <p>{item.title}</p>
                      <div className="card-child-content">
                        <p>{item.content}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div>
                <img className="price-set-1-logo" src={thisData.logo} alt="price-set-1-logo" />
              </div>
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
          </>
        )}
      </div>
    </div>
  )
}

export default PriceSetCard2
