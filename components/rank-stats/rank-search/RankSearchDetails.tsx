import _, { isEmpty } from "lodash"
import React, { useEffect, useState } from "react"
import {
  RankSelectKeyParams,
  RankSearchDataParam,
  RankSearchChildDataParam,
  RankSearchChildLifeTimeStatsParam,
} from "../../../models/rank-stats-params"
import config from "../../../static/config.json"

type filterParam = "s1" | "s2" | "s3"
type PageNameParam = "rankSearch" | "liveTracker"

type Props = {
  type: RankSelectKeyParams
  searchKey: string
  pageName: PageNameParam
}

const RankSearchDetails = ({ type, searchKey, pageName }: Props) => {
  const thisPage =
    pageName === ("rankSearch" as PageNameParam)
      ? config.rankStats.rankSearch
      : config.rankStats.liveTracker

  const [data, setData] = useState<RankSearchDataParam>({} as RankSearchDataParam)
  const [rankFilter, setRankFilter] = useState<filterParam>("s3")

  useEffect(() => {
    if (!isEmpty(thisPage[type])) {
      const cntAllData = _.cloneDeep(thisPage[type])
      if (!searchKey) {
        setData(cntAllData)
      } else {
        const temp: RankSearchDataParam = {
          title: cntAllData.title,
          subTitle: cntAllData.subTitle,
          logo: cntAllData.logo,
          data: [],
          lifetimeStats: cntAllData.lifetimeStats,
        }
        cntAllData.data.forEach((item: RankSearchChildDataParam) => {
          if (item.playlist.main.toLowerCase().includes(searchKey.toLowerCase())) {
            temp.data.push(item)
          } else if (item.playlist.sub.toLowerCase().includes(searchKey.toLowerCase())) {
            temp.data.push(item)
          } else if (item.rating.sub.toLowerCase().includes(searchKey.toLowerCase())) {
            temp.data.push(item)
          } else if (item.rating.total.toString().toLowerCase().includes(searchKey.toLowerCase())) {
            temp.data.push(item)
          } else if (item.divUp.toString().toLowerCase().includes(searchKey.toLowerCase())) {
            temp.data.push(item)
          } else if (item.divDown.toString().toLowerCase().includes(searchKey.toLowerCase())) {
            temp.data.push(item)
          } else if (item.matches.toString().toLowerCase().includes(searchKey.toLowerCase())) {
            temp.data.push(item)
          }
        })
        setData(temp)
      }
    }
  }, [type])

  useEffect(() => {
    if (!isEmpty(data)) {
      console.log("rankSearch-Details", data, searchKey)
    }
  }, [data])

  return (
    <>
      {!isEmpty(data) && (
        <div className="rank-search-details-container">
          <div className="details-main-table-container">
            <div className="details-table">
              <div className="details-table-title">
                <img src={data.logo} alt="rank-search-details-logo" />
                <p>{data.title}</p>
              </div>
              <div className="details-table-subtitle">
                <p>{data.subTitle}</p>
                <div className="rank-stats-filter">
                  <button
                    onClick={() => {
                      setRankFilter("s3")
                    }}
                    style={{ color: rankFilter === "s3" ? "white" : "" }}
                  >
                    S3
                  </button>
                  <button
                    onClick={() => {
                      setRankFilter("s2")
                    }}
                    style={{ color: rankFilter === "s2" ? "white" : "" }}
                  >
                    S2
                  </button>
                  <button
                    onClick={() => {
                      setRankFilter("s1")
                    }}
                    style={{ color: rankFilter === "s1" ? "white" : "" }}
                  >
                    S1
                  </button>
                  <img src="img/rank-stats/home/arrow-down.png" alt="arrow-down-filter" />
                </div>
              </div>
              <table>
                <tbody>
                  <tr style={{ borderBottom: "2px solid #3e3e3e" }}>
                    <th className="play-list-rank">
                      <p style={{ marginLeft: "5px" }}>Playlist / Rank</p>
                    </th>
                    <th className="details-rating">Rating</th>
                    <th className="details-div-up">Div Up</th>
                    <th className="details-div-down">Div Down</th>
                    <th className="details-matches">Matches</th>
                  </tr>
                  {data.data.map((item: RankSearchChildDataParam, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="play-list-rank">
                          <div className="flex">
                            <img src={item.playlist.logo} alt="details-rank-logo" />
                            <div>
                              <p className="main-text">{item.playlist.main}</p>
                              <p className="sub-text" style={{ color: "#9E9E9E" }}>
                                {item.playlist.sub}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="details-rating">
                          <p className="main-text">{item.rating.total}</p>
                          <p className="sub-text" style={{ color: "#FAC800" }}>
                            {item.rating.sub}
                          </p>
                        </td>
                        <td className="details-div-up" style={{ color: "#00DE3E" }}>
                          <p className="main-text">
                            {item.divUp}
                            <span>
                              <img
                                src="img/rank-stats/home/arrow-green-up.png"
                                alt="arrow-green-up"
                              />
                            </span>
                          </p>
                        </td>
                        <td className="details-div-down" style={{ color: "#BE0000" }}>
                          <p className="main-text">
                            {item.divDown}
                            <span>
                              <img
                                src="img/rank-stats/home/arrow-red-down.png"
                                alt="arrow-red-down"
                              />
                            </span>
                          </p>
                        </td>
                        <td className="details-matches">
                          <p className="main-text">{item.matches}</p>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="history-details-lifetime-stats">history-lifetime-stats-details</div>
          </div>

          {pageName === ("rankSearch" as PageNameParam) && (
            <div className="details-lifetime-stats">
              <div className="lifetime-stats-title">
                <p>Lifetime Stats</p>
              </div>
              <div className="flex flex-wrap" style={{ width: "100%", padding: "15px" }}>
                {data.lifetimeStats.map(
                  (item: RankSearchChildLifeTimeStatsParam, index: number) => {
                    return (
                      <div style={{ width: "49%", marginBottom: "10px" }} key={index}>
                        <p className="main-text" style={{ color: "#9E9E9E" }}>
                          {item.label}
                        </p>
                        <p className="larger-text">{item.total}</p>
                        <p className="sub-text" style={{ color: "#FAC800" }}>
                          {item.sub}
                        </p>
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default RankSearchDetails
