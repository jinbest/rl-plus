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
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <div className="report-scammer-submit-form">
          <div className="report-scammer-child type-1">
            <label htmlFor="report-scammer-place">{thisPage.scamInfo.place.title}</label>
            <input
              id="report-scammer-place"
              value={place}
              onChange={(e) => {
                setPlace(e.target.value)
              }}
              placeholder={thisPage.scamInfo.place.placeholder}
            />
            {errPlace && <span>{errPlace}</span>}
          </div>
          <div className="report-scammer-child type-1">
            <label htmlFor="report-scammer-kind">{thisPage.scamInfo.kind.title}</label>
            <input
              id="report-scammer-kind"
              value={kind}
              onChange={(e) => {
                setKind(e.target.value)
              }}
              placeholder={thisPage.scamInfo.kind.placeholder}
            />
            {errKind && <span>{errKind}</span>}
          </div>
          <div className="report-scammer-child type-1">
            <label htmlFor="report-scammer-profile">{thisPage.scamInfo.scammerProfile.title}</label>
            <input
              id="report-scammer-profile"
              value={scammerProfile}
              onChange={(e) => {
                setScammerProfile(e.target.value)
              }}
              placeholder={thisPage.scamInfo.scammerProfile.placeholder}
            />
            {errScammerProfile && <span>{errScammerProfile}</span>}
          </div>
          <div className="report-scammer-child type-1">
            <label htmlFor="report-scammer-proof">{thisPage.scamInfo.proof.title}</label>
            <input
              id="report-scammer-proof"
              value={proof}
              onChange={(e) => {
                setProof(e.target.value)
              }}
              placeholder={thisPage.scamInfo.proof.placeholder}
            />
            {errProof && <span>{errProof}</span>}
          </div>
          <div className="report-scammer-child type-2">
            <label htmlFor="report-scammer-description">
              {thisPage.scamInfo.description.title}
            </label>
            <input
              id="report-scammer-description"
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
          <button type="submit">
            {!submitting ? <span>{thisPage.button.title}</span> : <Loading />}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReportScammer
