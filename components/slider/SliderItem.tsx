import React from "react"
import { SliderItemParams } from "../../models/slider-item-params"

type Props = {
  data: SliderItemParams
}

const SliderItem = ({ data }: Props) => {
  return (
    <div className="slider-item" style={{ backgroundImage: `url(${data.bgImg})` }}>
      <div className="slider-title-container">
        <p className="slider-title">{data.title}</p>
        <p className="version">{data.version}</p>
      </div>
      <div className="slider-content-container">
        <div className="slider-left">
          {data.content.left.map((item: string, index: number) => {
            return <p key={index}>{item}</p>
          })}
        </div>
        <div className="slider-right">
          {data.content.right.map((item: string, index: number) => {
            return <p key={index}>{item}</p>
          })}
        </div>
      </div>
      <div className="slider-bottom">
        <img src={data.logo} alt="slider-logo" className="slider-logo" />
        <div className="download">
          <div>DOWNLOAD NOW</div>
        </div>
      </div>
    </div>
  )
}

export default SliderItem