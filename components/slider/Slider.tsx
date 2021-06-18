import React, { useRef } from "react"
import Swiper from "react-id-swiper"
import config from "../../static/config.json"
import { SliderItemParams } from "../../models/slider-item-params"
import SliderItem from "./SliderItem"
import Image from "next/image"
import arrowLeft from "../../public/img/home/arrow-left.svg"
import arrowRight from "../../public/img/home/arrow-right.svg"

const Slider = () => {
  const ref = useRef<any>(null)
  const data = config.homepage.data as SliderItemParams[]

  const goNext = () => {
    if (ref.current !== null && ref.current?.swiper !== null) {
      ref.current?.swiper.slideNext()
    }
  }

  const goPrev = () => {
    if (ref.current !== null && ref.current.swiper !== null) {
      ref.current?.swiper.slidePrev()
    }
  }

  const swiperParams = {
    loop: true,
  }

  return (
    <div className="slider">
      <div className="slider-button" onClick={goPrev}>
        <Image src={arrowLeft} width="38" height="38" alt="arrow-left" />
      </div>
      <Swiper ref={ref} {...swiperParams}>
        {data.map((item: SliderItemParams, index: number) => {
          return (
            <div key={index} className="slider-item-container">
              <SliderItem data={item} />
            </div>
          )
        })}
      </Swiper>
      <div className="slider-button" onClick={goNext}>
        <Image src={arrowRight} width="38" height="38" alt="arrow-right" />
      </div>
    </div>
  )
}

export default Slider
