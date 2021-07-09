import React from "react"
import {
  MenuListDataParam,
  VerifyCard1Param,
  MenuListDataContentWithLinkParam,
  GeneralLinkParam,
} from "../../models/discord-bot-params"
import { isEmpty } from "lodash"
import Image from "next/image"

type Props = {
  data: MenuListDataParam
}

const VerifyCard1 = ({ data }: Props) => {
  const thisData = (data.verifyCard1 ? data.verifyCard1 : {}) as VerifyCard1Param

  return (
    <div className="discord-card" style={{ width: "420px", minHeight: "inherit" }}>
      <div className="card-vertical-bar" style={{ minHeight: "inherit" }} />
      <div className="card-container" style={{ maxWidth: "100%" }}>
        {!isEmpty(thisData) && (
          <>
            <div className="flex justify-between">
              <div>
                {thisData.contentWithLink && (
                  <div className="flex flex-wrap align-center">
                    {thisData.contentWithLink.map(
                      (it: MenuListDataContentWithLinkParam, index: number) => {
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
                      }
                    )}
                  </div>
                )}
                <p className="card-child-content">{thisData.content}</p>
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
              </div>
              <div className="image-tag-container" style={{ width: "70px", height: "70px" }}>
                <Image
                  width="70"
                  height="70"
                  className="price-set-1-logo"
                  src={thisData.logo}
                  alt="verify-card-1-logo"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default VerifyCard1
