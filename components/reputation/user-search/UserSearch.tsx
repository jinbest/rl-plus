import React, { useState } from "react"
import { MainDataParams, MainDataChildParams } from "../../../models/reputation-params"
import CustomSearchBar from "../../CustomSearchBar"
import SummaryData from "./SummaryData"
import MainData from "./MainData"
import config from "../../../static/config.json"
import _ from "lodash"
import { RankSelectTypeParam } from "../../../models/rank-stats-params"
import apiConfig from "../../../config/config"
import ApiClient from "../../../service/api-clients"

const apiClient = ApiClient.getInstance()

const UserSearch = () => {
  const thisPage = _.cloneDeep(config.reputation)
  const cloneData = _.cloneDeep(thisPage.userSearch.mainData)

  const [summaryDataVisible, setSummaryDataVisible] = useState(true)
  const [userSearchKey, setUserSearchKey] = useState("")
  const [mainData, setMainData] = useState<MainDataParams>(cloneData)
  const [type, setType] = useState<RankSelectTypeParam>("Steam")

  const handleUserSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUserSearchKey(e.target.value)
  }

  const handleUserSearchIconClick = () => {
    console.log("type-input", type, userSearchKey)
    handleSearch()
    // if (!userSearchKey) {
    //   setMainData(cloneData)
    // } else {
    //   const cntMainData: MainDataParams = {
    //     title: cloneData.title,
    //     statistic: cloneData.statistic,
    //     data: [],
    //   }
    //   for (let i = 0; i < cloneData.data.length; i++) {
    //     if (cloneData.data[i].feedback.toLowerCase().includes(userSearchKey.toLowerCase())) {
    //       cntMainData.data.push(cloneData.data[i])
    //     } else if (cloneData.data[i].creator.toLowerCase().includes(userSearchKey.toLowerCase())) {
    //       cntMainData.data.push(cloneData.data[i])
    //     } else if (cloneData.data[i].date.toLowerCase().includes(userSearchKey.toLowerCase())) {
    //       cntMainData.data.push(cloneData.data[i])
    //     }
    //   }
    //   setMainData(cntMainData)
    // }
    // setSummaryDataVisible(false)
  }

  const handleSearch = async () => {
    /* sample playerID
      type === "Steam":    playerID = "u"
      type === "Discord":  playerID = "675169735872217119"
      type === "Xbox":     playerID = "V"
    */

    const param = {
      type: type,
      playerID: userSearchKey,
      page: 0,
      limit: 5,
    }

    const tmpMainData = {
      title: "Discord Reputation for TestUser#0001 (000000000000000001)",
      statistic: "+1932/-0",
      data: [] as MainDataChildParams[],
    }

    try {
      const result = await apiClient.post<any>(apiConfig.USER_SEARCH, param)

      if (result.data.success) {
        if (type === "Steam") {
          result.data.data.forEach((item: any) => {
            tmpMainData.data.push({
              feedback: item.avatarhash,
              creator: item.personaname,
              date: "2021-06-30 23:59:59 UTC",
              score: item.personastate,
            })
          })
        } else if (type === "Discord") {
          result.data.data.forEach((item: any) => {
            tmpMainData.data.push({
              feedback: item.avatar,
              creator: item.username,
              date: "2021-06-30 23:59:59 UTC",
              score: item.public_flags,
            })
          })
        }
      }
      setSummaryDataVisible(false)
    } catch (error) {
      // EMPTY
    } finally {
      setMainData(tmpMainData)
    }
  }

  return (
    <div>
      <CustomSearchBar
        value={userSearchKey}
        placeholder={thisPage.userSearch.searchKey}
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleUserSearchChange(e)
        }}
        handleIconClick={handleUserSearchIconClick}
        dropdown
        setType={setType}
      />
      <div className="user-search-data-container">
        {summaryDataVisible ? (
          <div className="summary-container">
            <SummaryData data={thisPage.userSearch.summaryData} />
          </div>
        ) : (
          <div className="main-data-container">
            <MainData data={mainData} />
          </div>
        )}
      </div>
    </div>
  )
}

export default UserSearch
