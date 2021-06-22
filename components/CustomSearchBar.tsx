import React from "react"

type Props = {
  value?: string
  placeholder?: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleIconClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const CustomSearchBar = (props: Props) => {
  return (
    <div className="custom-search-bar">
      <input
        placeholder={props.placeholder ?? "Search by ID"}
        value={props.value ?? ""}
        onChange={props.handleChange}
      />
      <div onClick={props.handleIconClick} className="custom-search-icon">
        <img src="img/reputation/search-icon.png" alt="custom-search-icon" />
      </div>
    </div>
  )
}

export default CustomSearchBar
