import React from "react"
import { SummaryDataParams } from "../../../models/reputation-params"
import Image from "next/image"

type Props = {
  data: SummaryDataParams[]
}

const SummaryData = ({ data }: Props) => {
  return (
    <div className="summary-data">
      {data.map((item: SummaryDataParams, index: number) => {
        return (
          <div key={index} className="summary-item">
            <div className="flex align-center">
              <div
                className="summary-circle"
                style={{ background: item.themeCol, boxShadow: `0 0 18px -2px ${item.themeCol}` }}
              >
                <Image width="20" height="20" src={item.logo} alt={`summary-logo-${index}`} />
              </div>
              <p className="summary-total">{item.total.toLocaleString()}</p>
            </div>
            <p className="summary-name">{item.name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default SummaryData
