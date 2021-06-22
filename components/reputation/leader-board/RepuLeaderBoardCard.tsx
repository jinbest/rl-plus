import React from "react"
import { ReputationLeaderBoardCardParam } from "../../../models/reputation-params"

type Props = {
  data: ReputationLeaderBoardCardParam
}

const RepuLeaderBoardCard = ({ data }: Props) => {
  return (
    <div className="reputation-leader-board-card">
      <div className="reputation-rank">
        <p>{data.rank}</p>
      </div>
      <div className="reputation-name">
        <p>{data.name}</p>
      </div>
      <div className="reputation-discriminator">
        <p>{data.discriminator}</p>
      </div>
      <div className="reputation-reputation">
        {typeof data.reputation === "string" ? (
          <p>{data.reputation}</p>
        ) : (
          <p>
            <span style={{ color: "#00DE3E" }}>{`+${data.reputation.total}`}</span>
            <span>{" / "}</span>
            <span
              style={{
                color:
                  data.reputation.current < 0
                    ? "#BE0000"
                    : data.reputation.current > 0
                    ? "#00DE3E"
                    : "",
              }}
            >
              {data.reputation.current}
            </span>
          </p>
        )}
      </div>
      <div className="reputation-link">
        {data.link ? (
          <a href={data.link} target="_blank" rel="noreferrer">
            View Profile
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default RepuLeaderBoardCard
