import React, { useState, useEffect } from "react"
import { Tab, TabProps } from "semantic-ui-react"
import { getWidth } from "../../service/helper"
import LeaderBoard from "../../components/reputation/leader-board/LeaderBoard"
import UserSearch from "../../components/reputation/user-search/UserSearch"
import Communities from "../../components/reputation/communities/Communities"
import ReportScammer from "../../components/reputation/report-scammer/ReportScammer"
import { useRouter } from "next/router"
import { TabRouters } from "../../routes"
import _ from "lodash"

type Props = {
  tabIndex: number
}

const Reputation = ({ tabIndex }: Props) => {
  const router = useRouter()
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

  const handleTabChange = ({ activeIndex }: TabProps) => {
    const tab = _.findIndex(TabRouters, (o) => o.index === activeIndex)
    if (tab > -1) {
      router.push(TabRouters[tab].link)
    }
  }

  return (
    <div className="reputation">
      <div className="empty-board"></div>
      <div className="custom-semi-tab">
        <Tab
          menu={{ secondary: true, pointing: true, fluid: true, vertical: mobile }}
          panes={panes}
          activeIndex={tabIndex}
          onTabChange={(e, { activeIndex }) => handleTabChange({ activeIndex })}
        />
      </div>
    </div>
  )
}

export default Reputation
