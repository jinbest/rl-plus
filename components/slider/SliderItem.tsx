import React from "react"
import { SliderItemParams } from "../../models/slider-item-params"

type Props = {
  data: SliderItemParams
}

const SliderItem = ({ data }: Props) => {
  return (
    <div className="slider-item">
      <div className="flex" style={{ margin: "0 0 10px 20px" }}>
        <p className="slider-title">{data.title}</p>
        <p className="version">{data.version}</p>
      </div>
      <div className="flex">
        <div className="slider-left-container">
          <img src={data.left.img_src} alt="slider-item-left" />
          <div className="slider-left-title">
            {data.left.title.map((item: string, index: number) => {
              return <p key={index}>{item}</p>
            })}
          </div>
          <p className="slider-left-subtitle">{data.left.subtitle}</p>
          <img src={data.logo} alt="slider-logo" className="slider-logo" />
        </div>
        <div className="slider-right-container">
          <img src={data.right.img_src} alt="slider-item-right" />
        </div>
      </div>
    </div>
  )
}

export default SliderItem
