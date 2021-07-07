import React from "react"
import config from "../../../static/config.json"
import { RankHomeTrackerDataParam } from "../../../models/rank-stats-params"
import _ from "lodash"
import { useRouter } from "next/router"

const RankHomeTracker = () => {
  const thisData = _.cloneDeep(config.rankStats.home)
  const router = useRouter()

  return (
    <div className="rank-home-tracker">
      <div style={{ marginBottom: "10px" }}>
        <div className="flex align-center" style={{ marginLeft: "5px" }}>
          <img
            className="rank-stats-tracker-logo"
            src={thisData.tracker.logo}
            alt="rank-home-logo"
          />
          <p className="rank-stats-tracker-title">{thisData.tracker.title}</p>
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
                <img src={item.img_src} alt={`tracker-diamond-${index}`} />
                <p style={{ fontSize: "12px", color: "#00DE3E" }} className="flex align-center">
                  {item.divUp}
                  <span>
                    <img
                      src="img/rank-stats/home/arrow-green-up.png"
                      style={{ marginLeft: "5px" }}
                      alt="tracker-div-up"
                    />
                  </span>
                </p>
                <p style={{ fontSize: "12px", color: "#BE0000" }} className="flex align-center">
                  {item.divDown}
                  <span>
                    <img
                      src="img/rank-stats/home/arrow-red-down.png"
                      style={{ marginLeft: "5px" }}
                      alt="tracker-div-down"
                    />
                  </span>
                </p>
              </div>
              <div>
                <p className="rank-tracker-child-data-title">{item.title}</p>
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
