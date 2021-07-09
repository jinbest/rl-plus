import React from "react"
import config from "../../../static/config.json"
import { RankHomeTrackerDataParam } from "../../../models/rank-stats-params"
import _ from "lodash"
import { useRouter } from "next/router"
import Image from "next/image"

const RankHomeTracker = () => {
  const thisData = _.cloneDeep(config.rankStats.home)
  const router = useRouter()

  return (
    <div className="rank-home-tracker">
      <div style={{ marginBottom: "10px" }}>
        <div className="flex align-center" style={{ marginLeft: "5px" }}>
          <div className="rank-stats-tracker-logo">
            <Image width="25" height="30" src={thisData.tracker.logo} alt="rank-home-logo" />
          </div>

          <h2 className="rank-stats-tracker-title">{thisData.tracker.title}</h2>
        </div>
        <button
          type="button"
          className="view-full-stats-btn"
          onClick={() => {
            router.push("/rank-live-tracker")
          }}
        >
          View Full Stats
        </button>
      </div>
      <div>
        {thisData.tracker.data.map((item: RankHomeTrackerDataParam, index: number) => {
          return (
            <div
              key={index}
              className="flex"
              style={{ width: "175px", minWidth: "130px", margin: "auto" }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Image width="40" height="40" src={item.img_src} alt={`tracker-diamond-${index}`} />
                <p style={{ fontSize: "12px", color: "#00DE3E" }} className="flex align-center">
                  {item.divUp}
                  <span>
                    <div style={{ marginLeft: "5px" }}>
                      <Image
                        width="8"
                        height="5"
                        src="/img/rank-stats/home/arrow-green-up.png"
                        alt="tracker-div-up"
                      />
                    </div>
                  </span>
                </p>
                <p style={{ fontSize: "12px", color: "#BE0000" }} className="flex align-center">
                  {item.divDown}
                  <span>
                    <div style={{ marginLeft: "5px" }}>
                      <Image
                        width="8"
                        height="5"
                        src="/img/rank-stats/home/arrow-red-down.png"
                        alt="tracker-div-down"
                      />
                    </div>
                  </span>
                </p>
              </div>
              <div>
                <h3 className="rank-tracker-child-data-title">{item.title}</h3>
                <p className="rank-tracker-child-data-text">{item.subTitle}</p>
                <p className="rank-tracker-child-data-text">
                  <span style={{ color: "#9E9E9E", marginRight: "5px" }}>Rating</span>
                  <span>{item.rating}</span>
                </p>
                <p className="rank-tracker-child-data-analysis">{item.analysis}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RankHomeTracker
