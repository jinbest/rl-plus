import React, { useState } from "react"
import Loading from "../../Loading"
import config from "../../../static/config.json"
import _ from "lodash"

const ReportScammer = () => {
  const thisPage = _.cloneDeep(config.reputation.reportScammer)

  const [place, setPlace] = useState("")
  const [kind, setKind] = useState("")
  const [scammerProfile, setScammerProfile] = useState("")
  const [proof, setProof] = useState("")
  const [description, setDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [errPlace, setErrPlace] = useState("")
  const [errKind, setErrKind] = useState("")
  const [errScammerProfile, setErrScammerProfile] = useState("")
  const [errProof, setErrProof] = useState("")
  const [errDescription, setErrDescription] = useState("")

  const handleSubmit = () => {
    if (!validate()) {
      return
    }
    console.log("submit", place, kind, scammerProfile, proof, description)
    setSubmitting(true)
    setTimeout(() => {
      init()
      setSubmitting(false)
    }, 3000)
  }

  const init = () => {
    setPlace("")
    setKind("")
    setScammerProfile("")
    setProof("")
    setDescription("")
  }

  const clearErr = () => {
    setErrPlace("")
    setErrKind("")
    setErrScammerProfile("")
    setErrProof("")
    setErrDescription("")
  }

  const validate = () => {
    let result = true
    if (!place) {
      setErrPlace("Please input where the scam happened.")
      result = false
    }
    if (!kind) {
      setErrKind("Please input what kind of scam happened.")
      result = false
    }
    if (!scammerProfile) {
      setErrScammerProfile("Please input scammer profile.")
      result = false
    }
    if (!proof) {
      setErrProof("Please input proof.")
      result = false
    }
    if (!description) {
      setErrDescription("Please input description.")
      result = false
    } else if (description.length < 50) {
      setErrDescription("Description needs to be 50 characters at least.")
      result = false
    }
    setTimeout(() => {
      clearErr()
    }, 3000)
    return result
  }

  return (
    <div className="report-scammer-container">
      <div className="scammer-bar">
        <p>{thisPage.scammerBar}</p>
      </div>
      <div className="report-scammer-submit-form">
        <div className="report-scammer-child type-1">
          <p>{thisPage.scamInfo.place.title}</p>
          <input
            value={place}
            onChange={(e) => {
              setPlace(e.target.value)
            }}
            placeholder={thisPage.scamInfo.place.placeholder}
          />
          {errPlace && <span>{errPlace}</span>}
        </div>
        <div className="report-scammer-child type-1">
          <p>{thisPage.scamInfo.kind.title}</p>
          <input
            value={kind}
            onChange={(e) => {
              setKind(e.target.value)
            }}
            placeholder={thisPage.scamInfo.kind.placeholder}
          />
          {errKind && <span>{errKind}</span>}
        </div>
        <div className="report-scammer-child type-1">
          <p>{thisPage.scamInfo.scammerProfile.title}</p>
          <input
            value={scammerProfile}
            onChange={(e) => {
              setScammerProfile(e.target.value)
            }}
            placeholder={thisPage.scamInfo.scammerProfile.placeholder}
          />
          {errScammerProfile && <span>{errScammerProfile}</span>}
        </div>
        <div className="report-scammer-child type-1">
          <p>{thisPage.scamInfo.proof.title}</p>
          <input
            value={proof}
            onChange={(e) => {
              setProof(e.target.value)
            }}
            placeholder={thisPage.scamInfo.proof.placeholder}
          />
          {errProof && <span>{errProof}</span>}
        </div>
        <div className="report-scammer-child type-2">
          <p>{thisPage.scamInfo.description.title}</p>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            placeholder={thisPage.scamInfo.description.placeholder}
          />
          {errDescription && <span>{errDescription}</span>}
        </div>
      </div>
      <div className="report-submit-button">
        <div onClick={handleSubmit}>
          {!submitting ? <p>{thisPage.button.title}</p> : <Loading />}
        </div>
      </div>
    </div>
  )
}

export default ReportScammer
