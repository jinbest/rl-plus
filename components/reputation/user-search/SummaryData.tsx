import React, { useState, useEffect } from "react"
import { SummaryDataParams } from "../../../models/reputation-params"
import Image from "next/image"
import apiConfig from "../../../config/config"
import ApiClient from "../../../service/api-clients"
import _, { isEmpty } from "lodash"

const apiClient = ApiClient.getInstance()

type Props = {
  data: SummaryDataParams[]
}

const SummaryData = ({ data }: Props) => {
  const [thisData, setThisData] = useState<SummaryDataParams[]>([])

  useEffect(() => {
    loadGetCount()
    return () => {
      setThisData([])
    }
  }, [])

  const loadGetCount = async () => {
    const result = await apiClient.get<any>(apiConfig.GET_COUNT)
    const newData = [] as SummaryDataParams[]
    if (!isEmpty(result)) {
      data.forEach((item: SummaryDataParams, index: number) => {
        const tmpItem = _.cloneDeep(item)
        if (item.type === "reputationCount") {
          tmpItem.total = result.reputationCount
          newData.push(tmpItem)
        } else if (item.type === "scammerCount") {
          tmpItem.total = result.scammerCount
          newData.push(tmpItem)
        } else if (item.type === "profilesCount") {
          tmpItem.total = result.profilesCount
          newData.push(tmpItem)
        }
      })
      setThisData([...newData])
    } else {
      setThisData(data)
    }
  }

  return (
    <div className="summary-data">
      {thisData.map((item: SummaryDataParams, index: number) => {
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
