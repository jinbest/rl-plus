import React, { useState } from "react"
import Image from "next/image"
import { rankSelect } from "../static/mock-data"
import useOnclickOutside from "react-cool-onclickoutside"

const PLACEHOLDERS = [
  "Epic Games Username or Epic Account ID",
  "Steam64 or Steam Link",
  "Xbox Username",
  "Playstation Username",
  "Nintendo Switch Username",
]

type Props = {
  value?: string
  placeholder?: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleIconClick: (event: any) => void
  dropdown?: boolean
}

const CustomSearchBar = (props: Props) => {
  const [optionVisible, setOptionVisible] = useState(false)
  const [selected, setSelected] = useState(0)
  const [selectedPlaceHolder, setSelectedPlaceHolder] = useState(PLACEHOLDERS[0])

  const ref = useOnclickOutside(() => {
    setOptionVisible(false)
  })

  return (
    <form
      className="custom-search-bar"
      onSubmit={(e) => {
        e.preventDefault()
        props.handleIconClick(e)
      }}
    >
      {props.dropdown && (
        <div className="rank-selector-container" ref={ref}>
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
                      setSelectedPlaceHolder(PLACEHOLDERS[index])
                      setOptionVisible(false)
                    }}
                  >
                    <Image width="20" height="20" src={item.logo} alt={`${index}-rank-select`} />
                    <p>{item.label}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      <input
        placeholder={
          selectedPlaceHolder ? selectedPlaceHolder : props.placeholder ?? "Search by ID"
        }
        value={props.value ?? ""}
        onChange={props.handleChange}
      />
      <button type="submit" className="custom-search-icon">
        <Image
          src={require("../public/img/reputation/search-icon.png")}
          alt="custom-search-icon"
          width="22"
          height="22"
        />
      </button>
    </form>
  )
}

export default CustomSearchBar
