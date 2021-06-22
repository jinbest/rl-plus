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
          <div className="main-data-table">
            <div className="table-row">
              <div className="table-col-1"></div>
              <div className="table-col-2">
                <p>Feedback</p>
              </div>
              <div className="table-col-3">
                <p>Creator</p>
              </div>
              <div className="table-col-4">
                <p>Date</p>
              </div>
            </div>
            {data.data.map((item: MainDataChildParams, index: number) => {
              return (
                <div className="table-row item-row" key={index}>
                  <div className="table-col-1">
                    <p>{item.score}</p>
                  </div>
                  <div className="table-col-2">
                    <p>{item.feedback}</p>
                  </div>
                  <div className="table-col-3">
                    <p>{item.creator}</p>
                  </div>
                  <div className="table-col-4">
                    <p>{item.date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <p className="main-data-nothing">Nothing Found</p>
      )}
    </React.Fragment>
  )
}

export default MainData
