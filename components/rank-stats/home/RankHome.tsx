import React, { useState } from "react"
import { rankSelect } from "../../../static/mock-data"
import config from "../../../static/config.json"
import { LeaderBoardCardChildParams } from "../../../models/rank-stats-params"
import AddPlayerModal from "./AddPlayerModal"
import _ from "lodash"

const RankHome = () => {
  const thisData = _.cloneDeep(config.rankStats.home)

  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(0)
  const [optionVisible, setOptionVisible] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleSearch = (e: any) => {
    e.preventDefault()
    console.log(`${rankSelect[selected].label}: search`, search)
  }

  return (
    <div className="rank-stats-home-container">
      <div className="rank-search-tracker-container">
        <div className="rank-home-search">
          <p className="rank-title">RANK SEARCH</p>
          <div className="rank-card-1">
            <div className="rank-search-select-form">
              <div className="rank-selector-container">
                <div
                  className="rank-search-selector"
                  onClick={() => {
                    setOptionVisible(!optionVisible)
                  }}
                >
                  <img
                    src={rankSelect[selected].logo}
                    alt={`${rankSelect[selected].key}-logo`}
                    style={{ marginLeft: "7px", width: "24px" }}
                  />
                  <img src="/img/rank-stats/home/arrow-down.png" alt="arrow-down" />
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
                          <img src={item.logo} alt={`${index}-rank-select`} />
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
          <p className="rank-title">LIVE TRACKER</p>
          <div className="rank-card-1">
            <div className="add-player-button">
              <button
                type="button"
                onClick={() => {
                  setOpenModal(true)
                }}
              >
                Add Player
              </button>
            </div>
          </div>
        </div>
        <AddPlayerModal open={openModal} setOpen={setOpenModal} />
      </div>
      <div className="rank-home-leaderboard">
        <p className="rank-title center">LEADERBOARDS</p>
        <p className="center underline">View Full Leaderboard</p>
        <div style={{ marginTop: "10px" }}>
          {thisData.leaderBoards.map((item: any, index: number) => {
            return (
              <div className="rank-card-2" key={index}>
                <p className="rank-card-2-title">{item.title}</p>
                <table>
                  <tbody>
                    <tr style={{ borderBottom: "2px solid #3e3e3e" }}>
                      <th className="rank">#</th>
                      <th className="player">Player</th>
                      <th className="rating">Rating</th>
                    </tr>
                    {item.data.map((it: LeaderBoardCardChildParams, idx: number) => {
                      return (
                        <tr key={`${index}-${idx}`}>
                          <td className="rank">{it.rank}</td>
                          <td className="player">{it.player}</td>
                          <td className="rating">{it.rating}</td>
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
