import React, { useState, useEffect, useRef, ChangeEvent } from "react"
import Loading from "../../Loading"
import Selector from '../../Selector'
import config from "../../../static/config.json"
import _ from "lodash"
import ApiClient from "../../../service/api-clients"
import apiConfig from "../../../config/config"
import Toast from "../../../components/toast/Toast"
import { ToastMsgParams } from "../../../components/toast/toast-msg-params"

const ReportScammer = () => {

  const apiClient = ApiClient.getInstance()

  const thisPage = _.cloneDeep(config.reputation.reportScammer)
  const whereScamOption = config.whereScamOption;
  const whereScamKindOption = config.whereScamKindOption;
  const kindScamOption = config.kindScamOption
  const profileOption = config.profileOption

  const [place, setPlace] = useState("")
  const [showPlaceKind, setShowPlaceKind] = useState("")
  const [placekind, setPlacekind] = useState("")
  const [kind, setKind] = useState("")
  const [showkindContent, setShowKindContent] = useState("")
  const [kindContent, setKindContent] = useState("")
  const [proof, setProof] = useState<any[]>([])
  const [profile, setProfile] = useState<string[]>([])
  const [profileContent, setProfileContent] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [errPlace, setErrPlace] = useState("")
  const [errKind, setErrKind] = useState("")
  const [errScammerProfile, setErrScammerProfile] = useState("")
  const [errProof, setErrProof] = useState("")
  const [errDescription, setErrDescription] = useState("")
  const [toastParam, setToastParam] = useState<ToastMsgParams>({
    msg: "",
  })

  const proofUpload = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPlacekind("")
    if(place === "Discord Server") return setShowPlaceKind("SELECTOR")
    if(place === "Other") return setShowPlaceKind("INPUT")
    return setShowPlaceKind("")
  }, [place])

  useEffect(() => {
    if(kind === 'Other') return setShowKindContent("INPUT")
    return setShowKindContent("")
  }, [kind])

  const handleSubmit = async () => {
    if (!validate()) {
      return
    }

    setSubmitting(true)
    let msg = "Successed", isFailed = false
    try {
      await apiClient.post<any>(apiConfig.REPORT_SCAM, {
        where_scam_occurred: place,
        community: placekind,
        type_of_scam: kind,
        scammer_profiles: [
          {
            option: "Discord",
            userId: "xxx#0001"
          },
        ],
        "proof": [{
          url: proof
        }]
      })
      init()
      setSubmitting(false)

    } catch {
      msg = "Something went wrong"
      isFailed = true
      setSubmitting(false)
    } finally {
      setToastParam({
        msg,
        isSuccess: !isFailed,
        isError: isFailed
      })
    }

  }

  const init = () => {
    setPlace("")
    setKind("")
    setProof([])
    setDescription("")
  }

  const clearErr = () => {
    setErrPlace("")
    setErrKind("")
    setErrScammerProfile("")
    setErrProof("")
    setErrDescription("")
  }

  const resetToastStatus = () => {
    setToastParam({
      msg: "",
      isSuccess: false,
      isError: false,
      isWarning: false,
    })
  }

  const handleProofUpload = () => {
    proofUpload.current && proofUpload.current.click(); 
  }

  const handleProfileContent = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileContent({
      ...profileContent,
      [e.target.name]: e.target.value
    })
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
    // if (!scammerProfile) {
    //   setErrScammerProfile("Please input scammer profile.")
    //   result = false
    // }
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

  const handleProfile = (value: string) => {
    let isExist = false;
    profile.forEach(pr => {
      if(pr === value) isExist = true
    })
    if(!isExist) {
      const newProfile = [...profile, value];
      setProfile([...newProfile]);
    } else {
      const newProfile = profile.filter(pr => pr !== value)
      setProfile([...newProfile])
    }
  }

  const removeProof = (file: File) => {
    setProof([...proof.filter(pf => pf.name !== file.name)])
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
            <Selector 
              selectedValue={place} 
              handleChange={(value: string) => setPlace(value)}
              options={whereScamOption}
              label={thisPage.scamInfo.place.title}
              placeholder={thisPage.scamInfo.place.placeholder}
            />
            {errPlace && <span>{errPlace}</span>}
            <div className="mt-1">
              {
                showPlaceKind === "SELECTOR" &&
                  <Selector 
                    selectedValue={placekind} 
                    handleChange={(value: string) => setPlacekind(value)}
                    options={whereScamKindOption}
                    label={thisPage.scamInfo.placekind.title}
                    placeholder={thisPage.scamInfo.placekind.placeholder}
                  />
              }
              {
                showPlaceKind === "INPUT" &&
                <>
                  <label>{thisPage.scamInfo.placekindOther.title}</label>
                  <input
                    id="report-scammer-kind"
                    value={placekind}
                    onChange={(e) => setPlacekind(e.target.value)}
                  />
                </>
              }
            </div>
          </div>
          <div className="report-scammer-child type-1">
            <Selector 
              selectedValue={kind} 
              handleChange={(value: string) => setKind(value)}
              options={kindScamOption}
              label={thisPage.scamInfo.kind.title}
              placeholder={thisPage.scamInfo.kind.placeholder}
            />
            {errKind && <span>{errKind}</span>}
            {
              showkindContent === "INPUT" && 
              <div className="mt-1">
                <label htmlFor="report-scammer-profile">{thisPage.scamInfo.kindContent.title}</label>
                <input
                  id="report-scammer-kind"
                  value={kindContent}
                  onChange={(e) => setKindContent(e.target.value)}
                />
              </div>
            }
          </div>
          <div className="report-scammer-child flex-wrap flex type-1">
            <div className="dropdown-button">
              <Selector 
                selectedValue={""} 
                handleChange={(value: string) => handleProfile(value)}
                options={profileOption}
                label={thisPage.scamInfo.scammerProfile.title}
                placeholder={
                  <p className="add-button">
                    {thisPage.scamInfo.scammerProfile.placeholder}
                  </p>
                }
              />
            </div>
            {
              profile.map((profile:any, key: number) => (
                <div className="profiles" key={key}>
                  <label>{profile}</label><br/>
                  <input 
                    value={profileContent[profile]} 
                    onChange={(e) => handleProfileContent(e)}
                  />
                </div>
              ))
            }
            <div></div>
            {errScammerProfile && <span>{errScammerProfile}</span>}
          </div>
          <div className="report-scammer-child type-1">
            <label htmlFor="report-scammer-proof">{thisPage.scamInfo.proof.title}</label><br />
            <div className="flex-wrap flex">
              <input 
                type="file" 
                onChange={(e:any) => setProof([...proof, ...e.target.files])} 
                multiple={true} 
                accept="image/*" 
                hidden 
                ref={proofUpload}
              />
              <button
                id="report-scammer-profile"
                className="add-button"
                type="button"
                onClick={handleProofUpload}
              >
                {thisPage.scamInfo.proof.placeholder}
              </button>
              {
                proof.map((pf:any, key: number) => (
                  <div className="proofs flex" key={key}>
                    <p className="">{pf.name}</p>
                    <div className="close_button" onClick={() => removeProof(pf)}>
                      <img src="./img/reputation/close.svg"/>
                    </div>
                  </div>
                ))
              }
            </div>
            {errProof && <span>{errProof}</span>}
          </div>
          <div className="report-scammer-child type-2">
            <label htmlFor="report-scammer-description">
              {thisPage.scamInfo.description.title}
            </label>
            <textarea
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
      <Toast param={toastParam} resetStatus={resetToastStatus} />
    </div>
  )
}

export default ReportScammer
