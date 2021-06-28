import React, { useState } from "react"
import { MainDataParams } from "../../../models/reputation-params"
import CustomSearchBar from "../../CustomSearchBar"
import SummaryData from "./SummaryData"
import MainData from "./MainData"
import config from "../../../static/config.json"
import _ from "lodash"
// import apiConfig from "../../../config/config"
// import AuthenticatedAPIClient from "../../../service/authenticated-api-client"

// const authenticatedApiClient = AuthenticatedAPIClient.getInstance()

const UserSearch = () => {
  const thisPage = _.cloneDeep(config.reputation)
  const cloneData = _.cloneDeep(thisPage.userSearch.mainData)

  const [summaryDataVisible, setSummaryDataVisible] = useState(true)
  const [userSearchKey, setUserSearchKey] = useState("")
  const [mainData, setMainData] = useState<MainDataParams>(cloneData)

  // useEffect(() => {
  //   const token = window.localStorage.getItem("token") || ""
  //   fetchAllData(token)
  // }, [])

  // const fetchAllData = async (token: string) => {
  //   const res = await authenticatedApiClient.post<any>(apiConfig.NEWS_ALL, token)
  //   console.log("NEWS_ALL", res)
  // }

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
