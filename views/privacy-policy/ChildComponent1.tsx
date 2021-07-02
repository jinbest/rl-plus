import React from "react"
import {
  ChildTextContent,
  ContentWithLinkParam,
  ListContentChildParam,
  ChildTableParam,
} from "../../models/privacy-modal-params"
import { isExternal } from "../../service/helper"
import { isEmpty } from "lodash"

type Props = {
  title: string
  data?: any[]
  index: number
}

const ChildComponent1 = ({ title, data, index }: Props) => {
  return (
    <div id={`title-${index}`} style={{ marginTop: "30px" }}>
      <a href={`#question-${index}`} className="bold" style={{ marginBottom: "20px" }}>
        {title}
      </a>
      {data?.map((item: any, index: number) => {
        return (
          <div key={index}>
            {item.title && (
              <p className="bold" style={{ margin: "30px 0 20px" }}>
                {item.title}
              </p>
            )}
            {item.itext && (
              <i>
                <p style={{ margin: "30px 0 20px" }}>{item.itext}</p>
              </i>
            )}
            {item.child.map((it: ChildTextContent, idx: number) => {
              return (
                <div style={{ margin: "15px 0" }} key={`${index}-${idx}`}>
                  {it.text && <p>{it.text}</p>}
                  {it.underlineText && (
                    <p style={{ textDecoration: "underline" }}>{it.underlineText}</p>
                  )}
                  {it.textWithLink?.length && (
                    <p>
                      {it.textWithLink.map((itItem: ContentWithLinkParam, itIdx: number) => {
                        return (
                          <React.Fragment key={`${index}-${idx}-${itIdx}`}>
                            {itItem.underlineText && (
                              <span style={{ textDecoration: "underline" }}>
                                {itItem.underlineText}
                              </span>
                            )}
                            {itItem.text && <span>{itItem.text}</span>}
                            {itItem.link && (
                              <span>
                                {isExternal(itItem.link.href) ? (
                                  <a
                                    className="text-link-tag"
                                    href={itItem.link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {itItem.link.text}
                                  </a>
                                ) : (
                                  <a className="text-link-tag" href={itItem.link.href}>
                                    {itItem.link.text}
                                  </a>
                                )}
                              </span>
                            )}
                          </React.Fragment>
                        )
                      })}
                    </p>
                  )}
                  {it.listContent && !isEmpty(it.listContent) && (
                    <>
                      {it.listContent.title && <p>{it.listContent.title}</p>}
                      <ul>
                        {it.listContent.list.map((itList: ListContentChildParam, itIdx: number) => {
                          return (
                            <li
                              key={`${index}-${idx}-${itIdx}`}
                              style={{ listStyle: itList.listStyle ? "none" : "inherit" }}
                            >
                              {itList.key && (
                                <i>
                                  <span>{itList.key} </span>
                                </i>
                              )}
                              {itList.text && (
                                <span>
                                  {itList.text}
                                  <br />
                                </span>
                              )}
                              {itList.textWithLink?.length && (
                                <span>
                                  {itList.textWithLink.map(
                                    (itItem: ContentWithLinkParam, itListIdx: number) => {
                                      return (
                                        <React.Fragment
                                          key={`${index}-${idx}-${itIdx}-${itListIdx}`}
                                        >
                                          <span>{itItem.text}</span>
                                          {itItem.link && (
                                            <span>
                                              {isExternal(itItem.link.href) ? (
                                                <a
                                                  className="text-link-tag"
                                                  href={itItem.link.href}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                >
                                                  {itItem.link.text}
                                                </a>
                                              ) : (
                                                <a
                                                  className="text-link-tag"
                                                  href={itItem.link.href}
                                                >
                                                  {itItem.link.text}
                                                </a>
                                              )}
                                            </span>
                                          )}
                                        </React.Fragment>
                                      )
                                    }
                                  )}
                                </span>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </>
                  )}
                  {it.table && it.table.length && (
                    <table>
                      <tbody style={{ textAlign: "left" }}>
                        {it.table.map((itTable: ChildTableParam, idxTable: number) => {
                          return (
                            <tr key={`${index}-${idx}-${idxTable}`}>
                              {idxTable === 0 ? (
                                <th>{itTable.category}</th>
                              ) : (
                                <td>{itTable.category}</td>
                              )}
                              {idxTable === 0 ? (
                                <th>{itTable.examples}</th>
                              ) : (
                                <td>{itTable.examples}</td>
                              )}
                              {idxTable === 0 ? (
                                <th>{itTable.collected}</th>
                              ) : (
                                <td>{itTable.collected}</td>
                              )}
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default ChildComponent1
