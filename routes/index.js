import Homepage from "../views/homepage"
import Reputation from "../views/reputation"
import DiscordBot from "../views/discord-bot"
import RankStats from "../views/rank-stats"
import Trading from "../views/trading"

const pageRoutes = [
  {
    path: "/",
    name: "",
    component: () => <Homepage />,
    visible: true,
  },
  {
    path: "/reputation",
    name: "REPUTATION/SCAM LIST",
    component: () => <Reputation tabIndex={0} />,
    visible: true,
  },
  {
    path: "/leaderboard",
    name: "LEADERBOARD",
    component: () => <Reputation tabIndex={1} />,
    visible: false,
  },
  {
    path: "/communities",
    name: "COMMUNITIES",
    component: () => <Reputation tabIndex={2} />,
    visible: false,
  },
  {
    path: "/report-scammer",
    name: "REPORT SCAMMER",
    component: () => <Reputation tabIndex={3} />,
    visible: false,
  },
  {
    path: "/discord-bot",
    name: "DISCORD BOT",
    component: () => <DiscordBot />,
    visible: true,
  },
  {
    path: "/rank-stats",
    name: "RANK STATS",
    component: () => <RankStats />,
    visible: true,
  },
  {
    path: "/trading",
    name: "TRADING",
    component: () => <Trading />,
    visible: true,
  },
]

const TabRouters = [
  {
    index: 0,
    link: "/reputation",
  },
  {
    index: 1,
    link: "/leaderboard",
  },
  {
    index: 2,
    link: "/communities",
  },
  {
    index: 3,
    link: "/report-scammer",
  },
]

export { pageRoutes, TabRouters }
