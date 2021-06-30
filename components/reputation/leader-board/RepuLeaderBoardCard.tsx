import React from "react"
import { ReputationLeaderBoardCardParam } from "../../../models/reputation-params"

type Props = {
  data: ReputationLeaderBoardCardParam
  head?: boolean
}

const RepuLeaderBoardCard = ({ data, head }: Props) => {
  return (
    <tr className="reputation-leader-board-card">
      {head ? (
        <th className="reputation-rank">
          <p>{data.rank}</p>
        </th>
      ) : (
        <td className="reputation-rank">
          <p>{data.rank}</p>
        </td>
      )}
      {head ? (
        <th className="reputation-name">
          <p>{data.name}</p>
        </th>
      ) : (
        <td className="reputation-name">
          <p>{data.name}</p>
        </td>
      )}
      {head ? (
        <th className="reputation-discriminator">
          <p>{data.discriminator}</p>
        </th>
      ) : (
        <td className="reputation-discriminator">
          <p>{data.discriminator}</p>
        </td>
      )}
      {head ? (
        <th className="reputation-reputation">
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
        </th>
      ) : (
        <td className="reputation-reputation">
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
        </td>
      )}
      {head ? (
        <th className="reputation-link">
          {data.link ? (
            <a href={data.link} target="_blank" rel="noreferrer">
              View Profile
            </a>
          ) : (
            <></>
          )}
        </th>
      ) : (
        <td className="reputation-link">
          {data.link ? (
            <a href={data.link} target="_blank" rel="noreferrer">
              View Profile
            </a>
          ) : (
            <></>
          )}
        </td>
      )}
    </tr>
  )
}

export default RepuLeaderBoardCard
