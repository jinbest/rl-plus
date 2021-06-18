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
  },
  {
    path: "/reputation",
    name: "REPUTATION/SCAM LIST",
    component: () => <Reputation />,
  },
  {
    path: "/discord-bot",
    name: "DISCORD BOT",
    component: () => <DiscordBot />,
  },
  {
    path: "/rank-stats",
    name: "RANK STATS",
    component: () => <RankStats />,
  },
  {
    path: "/trading",
    name: "TRADING",
    component: () => <Trading />,
  },
]

export { pageRoutes }
