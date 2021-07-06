import React, { useState } from "react"
import { rankSelect } from "../../../static/mock-data"
import RankSearchComponent from "./RankSearchComponent"
import RankSearchDetails from "./RankSearchDetails"
import { RankSelectKeyParams } from "../../../models/rank-stats-params"

const RankSearch = () => {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(0)
  const [optionVisible, setOptionVisible] = useState(false)
  const [searchStatus, setSearchStatus] = useState(false)

  const handleSearch = (e: any) => {
    e.preventDefault()
    console.log(`${rankSelect[selected].label}: search`, search)
    setSearchStatus(true)
  }

  return (
    <div className="rank-search-container">
      {!searchStatus ? (
        <RankSearchComponent
          search={search}
          setSearch={setSearch}
          selected={selected}
          setSelected={setSelected}
          optionVisible={optionVisible}
          setOptionVisible={setOptionVisible}
          handleSearch={handleSearch}
        />
      ) : (
        <RankSearchDetails
          type={rankSelect[selected].key as RankSelectKeyParams}
          searchKey={search}
          pageName="rankSearch"
        />
      )}
    </div>
  )
}

export default RankSearch