import React from "react"
import { MainDataParams, MainDataChildParams } from "../../../models/reputation-params"

type Props = {
  data: MainDataParams
}

const MainData = ({ data }: Props) => {
  return (
    <React.Fragment>
      {data.data.length ? (
        <div className="main-data">
          <div className="main-data-header">
            <p>{data.title}</p>
            <p>{data.statistic}</p>
          </div>
          <table className="main-data-table">
            <tbody>
              <tr className="table-row">
                <th className="table-col-1"></th>
                <th className="table-col-2">
                  <p>Feedback</p>
                </th>
                <th className="table-col-3">
                  <p>Creator</p>
                </th>
                <th className="table-col-4">
                  <p>Date</p>
                </th>
              </tr>
              {data.data.map((item: MainDataChildParams, index: number) => {
                return (
                  <tr className="table-row item-row" key={index}>
                    <td className="table-col-1">
                      <p>{item.score}</p>
                    </td>
                    <td className="table-col-2">
                      <p>{item.feedback}</p>
                    </td>
                    <td className="table-col-3">
                      <p>{item.creator}</p>
                    </td>
                    <td className="table-col-4">
                      <p>{item.date}</p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="main-data-nothing">Nothing Found</p>
      )}
    </React.Fragment>
  )
}

export default MainData
