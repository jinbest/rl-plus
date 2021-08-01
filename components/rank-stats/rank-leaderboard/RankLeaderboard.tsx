import React, { useState, useEffect } from "react"
import { overAllOptions, ratingOptions } from "../../../static/mock-data"
import {
  Filter1Params,
  Filter2Param,
  OverallOptionParam,
  RatingOptionParam,
  MenuParam,
  Filter1OptionsParam,
  RankSelectKeyParams,
  RankLeaderBoardParam,
  RankLeaderBoardDataParam,
} from "../../../models/rank-stats-params"
import config from "../../../static/config.json"
import _, { isEmpty } from "lodash"
import Image from "next/image"
import useOnclickOutside from "react-cool-onclickoutside"

const RankLeaderBoard = () => {
  const thisPage = _.cloneDeep(config.rankStats.rankLeaderBoard) as RankLeaderBoardParam[]

  const [filter1, setFilter1] = useState<Filter1Params>("overall")
  const [filter2, setFilter2] = useState<Filter2Param>("allTime")
  const [filter1Option, setFilter1Option] = useState<Filter1OptionsParam[]>(
    [] as Filter1OptionsParam[]
  )
  const [selectFilter, setSelectFilter] = useState<MenuParam>({} as MenuParam)
  const [selectorView, setSelectorView] = useState(false)
  const [overAllOption, setOverAllOption] = useState<OverallOptionParam | RatingOptionParam>("wins")
  const [ratingOption, setRatingOption] = useState<OverallOptionParam | RatingOptionParam>(
    "ranked1v1"
  )
  const [rankOption, setRankOption] = useState<RankSelectKeyParams | "">("")
  const [tableData, setTableData] = useState<RankLeaderBoardParam>({} as RankLeaderBoardParam)

  const ref = useOnclickOutside(() => {
    setSelectorView(false)
  })

  useEffect(() => {
    setSelectorView(false)
    if (filter1 === "overall") {
      setFilter1Option([
        {
          title: "",
          options: overAllOptions,
        },
      ])
      setOverAllOption("wins")
      const selectIndex = _.findIndex(overAllOptions, { code: "wins" })
      if (selectIndex > -1) {
        setSelectFilter(overAllOptions[selectIndex])
      }
    } else {
      setFilter1Option([
        {
          title: "Ranked",
          options: ratingOptions.ranked,
        },
        {
          title: "Unranked",
          options: ratingOptions.unranked,
        },
      ])
      setRatingOption("ranked1v1")
      const selectIndex = _.findIndex(ratingOptions.ranked, { code: "ranked1v1" })
      if (selectIndex > -1) {
        setSelectFilter(ratingOptions.ranked[selectIndex])
      }
    }
  }, [filter1])

  useEffect(() => {
    const optionTypeIndex = _.findIndex(thisPage, { optionType: ratingOption })
    if (optionTypeIndex > -1) {
      const tempData = _.cloneDeep(thisPage[optionTypeIndex])

      if (!rankOption) {
        setTableData(_.cloneDeep(thisPage[optionTypeIndex]))
      } else {
        const newData = {
          optionType: tempData.optionType,
          title: tempData.title,
          data: _.filter(tempData.data, { type: rankOption }),
        }
        setTableData(newData)
      }
    } else {
      setTableData({} as RankLeaderBoardParam)
    }
  }, [ratingOption, rankOption])

  useEffect(() => {
    console.log("overAllOption", overAllOption)
  }, [overAllOption])

  return (
    <div className="rank-leader-board-container">
      <div className="rank-leader-board-table">
        <div className="filter1-container">
          <button
            onClick={() => {
              setFilter1("overall")
            }}
            type="button"
            style={{ borderBottom: filter1 === "overall" ? "2px solid #FAC800" : "" }}
          >
            Overall
          </button>
          <button
            onClick={() => {
              setFilter1("rating")
            }}
            type="button"
            style={{ borderBottom: filter1 === "rating" ? "2px solid #FAC800" : "" }}
          >
            Skill Rating
          </button>
        </div>
        <div className="filter2-container">
          <div className="flex justify-between flex-wrap">
            <div className="filter1-selector" style={{ margin: "5px" }} ref={ref}>
              <p>Stats</p>
              <div
                className="filter1-selector-button"
                onClick={() => {
                  setSelectorView(!selectorView)
                }}
              >
                <p>{selectFilter.label}</p>
                <Image
                  width="10"
                  height="6"
                  src="/img/rank-stats/home/arrow-down.png"
                  alt="arrow-down-selector"
                />
              </div>
              {selectorView && (
                <div
                  className="filter1-selector-option"
                  style={{ width: `${filter1Option.length * 100}%` }}
                >
                  {filter1Option.map((item: Filter1OptionsParam, index: number) => {
                    return (
                      <div key={index}>
                        {item.title && (
                          <p style={{ color: "#FAC800", background: "#0F0F10" }}>{item.title}</p>
                        )}
                        {item.options.map((it: MenuParam, idx: number) => {
                          return (
                            <p
                              key={`${index}-${idx}`}
                              style={{ background: idx % 2 ? "#0F0F10" : "#0C0C0C" }}
                              onClick={() => {
                                setSelectFilter(it)
                                setSelectorView(false)
                                if (filter1 === "overall") {
                                  setOverAllOption(it.code)
                                } else {
                                  setRatingOption(it.code)
                                }
                              }}
                            >
                              {it.label}
                            </p>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="filter2-selector" style={{ margin: "5px" }}>
              <button
                onClick={() => {
                  setFilter2("daily")
                }}
                type="button"
                style={{ color: filter2 === "daily" ? "white" : "" }}
              >
                Daily
              </button>
              <button
                onClick={() => {
                  setFilter2("weekly")
                }}
                type="button"
                style={{ color: filter2 === "weekly" ? "white" : "" }}
              >
                Weekly
              </button>
              <button
                onClick={() => {
                  setFilter2("allTime")
                }}
                type="button"
                style={{ color: filter2 === "allTime" ? "white" : "" }}
              >
                All-Time
              </button>
            </div>
          </div>
          <div className="all-platforms" style={{ margin: "5px" }}>
            <button
              onClick={() => {
                setRankOption("")
              }}
              type="button"
            >
              <span>
                <p>All Platforms</p>
              </span>
            </button>
            <button
              onClick={() => {
                setRankOption("epic")
              }}
              type="button"
            >
              {rankOption === "epic" ? (
                <span>
                  <div style={{ marginTop: "4px" }}>
                    <Image
                      width="15"
                      height="17"
                      src="/img/rank-stats/home/epic.svg"
                      alt="epic-button"
                    />
                  </div>
                </span>
              ) : (
                <span>
                  <div style={{ marginTop: "4px" }}>
                    <Image
                      width="15"
                      height="17"
                      src="/img/rank-stats/rank-svg/grey-epic.svg"
                      alt="epic-button"
                    />
                  </div>
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setRankOption("steam")
              }}
              type="button"
            >
              {rankOption === "steam" ? (
                <span>
                  <div style={{ marginTop: "3px" }}>
                    <Image
                      width="15"
                      height="15"
                      src="/img/rank-stats/home/steam.svg"
                      alt="steam-button"
                    />
                  </div>
                </span>
              ) : (
                <span>
                  <div style={{ marginTop: "3px" }}>
                    <Image
                      width="15"
                      height="15"
                      src="/img/rank-stats/rank-svg/grey-steam.svg"
                      alt="steam-button"
                    />
                  </div>
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setRankOption("xbox")
              }}
              type="button"
            >
              {rankOption === "xbox" ? (
                <span>
                  <div style={{ marginTop: "3px" }}>
                    <Image
                      width="15"
                      height="15"
                      src="/img/rank-stats/home/xbox.svg"
                      alt="xbox-button"
                    />
                  </div>
                </span>
              ) : (
                <span>
                  <div style={{ marginTop: "3px" }}>
                    <Image
                      width="15"
                      height="15"
                      src="/img/rank-stats/rank-svg/grey-xbox.svg"
                      alt="xbox-button"
                    />
                  </div>
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setRankOption("playstation")
              }}
              type="button"
            >
              {rankOption === "playstation" ? (
                <span>
                  <div style={{ marginTop: "3px" }}>
                    <Image
                      width="15"
                      height="15"
                      src="/img/rank-stats/home/playstation.svg"
                      alt="playstation-button"
                    />
                  </div>
                </span>
              ) : (
                <span>
                  <div style={{ marginTop: "3px" }}>
                    <Image
                      width="15"
                      height="15"
                      src="/img/rank-stats/rank-svg/grey-playstation.svg"
                      alt="playstation-button"
                    />
                  </div>
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setRankOption("nintendo")
              }}
              type="button"
            >
              {rankOption === "nintendo" ? (
                <span>
                  <div style={{ marginTop: "3px" }}>
                    <Image
                      width="15"
                      height="15"
                      src="/img/rank-stats/home/nintendo.svg"
                      alt="nintendo-button"
                    />
                  </div>
                </span>
              ) : (
                <span>
                  <div style={{ marginTop: "3px" }}>
                    <Image
                      width="15"
                      height="15"
                      src="/img/rank-stats/rank-svg/grey-nintendo.svg"
                      alt="nintendo-button"
                    />
                  </div>
                </span>
              )}
            </button>
          </div>
        </div>
        {!isEmpty(tableData) && (
          <>
            <div className="rank-leader-table-title">
              <h1>{tableData.title}</h1>
            </div>
            <table>
              <tbody>
                <tr style={{ borderBottom: "2px solid #3e3e3e" }}>
                  <th className="leader-rank">Rank</th>
                  <th className="leader-player">Player</th>
                  <th className="leader-rating">Rating</th>
                  <th className="leader-played">Games Played</th>
                </tr>
                {tableData.data.map((item: RankLeaderBoardDataParam, index: number) => {
                  return (
                    <tr
                      key={index}
                      style={{ background: index % 2 === 0 ? "rgba(23, 23, 23, 0.75)" : "" }}
                    >
                      <td className="leader-rank">
                        <p>{item.rank}</p>
                      </td>
                      <td className="leader-player">
                        <p>
                          <span>
                            <div style={{ marginTop: "3px", marginRight: "7px" }}>
                              <Image
                                width="15"
                                height="15"
                                src={item.logo}
                                alt={`rank-logo-${index}`}
                              />
                            </div>
                          </span>
                          <span>{item.player}</span>
                        </p>
                      </td>
                      <td className="leader-rating">
                        <p>{item.rating.toLocaleString()}</p>
                      </td>
                      <td className="leader-played">
                        <p>{item.played.toLocaleString()}</p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
      <div className="rank-leader-board-sticky" />
    </div>
  )
}

export default RankLeaderBoard
