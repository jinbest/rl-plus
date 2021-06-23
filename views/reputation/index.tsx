import React, { useState, useEffect } from "react"
import { Tab } from "semantic-ui-react"
import { getWidth } from "../../service/helper"
import LeaderBoard from "../../components/reputation/leader-board/LeaderBoard"
import UserSearch from "../../components/reputation/user-search/UserSearch"
import Communities from "../../components/reputation/communities/Communities"
import ReportScammer from "../../components/reputation/report-scammer/ReportScammer"

const Reputation = () => {
  const [mobile, setMobile] = useState(false)

  const panes = [
    {
      menuItem: "USER SEARCH",
      render: () => (
        <Tab.Pane attached={false}>
          <UserSearch />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "REPUTATION LEADERBOARD",
      render: () => (
        <Tab.Pane attached={false}>
          <LeaderBoard />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "COMMUNITIES",
      render: () => (
        <Tab.Pane attached={false}>
          <Communities />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "REPORT A SCAMMER",
      render: () => (
        <Tab.Pane attached={false}>
          <ReportScammer />
        </Tab.Pane>
      ),
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
