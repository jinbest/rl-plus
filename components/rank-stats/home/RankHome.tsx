import React, { useState } from "react"
import { rankSelect } from "../../../static/mock-data"
import config from "../../../static/config.json"
import { LeaderBoardCardChildParams } from "../../../models/rank-stats-params"
import AddPlayerModal from "./AddPlayerModal"
import _ from "lodash"
import RankHomeTracker from "./RankHomeTrackerCard"
import Link from "next/link"
import Image from "next/image"

const RankHome = () => {
  const thisData = _.cloneDeep(config.rankStats.home)

  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(0)
  const [optionVisible, setOptionVisible] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [trackerVisible, setTrackerVisible] = useState(false)

  const handleSearch = (e: any) => {
    e.preventDefault()
    console.log(`${rankSelect[selected].label}: search`, search)
  }

  return (
    <div className="rank-stats-home-container">
      <div className="rank-search-tracker-container">
        <div className="rank-home-search">
          <h1 className="rank-title">RANK SEARCH</h1>
          <div className="rank-card-1">
            <div className="rank-search-select-form">
              <div className="rank-selector-container">
                <div
                  className="rank-search-selector"
                  onClick={() => {
                    setOptionVisible(!optionVisible)
                  }}
                >
                  <div style={{ marginLeft: "7px", marginTop: "2px" }}>
                    <Image
                      src={rankSelect[selected].logo}
                      alt={`${rankSelect[selected].key}-logo`}
                      width="24"
                      height="29"
                    />
                  </div>
                  <Image
                    width="10"
                    height="6"
                    src="/img/rank-stats/home/arrow-down.png"
                    alt="arrow-down"
                  />
                </div>
                {optionVisible && (
                  <div className="rank-select-options">
                    {rankSelect.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setSelected(index)
                            setOptionVisible(false)
                          }}
                        >
                          <Image
                            width="20"
                            height="20"
                            src={item.logo}
                            alt={`${index}-rank-select`}
                          />
                          <p>{item.label}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              <form
                onSubmit={(e) => {
                  handleSearch(e)
                }}
              >
                <input
                  value={search}
                  placeholder={rankSelect[selected].placeholder}
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                />
              </form>
            </div>
            <div className="rank-horizontal-liner">
              <div className="horizontal-line" />
              <p>or</p>
              <div className="horizontal-line" />
            </div>
            <div className="rank-card-1-buttons">
              <button type="button">YOUR STATS</button>
            </div>
          </div>
        </div>
        <div className="home-live-tracker">
          <h1 className="rank-title">LIVE TRACKER</h1>
          <div className="rank-card-1">
            {!trackerVisible ? (
              <div className="add-player-button">
                <button
                  type="button"
                  onClick={() => {
                    setOpenModal(true)
                    setTrackerVisible(true)
                  }}
                >
                  Add Player
                </button>
              </div>
            ) : (
              <RankHomeTracker />
            )}
          </div>
        </div>
        <AddPlayerModal open={openModal} setOpen={setOpenModal} />
      </div>
      <div className="rank-home-leaderboard">
        <h1 className="rank-title center">LEADERBOARDS</h1>
        <Link href="/rank-leader-boards">
          <a className="underline">View Full Leaderboard</a>
        </Link>
        <div style={{ marginTop: "10px" }}>
          {thisData.leaderBoards.map((item: any, index: number) => {
            return (
              <div className="rank-card-2" key={index}>
                <h2 className="rank-card-2-title" style={{ background: "rgba(23, 23, 23, 0.75)" }}>
                  {item.title}
                </h2>
                <table>
                  <tbody>
                    <tr style={{ borderBottom: "2px solid #3e3e3e" }}>
                      <th className="rank">#</th>
                      <th className="player">Player</th>
                      <th className="rating">Rating</th>
                    </tr>
                    {item.data.map((it: LeaderBoardCardChildParams, idx: number) => {
                      return (
                        <tr
                          key={`${index}-${idx}`}
                          style={{ background: idx % 2 === 0 ? "rgba(23, 23, 23, 0.75)" : "" }}
                        >
                          <td className="rank">{it.rank}</td>
                          <td className="player">{it.player}</td>
                          <td className="rating">{it.rating.toLocaleString()}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RankHome
