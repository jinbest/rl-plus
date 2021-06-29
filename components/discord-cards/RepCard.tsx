import { isEmpty } from "lodash"
import React from "react"
import {
  MenuListDataParam,
  RepCardParam,
  MenuListDataContentWithLinkParam,
  GeneralLinkParam,
} from "../../models/discord-bot-params"

type Props = {
  data: MenuListDataParam
}

const RepCard = ({ data }: Props) => {
  const thisData = (data.repCard ? data.repCard : {}) as RepCardParam

  return (
    <div className="discord-card" style={{ width: "420px" }}>
      <div className="card-vertical-bar" />
      <div className="card-container">
        {!isEmpty(thisData) && (
          <>
            <p>{thisData.title}</p>
            {thisData.content && <p className="card-child-content">{thisData.content}</p>}
            {thisData.contentWithLink && (
              <div className="flex flex-wrap align-center">
                {thisData.contentWithLink.map(
                  (it: MenuListDataContentWithLinkParam, index: number) => {
                    return (
                      <React.Fragment key={index}>
                        {it.text && (
                          <p className="discord-main-subtitle" style={{ marginRight: "5px" }}>
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
                  }
                )}
              </div>
            )}
            <p style={{ marginTop: "3px" }}>Overview</p>
            <div className="rep-card-overview">
              <p>{`Positive: +${thisData.overview.positive} | Negative: -${thisData.overview.negative}`}</p>
            </div>
            <p style={{ marginTop: "3px" }}>{`Last ${thisData.repsData.length} Reps`}</p>
            <div className="discord-code-pan">
              {thisData.repsData.map((item: string, index: number) => {
                return (
                  <pre key={index} className="rep-card-pre-code">
                    <code>
                      {item} <br />
                    </code>
                  </pre>
                )
              })}
            </div>
            <p>Unique Reputation</p>
            <p className="card-child-content">{thisData.uniqueRepu}</p>
            <p style={{ marginTop: "3px" }}>Ranking</p>
            <p className="card-child-content">{thisData.ranking}</p>
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

export default RepCard
