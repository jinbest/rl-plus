import React from "react"
import { ContentWithLinkParam } from "../../models/privacy-modal-params"
import { isExternal } from "../../service/helper"

type Props = {
  title: string
  data: any
}

const ChildComponent4 = ({ title, data }: Props) => {
  return (
    <div id="title-4" style={{ marginTop: "30px" }}>
      <a href={`#question-4`} className="bold" style={{ marginBottom: "20px" }}>
        {title}
      </a>
      {data.itext && (
        <i>
          <p style={{ margin: "30px 0 20px" }}>{data.itext}</p>
        </i>
      )}
      {data.textWithLink?.length && (
        <p>
          {data.textWithLink.map((item: ContentWithLinkParam, index: number) => {
            return (
              <React.Fragment key={index}>
                <span>{item.text}</span>
                {item.link && (
                  <span>
                    {isExternal(item.link.href) ? (
                      <a
                        className="text-link-tag"
                        href={item.link.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.link.text}
                      </a>
                    ) : (
                      <a className="text-link-tag" href={item.link.href}>
                        {item.link.text}
                      </a>
                    )}
                  </span>
                )}
              </React.Fragment>
            )
          })}
        </p>
      )}
      <ul>
        {data.list.map((item: any, index: number) => {
          return (
            <div key={index}>
              <li>
                <p style={{ padding: "10px 0" }}>{item.title}</p>
                <p style={{ padding: "10px 0" }}>{item.content}</p>
              </li>
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export default ChildComponent4
