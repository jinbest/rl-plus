import Homepage from "../views/homepage"
import Reputation from "../views/reputation"
import DiscordBot from "../views/discord-bot"
import RankStats from "../views/rank-stats"
import Trading from "../views/trading"
import TermsOfService from "../views/terms-of-service"
import PrivacyPolicy from "../views/privacy-policy"

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
    path: "/rank-home",
    name: "RANK STATS",
    component: () => <RankStats tabIndex={0} />,
    visible: true,
  },
  {
    path: "/rank-search",
    name: "RANK SEARCH",
    component: () => <RankStats tabIndex={1} />,
    visible: false,
  },
  {
    path: "/rank-leader-boards",
    name: "RANK LEADERBOARDS",
    component: () => <RankStats tabIndex={2} />,
    visible: false,
  },
  {
    path: "/rank-live-tracker",
    name: "RANK TRACKER",
    component: () => <RankStats tabIndex={3} />,
    visible: false,
  },
  {
    path: "/your-stats",
    name: "YOUR STATS",
    component: () => <RankStats tabIndex={4} />,
    visible: false,
  },
  {
    path: "/trading",
    name: "TRADING",
    component: () => <Trading />,
    visible: true,
  },
  {
    path: "/terms-of-service",
    name: "TERMS OF SERVICE",
    component: () => <TermsOfService />,
    visible: false,
  },
  {
    path: "/privacy-policy",
    name: "PRIVACY POLICY",
    component: () => <PrivacyPolicy />,
    visible: false,
  },
]

const ReputationTabRouters = [
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

const RankStatsTabRouters = [
  {
    index: 0,
    link: "/rank-home",
  },
  {
    index: 1,
    link: "/rank-search",
  },
  {
    index: 2,
    link: "/rank-leader-boards",
  },
  {
    index: 3,
    link: "/rank-live-tracker",
  },
  {
    index: 4,
    link: "/your-stats",
  },
]

export { pageRoutes, ReputationTabRouters, RankStatsTabRouters }
