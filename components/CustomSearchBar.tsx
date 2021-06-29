import React from "react"

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
        <img src="img/reputation/search-icon.png" alt="custom-search-icon" />
      </button>
    </form>
  )
}

export default CustomSearchBar
