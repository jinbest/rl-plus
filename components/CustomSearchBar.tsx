import React from "react"
import Image from "next/image"

type Props = {
  value?: string
  placeholder?: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleIconClick: (event: any) => void
}

const CustomSearchBar = (props: Props) => {
  return (
    <form
      className="custom-search-bar"
      onSubmit={(e) => {
        e.preventDefault()
        props.handleIconClick(e)
      }}
    >
      <input
        placeholder={props.placeholder ?? "Search by ID"}
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
