import React, { useState, useEffect } from "react"
import { Tab, TabProps } from "semantic-ui-react"
import { getWidth } from "../../service/helper"
import { useRouter } from "next/router"
import { RankStatsTabRouters } from "../../routes"
import RankHome from "../../components/rank-stats/home/RankHome"
import RankSearch from "../../components/rank-stats/rank-search/RankSearch"
import LiveTracker from "../../components/rank-stats/live-tracker/LiveTracker"
import RankLeaderBoard from "../../components/rank-stats/rank-leaderboard/RankLeaderboard"
import _ from "lodash"

type Props = {
  tabIndex: number
}

const RankStats = ({ tabIndex }: Props) => {
  const router = useRouter()
  const [mobile, setMobile] = useState(false)

  const panes = [
    {
      menuItem: "HOME",
      render: () => (
        <Tab.Pane attached={false}>
          <RankHome />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "RANK SEARCH",
      render: () => (
        <Tab.Pane attached={false}>
          <RankSearch />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "LEADERBOARDS",
      render: () => (
        <Tab.Pane attached={false}>
          <RankLeaderBoard />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "LIVE TRACKER",
      render: () => (
        <Tab.Pane attached={false}>
          <LiveTracker />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "YOUR STATS",
      render: () => <Tab.Pane attached={false}>YOUR STATS</Tab.Pane>,
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
    const tab = _.findIndex(RankStatsTabRouters, (o) => o.index === activeIndex)
    if (tab > -1) {
      router.push(RankStatsTabRouters[tab].link)
    }
  }

  return (
    <div className="rank-stats">
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

export default RankStats
