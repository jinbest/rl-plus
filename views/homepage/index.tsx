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
        <h1>
          {thisPage.title[0]}
          <br />
          {thisPage.title[1]}
        </h1>
      </div>
    </div>
  )
}

export default HomePage
