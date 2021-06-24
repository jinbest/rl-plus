import React from "react"
import config from "../../static/config.json"
import Slider from "../../components/slider/Slider"

const HomePage = () => {
  const thisPage = config.homepage

  return (
    <div className="homepage">
      <div className="swiper-container">
        <Slider />
      </div>
      <div className="title">
        <p>{thisPage.title[0]}</p>
        <p>{thisPage.title[1]}</p>
      </div>
    </div>
  )
}

export default HomePage
