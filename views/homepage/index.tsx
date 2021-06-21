import React from "react"
import config from "../../static/config.json"
import Slider from "../../components/slider/Slider"

// import AuthenticatedAPIClient from "../../service/authenticated-api-client"
// import APIClient from "../../service/api-clients"
// import apiConfig from "../../config/config"

// const apiClient = AuthenticatedAPIClient.getInstance()
// const apiClient = APIClient.getInstance()

const HomePage = () => {
  const thisPage = config.homepage

  /* will be used later
  const login = async () => {
    const response = await apiClient.post(apiConfig.LOGIN_API_URL, {
      email: "test@test.com",
      password: "password",
    })
  }
  */

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
