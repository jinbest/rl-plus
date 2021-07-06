import React from "react"
import { rankSelect } from "../../../static/mock-data"

type Props = {
  search: string
  setSearch: (val: string) => void
  selected: number
  setSelected: (val: number) => void
  optionVisible: boolean
  setOptionVisible: (val: boolean) => void
  handleSearch: (val: any) => void
  title?: string
}

const RankSearchComponent = ({
  search,
  setSearch,
  selected,
  setSelected,
  optionVisible,
  setOptionVisible,
  handleSearch,
  title,
}: Props) => {
  return (
    <div className="rank-search-container-1">
      <h1 className="rank-search-title">{title || "RANK SEARCH"}</h1>
      <div className="rank-search-card-container">
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
                className="rank-select-logo"
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
                      <p style={{ color: "white" }}>{item.label}</p>
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
            style={{ background: "#131313", borderRadius: "10px" }}
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
        <div className="rank-card-1-buttons-between">
          <button type="button">
            <span className="rank-player-modal-button-logo" style={{ background: "#115C93" }}>
              <img src="/img/rank-stats/home/steam.svg" alt="discord-logo" />
            </span>
            <span className="rank-player-modal-button">SIGN UP WITH STEAM</span>
          </button>
          <button type="button">
            <span className="rank-player-modal-button-logo" style={{ background: "#000000" }}>
              <img src="/img/rank-stats/home/epic.svg" alt="discord-logo" />
            </span>
            <span className="rank-player-modal-button">SIGN UP WITH EPIC GAMES</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RankSearchComponent
