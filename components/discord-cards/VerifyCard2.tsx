import React from "react"
import {
  MenuListDataParam,
  VerifyCard2Param,
  VerifyCard2ChildParam,
  GeneralLinkParam,
} from "../../models/discord-bot-params"
import { isEmpty } from "lodash"

type Props = {
  data: MenuListDataParam
}

const VerifyCard2 = ({ data }: Props) => {
  const thisData = (data.verifyCard2 ? data.verifyCard2 : {}) as VerifyCard2Param

  return (
    <div className="discord-card" style={{ width: "420px" }}>
      <div className="card-vertical-bar" style={{ background: "red" }} />
      <div className="card-container" style={{ maxWidth: "100%" }}>
        {!isEmpty(thisData) && (
          <>
            <p>{thisData.title}</p>
            <p className="card-child-content">{thisData.content}</p>
            <div>
              {thisData.child.map((item: VerifyCard2ChildParam, index: number) => {
                return (
                  <div key={index} className="price-set-1-link" style={{ margin: 0 }}>
                    <a href={item.main.link} target="_blank" rel="noreferrer">
                      {item.main.title}
                    </a>
                    <span>(</span>
                    <a href={item.sub.link} target="_blank" rel="noreferrer">
                      {item.sub.title}
                    </a>
                    <span>)</span>
                  </div>
                )
              })}
              <p className="card-child-content">+ more</p>
            </div>
            <p style={{ marginTop: "15px" }}>Links</p>
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

export default VerifyCard2
