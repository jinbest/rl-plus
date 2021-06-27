import React from "react"

type Props = {
  value?: string
  placeholder?: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleIconClick: (event: any) => void
}

const CustomSearchBar = (props: Props) => {
  return (
    <div className="custom-search-bar">
      <input
        placeholder={props.placeholder ?? "Search by ID"}
        value={props.value ?? ""}
        onChange={props.handleChange}
      />
      <button onClick={props.handleIconClick} className="custom-search-icon">
        <img src="img/reputation/search-icon.png" alt="custom-search-icon" />
      </button>
    </div>
  )
}

export default CustomSearchBar
