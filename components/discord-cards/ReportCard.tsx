import React from "react"
import { MenuListDataParam, ReportCardParam } from "../../models/discord-bot-params"
import { isEmpty } from "lodash"

type Props = {
  data: MenuListDataParam
}

const ReportCard = ({ data }: Props) => {
  const thisData = (data.reportCard ? data.reportCard : {}) as ReportCardParam

  return (
    <div className="discord-card" style={{ width: "460px", minHeight: "inherit" }}>
      <div className="card-vertical-bar" style={{ minHeight: "inherit", background: "red" }} />
      <div className="card-container" style={{ maxWidth: "100%" }}>
        {!isEmpty(thisData) && (
          <>
            <p className="card-child-content">{thisData.icon}</p>
            <p className="card-child-content">{thisData.text}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default ReportCard
