import React, { useState } from "react"
import { Modal } from "semantic-ui-react"
import { rankSelect } from "../../../static/mock-data"
import Image from "next/image"

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}

const AddPlayerModal = ({ open, setOpen }: Props) => {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(0)
  const [optionVisible, setOptionVisible] = useState(false)

  const handleSearch = (e: any) => {
    e.preventDefault()
    console.log(`${rankSelect[selected].label}: search`, search)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      className="live-player-modal"
    >
      <p className="add-player-title">Add Player - Live Tracker</p>
      <div className="rank-search-select-form">
        <div className="rank-selector-container">
          <div
            className="rank-search-selector"
            onClick={() => {
              setOptionVisible(!optionVisible)
            }}
          >
            <div className="rank-select-logo">
              <Image
                src={rankSelect[selected].logo}
                alt={`${rankSelect[selected].key}-logo`}
                width="35"
                height="43"
              />
            </div>

            <div>
              <Image
                width="10"
                height="6"
                src="/img/rank-stats/home/arrow-down.png"
                alt="arrow-down"
              />
            </div>
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
                    <Image width="20" height="20" src={item.logo} alt={`${index}-rank-select`} />
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
            <div style={{ margin: "auto" }}>
              <Image
                width="24"
                height="24"
                src="/img/rank-stats/home/steam.svg"
                alt="discord-logo"
              />
            </div>
          </span>
          <span className="rank-player-modal-button">SIGN UP WITH STEAM</span>
        </button>
        <button type="button">
          <span className="rank-player-modal-button-logo" style={{ background: "#000000" }}>
            <div style={{ margin: "auto" }}>
              <Image
                width="24"
                height="24"
                src="/img/rank-stats/home/epic.svg"
                alt="discord-logo"
              />
            </div>
          </span>
          <span className="rank-player-modal-button">SIGN UP WITH EPIC GAMES</span>
        </button>
      </div>
    </Modal>
  )
}

export default AddPlayerModal
