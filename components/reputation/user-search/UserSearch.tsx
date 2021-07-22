import React, { useState, useEffect } from "react"
import { MainDataParams } from "../../../models/reputation-params"
import CustomSearchBar from "../../CustomSearchBar"
import SummaryData from "./SummaryData"
import MainData from "./MainData"
import config from "../../../static/config.json"
import _ from "lodash"

const UserSearch = () => {
  const thisPage = _.cloneDeep(config.reputation)
  const cloneData = _.cloneDeep(thisPage.userSearch.mainData)

  const [summaryDataVisible, setSummaryDataVisible] = useState(true)
  const [userSearchKey, setUserSearchKey] = useState("")
  const [mainData, setMainData] = useState<MainDataParams>(cloneData)

  const handleUserSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUserSearchKey(e.target.value)
  }

  const handleUserSearchIconClick = () => {
    if (!userSearchKey) {
      setMainData(cloneData)
    } else {
      const cntMainData: MainDataParams = {
        title: cloneData.title,
        statistic: cloneData.statistic,
        data: [],
      }
      for (let i = 0; i < cloneData.data.length; i++) {
        if (cloneData.data[i].feedback.toLowerCase().includes(userSearchKey.toLowerCase())) {
          cntMainData.data.push(cloneData.data[i])
        } else if (cloneData.data[i].creator.toLowerCase().includes(userSearchKey.toLowerCase())) {
          cntMainData.data.push(cloneData.data[i])
        } else if (cloneData.data[i].date.toLowerCase().includes(userSearchKey.toLowerCase())) {
          cntMainData.data.push(cloneData.data[i])
        }
      }
      setMainData(cntMainData)
    }
    setSummaryDataVisible(false)
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
