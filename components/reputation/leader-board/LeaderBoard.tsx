import React, { useState } from "react"
import RepuLeaderBoardCard from "./RepuLeaderBoardCard"
import CustomSearchBar from "../../CustomSearchBar"
import { ReputationLeaderBoardCardParam } from "../../../models/reputation-params"
import config from "../../../static/config.json"
import _ from "lodash"

const LeaderBoard = () => {
  const thisPage = _.cloneDeep(config.reputation)
  const repuFieldData = _.cloneDeep(
    thisPage.repuLeaderBoard.fieldData
  ) as ReputationLeaderBoardCardParam
  const repuMainData = _.cloneDeep(
    thisPage.repuLeaderBoard.childData
  ) as ReputationLeaderBoardCardParam[]

  const [repuFilter, setRepuFilter] = useState("allTime")
  const [repuData, setRepuData] = useState<ReputationLeaderBoardCardParam[]>(repuMainData)
  const [repuSearchKey, setRepuSearchKey] = useState("")

  const handleRepuSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setRepuSearchKey(e.target.value)
  }

  const handleRepuSearchIconClick = () => {
    if (!repuSearchKey) {
      setRepuData(repuMainData)
    } else {
      const cntRepuData = [] as ReputationLeaderBoardCardParam[]
      for (let i = 0; i < repuMainData.length; i++) {
        if (repuMainData[i].rank.toString().includes(repuSearchKey)) {
          cntRepuData.push(repuMainData[i])
        } else if (repuMainData[i].name.toLowerCase().includes(repuSearchKey.toLowerCase())) {
          cntRepuData.push(repuMainData[i])
        } else if (
          repuMainData[i].discriminator.toLowerCase().includes(repuSearchKey.toLowerCase())
        ) {
          cntRepuData.push(repuMainData[i])
        }
      }
      setRepuData(cntRepuData)
    }
  }

  return (
    <div className="reputation-leaderboard-container">
      <RepuLeaderBoardCard data={repuFieldData} />
      <div className="reputation-filter-container">
        <div className="filter-search">
          <CustomSearchBar
            value={repuSearchKey}
            placeholder="Search by DiscordID"
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleRepuSearchChange(e)
            }}
            handleIconClick={handleRepuSearchIconClick}
          />
        </div>
        <div className="filter-filter">
          <button
            onClick={() => {
              setRepuFilter("daily")
            }}
            style={{ color: repuFilter === "daily" ? "white" : "" }}
          >
            Daily
          </button>
          <button
            onClick={() => {
              setRepuFilter("weekly")
            }}
            style={{ color: repuFilter === "weekly" ? "white" : "" }}
          >
            Weekly
          </button>
          <button
            onClick={() => {
              setRepuFilter("allTime")
            }}
            style={{ color: repuFilter === "allTime" ? "white" : "" }}
          >
            All-Time
          </button>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <table>
          <tbody>
            {repuData.map((item: ReputationLeaderBoardCardParam, index: number) => {
              return (
                <tr className="reputation-leader-board-card" key={index}>
                  <td className="reputation-rank">
                    <p>{item.rank}</p>
                  </td>
                  <td className="reputation-name">
                    <p>{item.name}</p>
                  </td>
                  <td className="reputation-discriminator">
                    <p>{item.discriminator}</p>
                  </td>
                  <td className="reputation-reputation">
                    {typeof item.reputation === "string" ? (
                      <p>{item.reputation}</p>
                    ) : (
                      <p>
                        <span style={{ color: "#00DE3E" }}>{`+${item.reputation.total}`}</span>
                        <span>{" / "}</span>
                        <span
                          style={{
                            color:
                              item.reputation.current < 0
                                ? "#BE0000"
                                : item.reputation.current > 0
                                ? "#00DE3E"
                                : "",
                          }}
                        >
                          {item.reputation.current}
                        </span>
                      </p>
                    )}
                  </td>
                  <td className="reputation-link">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer">
                        View Profile
                      </a>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeaderBoard
