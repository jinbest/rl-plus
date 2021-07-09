import React, { useState } from "react"
import RankSearchDetails from "../rank-search/RankSearchDetails"

const YourStats = () => {
  const [step, setStep] = useState(0)

  return (
    <div className="your-stats">
      {step === 0 && (
        <h3>
          Please{" "}
          <span
            onClick={() => {
              setStep(1)
            }}
          >
            Login
          </span>{" "}
          to use this feature
        </h3>
      )}
      {step === 1 && (
        <h3>
          Please link an account in{" "}
          <span
            onClick={() => {
              setStep(2)
            }}
          >
            settings
          </span>
        </h3>
      )}
      {step === 2 && <RankSearchDetails type="epic" searchKey="" pageName="liveTracker" />}
    </div>
  )
}

export default YourStats
