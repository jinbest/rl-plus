import React from "react"
import config from "../../static/privacy-policy.json"
import ChildComponent1 from "./ChildComponent1"
import ChildComponent4 from "./ChildComponent4"

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="empty-board"></div>
      <div className="privacy-policy-container">
        <p className="privacy-main-title">{config.title}</p>
        <div className="privacy-content-container">
          {config.data.abstract.map((item: string, index: number) => {
            return (
              <p className="abstract" key={index}>
                {item}
              </p>
            )
          })}
          <p className="bold" style={{ margin: "30px 0 20px" }}>
            TABLE OF CONTENTS
          </p>
          {config.data.childData.map((item: any, index: number) => {
            return (
              <div key={index} style={{ margin: "5px 0" }}>
                <a href={`#title-${index + 1}`} id={`question-${index + 1}`}>
                  {item.title}
                </a>
              </div>
            )
          })}

          {[1, 2, 3].map((item: number) => {
            return (
              <ChildComponent1
                title={config.data.childData[item - 1].title}
                data={config.data.childData[item - 1].data}
                index={item}
                key={item - 1}
              />
            )
          })}
          <ChildComponent4
            title={config.data.childData[3].title}
            data={config.data.childData[3].data}
          />
          {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16].map((item: number) => {
            return (
              <ChildComponent1
                title={config.data.childData[item - 1].title}
                data={config.data.childData[item - 1].data}
                index={item}
                key={item - 1}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
