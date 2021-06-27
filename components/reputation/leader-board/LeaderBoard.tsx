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
      <div className="reputation-main-data-container">
        {repuData.map((item: ReputationLeaderBoardCardParam, index: number) => {
          return <RepuLeaderBoardCard data={item} key={index} />
        })}
      </div>
    </div>
  )
}

export default LeaderBoard
