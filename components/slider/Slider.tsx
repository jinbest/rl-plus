import React, { useRef, useState, useCallback, useEffect } from "react"
import Swiper from "react-id-swiper"
import config from "../../static/config.json"
import { SliderItemParams } from "../../models/slider-item-params"
import SliderItem from "./SliderItem"
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const Slider = () => {
  const ref = useRef<any>(null)
  const data = config.homepage.data as SliderItemParams[]
  const len = data.length

  const [step, setStep] = useState(0)

  const goNext = () => {
    if (ref.current !== null && ref.current?.swiper !== null) {
      ref.current.swiper.slideNext()
      setStep(ref.current.swiper.realIndex)
    }
  }

  const goPrev = () => {
    if (ref.current !== null && ref.current.swiper !== null) {
      ref.current.swiper.slidePrev()
      setStep(ref.current.swiper.realIndex)
    }
  }

  const updateIndex = useCallback(() => {
    if (ref.current !== null && ref.current?.swiper !== null) {
      setStep(ref.current.swiper.realIndex)
    }
  }, [])

  useEffect(() => {
    if (ref.current !== null && ref.current?.swiper !== null) {
      const swiperInstance = ref.current.swiper
      if (swiperInstance) {
        swiperInstance.on("slideChange", updateIndex)
      }
      return () => {
        if (swiperInstance) {
          swiperInstance.off("slideChange", updateIndex)
        }
      }
    }
  }, [updateIndex])

  const calcPro = (val: number) => {
    return Math.round((val / len) * 100)
  }

  const swiperParams = {
    loop: true,
  }

  useEffect(() => {
    const interval = setInterval(() => {
      goNext()
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="slider">
      <button className="slider-button" onClick={goPrev}>
        <CircularProgressbarWithChildren
          value={0}
          styles={buildStyles({
            pathColor: "#FAC800",
            trailColor: "#C4C4C4",
          })}
        >
          <img src="img/home/arrow-left.svg" alt="arrow-left" />
        </CircularProgressbarWithChildren>
      </button>
      <Swiper ref={ref} {...swiperParams}>
        {data.map((item: SliderItemParams, index: number) => {
          return (
            <div key={index} className="slider-item-container">
              <SliderItem data={item} />
            </div>
          )
        })}
      </Swiper>
      <button className="slider-button" onClick={goNext}>
        <CircularProgressbarWithChildren
          value={calcPro(step + 1)}
          styles={buildStyles({
            pathColor: "#FAC800",
            trailColor: "#C4C4C4",
          })}
        >
          <img src="img/home/arrow-right.svg" alt="arrow-right" />
        </CircularProgressbarWithChildren>
      </button>
    </div>
  )
}

export default Slider
