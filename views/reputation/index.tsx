import React, { useState, useEffect, useCallback } from "react"
import { Tab } from "semantic-ui-react"
import { getWidth } from "../../service/helper"
import CustomSearchBar from "../../components/CustomSearchBar"
import config from "../../static/config.json"
import SummaryData from "../../components/reputation/user-search/SummaryData"
import MainData from "../../components/reputation/user-search/MainData"
import RepuLeaderBoardCard from "../../components/reputation/leader-board/RepuLeaderBoardCard"
import { MainDataParams } from "../../models/reputation-params"
import { ReputationLeaderBoardCardParam } from "../../models/reputation-params"
import _ from "lodash"

const Reputation = () => {
  const thisPage = config.reputation
  const cloneData = _.cloneDeep(thisPage.userSearch.mainData)
  const repuFieldData = _.cloneDeep(
    thisPage.repuLeaderBoard.fieldData
  ) as ReputationLeaderBoardCardParam
  const repuMainData = _.cloneDeep(
    thisPage.repuLeaderBoard.childData
  ) as ReputationLeaderBoardCardParam[]

  const [mobile, setMobile] = useState(false)
  const [summaryDataVisible, setSummaryDataVisible] = useState(true)
  const [userSearchKey, setUserSearchKey] = useState("")
  const [mainData, setMainData] = useState<MainDataParams>(cloneData)
  const [repuSearchKey, setRepuSearchKey] = useState("")
  const [repuFilter, setRepuFilter] = useState("allTime")
  const [repuData, setRepuData] = useState<ReputationLeaderBoardCardParam[]>(repuMainData)

  const handleUserSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUserSearchKey(e.target.value)
  }

  const handleRepuSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setRepuSearchKey(e.target.value)
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

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress, false)
    return () => {
      document.removeEventListener("keydown", onKeyPress, false)
    }
  })

  const onKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleUserSearchIconClick()
      }
    },
    [userSearchKey, mainData]
  )

  const panes = [
    {
      menuItem: "USER SERARCH",
      render: () => (
        <Tab.Pane attached={false}>
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
        </Tab.Pane>
      ),
    },
    {
      menuItem: "REPUTATION LEADERBOARD",
      render: () => (
        <Tab.Pane attached={false}>
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
                <p
                  onClick={() => {
                    setRepuFilter("daily")
                  }}
                  style={{ color: repuFilter === "daily" ? "white" : "" }}
                >
                  Daily
                </p>
                <p
                  onClick={() => {
                    setRepuFilter("weekly")
                  }}
                  style={{ color: repuFilter === "weekly" ? "white" : "" }}
                >
                  Weekly
                </p>
                <p
                  onClick={() => {
                    setRepuFilter("allTime")
                  }}
                  style={{ color: repuFilter === "allTime" ? "white" : "" }}
                >
                  All-Time
                </p>
              </div>
            </div>
            <div className="reputation-main-data-container">
              {repuData.map((item: ReputationLeaderBoardCardParam, index: number) => {
                return <RepuLeaderBoardCard data={item} key={index} />
              })}
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "COMMUNITIES",
      render: () => <Tab.Pane attached={false}>COMMUNITIES</Tab.Pane>,
    },
    {
      menuItem: "REPORT A SCAMMER",
      render: () => <Tab.Pane attached={false}>REPORT A SCAMMER</Tab.Pane>,
    },
  ]

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleResize = () => {
    if (getWidth() < 600) {
      setMobile(true)
    } else {
      setMobile(false)
    }
  }

  return (
    <div className="reputation">
      <div className="empty-board"></div>
      <div className="custom-semi-tab">
        <Tab
          menu={{ secondary: true, pointing: true, fluid: true, vertical: mobile }}
          panes={panes}
        />
      </div>
    </div>
  )
}

export default Reputation
