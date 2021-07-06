import { MenuParam } from "../models/rank-stats-params"

const clientID = "691377113408-gmk00d2v8hm8t738jb9q1cpennjd66se.apps.googleusercontent.com"

const rankSelect = [
  {
    label: "Epic Games",
    placeholder: "Enter Epic Games Username",
    logo: "/img/rank-stats/home/epic.svg",
    key: "epic",
  },
  {
    label: "Steam",
    placeholder: "Enter Steam Username",
    logo: "/img/rank-stats/home/steam.svg",
    key: "steam",
  },
  {
    label: "Xbox Live",
    placeholder: "Enter Xbox Live Username",
    logo: "/img/rank-stats/home/xbox.svg",
    key: "xbox",
  },
  {
    label: "Playstation Network",
    placeholder: "Enter Playstation Network Username",
    logo: "/img/rank-stats/home/playstation.svg",
    key: "playstation",
  },
  {
    label: "Nintendo Switch",
    placeholder: "Enter Nintendo Switch Username",
    logo: "/img/rank-stats/home/nintendo.svg",
    key: "nintendo",
  },
]

const overAllOptions = [
  {
    label: "Wins",
    code: "wins",
  },
  {
    label: "Goals",
    code: "goals",
  },
  {
    label: "Saves",
    code: "saves",
  },
  {
    label: "Shots",
    code: "shots",
  },
  {
    label: "Assists",
    code: "assists",
  },
  {
    label: "MVPs",
    code: "mvps",
  },
  {
    label: "Goal Shot Ratio",
    code: "goalShotRatio",
  },
] as MenuParam[]

const ratingOptions = {
  ranked: [
    {
      label: "Ranked 1v1 (Duel)",
      code: "ranked1v1",
    },
    {
      label: "Ranked 2v2 (Doubles)",
      code: "ranked2v2",
    },
    {
      label: "Ranked 3v3 (Standard)",
      code: "ranked3v3",
    },
    {
      label: "Tournament Matches",
      code: "tournament",
    },
  ] as MenuParam[],
  unranked: [
    {
      label: "Casual",
      code: "casual",
    },
    {
      label: "Rumble",
      code: "rumble",
    },
    {
      label: "Hoops",
      code: "hoops",
    },
    {
      label: "Dropshot",
      code: "dropshot",
    },
    {
      label: "Snowday",
      code: "snowday",
    },
  ] as MenuParam[],
}

export { clientID, rankSelect, overAllOptions, ratingOptions }