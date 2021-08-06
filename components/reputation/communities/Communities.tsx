import React from "react"
import config from "../../../static/config.json"
import _ from "lodash"
import Image from "next/image"

const Communities = () => {
  const thisPage = _.cloneDeep(config.reputation.communities)

  return (
    <div className="communities-container">
      <div className="partnered-bar">
        <p>{thisPage.partnerBar.text}</p>
        {/* <a href={thisPage.partnerBar.link.href} target="_blank" rel="noreferrer">
          {thisPage.partnerBar.link.name}
        </a> */}
      </div>
      <div className="communities-data-container">
        {thisPage.data.map((item: any, index: number) => {
          return (
            <a key={index} href={item.link} target="_blank" rel="noreferrer">
              <Image width="400" height="80" src={item.img_src} alt={`communities-logo-${index}`} />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Communities
