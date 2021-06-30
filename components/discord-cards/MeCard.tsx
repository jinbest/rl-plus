import { isEmpty } from "lodash"
import React from "react"
import {
  MenuListDataParam,
  MeCardParam,
  MenuListDataContentWithLinkParam,
  GeneralLinkParam,
  MeCardChildParam,
  MeCardChildContentParam,
} from "../../models/discord-bot-params"

type Props = {
  data: MenuListDataParam
}

const MeCard = ({ data }: Props) => {
  const thisData = (data.meCard ? data.meCard : {}) as MeCardParam

  return (
    <div className="discord-card">
      <div className="card-vertical-bar" />
      <div className="card-container" style={{ maxWidth: "100%" }}>
        {!isEmpty(thisData) && (
          <>
            <p>{thisData.title}</p>
            <div className="card-child-content">
              {thisData.contents.map((item: string, index: number) => {
                return <p key={index}>{item}</p>
              })}
            </div>
            {thisData.child.map((item: MeCardChildParam, index: number) => {
              return (
                <div key={index} style={{ margin: "10px 0" }}>
                  <p style={{ marginBottom: "0px" }}>{item.title}</p>
                  {item.contents.map((it: MeCardChildContentParam, idx: number) => {
                    return (
                      <div style={{ margin: "1px 0" }} key={`${index}-${idx}`}>
                        {it.contentWithLink && (
                          <div className="flex flex-wrap align-center">
                            {it.contentWithLink.map(
                              (itItem: MenuListDataContentWithLinkParam, idxItem: number) => {
                                return (
                                  <React.Fragment key={`${index}-${idx}-${idxItem}`}>
                                    {itItem.text && (
                                      <p
                                        className="discord-main-subtitle"
                                        style={{ marginRight: "5px" }}
                                      >
                                        {itItem.text}
                                      </p>
                                    )}
                                    <a
                                      className="discord-main-sublink"
                                      href={itItem.link?.link}
                                      target="_blank"
                                      rel="noreferrer"
                                      style={{ marginTop: "4px" }}
                                    >
                                      {itItem.link?.title}
                                    </a>
                                  </React.Fragment>
                                )
                              }
                            )}
                          </div>
                        )}
                        {it.text && <p style={{ color: "#9e9e9e" }}>{it.text}</p>}
                      </div>
                    )
                  })}
                </div>
              )
            })}
            <p style={{ marginTop: "10px" }}>Links</p>
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

export default MeCard
