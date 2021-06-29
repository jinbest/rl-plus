import React, { useState, useEffect } from "react"
import { Modal } from "semantic-ui-react"
import Image from "next/image"
import logo from "../../public/img/header/logo.png"
import Loading from "../Loading"
import { ValidateEmail, CheckPassword, CheckConfPass } from "../../service/helper"
import config from "../../static/config.json"
import { ForgotModalStepParams, ForgotModalDataParams } from "../../models/forgot-modal-step-params"
import _ from "lodash"

type Props = {
  openForgotModal: boolean
  setOpenForgotModal: (val: boolean) => void
  setOpenSignModal: (val: boolean) => void
}

const ForgotPassModal = ({ openForgotModal, setOpenForgotModal, setOpenSignModal }: Props) => {
  const thisPage = _.cloneDeep(config.forgotPass)
  const [submitting, setSubmitting] = useState(false)
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [confPass, setConfPass] = useState("")
  const [errEmail, setErrEmail] = useState("")
  const [errPass, setErrPass] = useState("")
  const [errConfPass, setErrConfPass] = useState("")
  const [step, setStep] = useState<ForgotModalStepParams>("reset")
  const [data, setData] = useState<ForgotModalDataParams>(_.cloneDeep(thisPage.reset))
  const [passNewVisible, setNewPassVisible] = useState(false)
  const [passConfVisible, setConfPassVisible] = useState(false)

  useEffect(() => {
    if (step === "reset") {
      setData(_.cloneDeep(thisPage.reset))
    } else if (step === "checkEmail") {
      setData(_.cloneDeep(thisPage.checkEmail))
    } else if (step === "setNewPass") {
      setData(_.cloneDeep(thisPage.setNewPass))
      setNewPassVisible(false)
      setConfPassVisible(false)
    } else if (step === "passChanged") {
      setData(_.cloneDeep(thisPage.passChanged))
    }
  }, [step])

  const init = () => {
    setEmail("")
    setPass("")
    setConfPass("")
    setNewPassVisible(false)
    setConfPassVisible(false)
  }

  const clearErr = () => {
    setErrEmail("")
    setErrPass("")
    setErrConfPass("")
  }

  const handleSubmit = () => {
    if (step === "passChanged") {
      setOpenSignModal(true)
      setStep("reset")
      setOpenForgotModal(false)
      return
    } else if (step === "checkEmail") {
      setStep("setNewPass")
      return
    }
    if (!validate()) {
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      if (step === "reset") {
        setStep("checkEmail")
      } else if (step === "setNewPass") {
        setStep("passChanged")
      }
      setSubmitting(false)
    }, 1000)
  }

  const validate = () => {
    let result = true
    if (step === "reset") {
      if (!email) {
        setErrEmail("Email is required.")
        result = false
      } else if (!ValidateEmail(email)) {
        setErrEmail("Email is not correct.")
        result = false
      }
    } else if (step === "setNewPass") {
      if (!pass) {
        setErrPass("Password is required.")
        result = false
      } else if (pass) {
        const checkPass = CheckPassword(pass)
        if (!checkPass.status) {
          setErrPass(checkPass.msg)
          result = false
        }
      }
      if (!confPass) {
        setErrConfPass("Confirm password is required.")
        result = false
      } else if (!CheckConfPass(confPass, pass)) {
        setErrConfPass("Confirm Password is not matched with password.")
        result = false
      }
    }
    setTimeout(() => {
      clearErr()
      init()
    }, 3000)
    return result
  }

  return (
    <Modal
      onClose={() => setOpenForgotModal(false)}
      onOpen={() => setOpenForgotModal(true)}
      open={openForgotModal}
      className="forgot-pass-modal"
    >
      <div className="forgot-pass-modal-header">
        <div>
          <p className="forgot-pass-main-title">{data.title}</p>
        </div>
        <div className="forgot-pass-modal-header-logo">
          <Image src={logo} alt="logo" width="120" height="54" />
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <div className="forgot-pass-modal-container custom-scroll-bar">
          {step !== "setNewPass" && <p className="forgot-modal-description">{data.content}</p>}

          {step === "reset" && (
            <div className="forgot-input-form">
              <label htmlFor="forgot-email">Email:</label>
              <input
                id="forgot-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              {errEmail && <span>{errEmail}</span>}
            </div>
          )}
          {step === "setNewPass" && (
            <div className="forgot-input-form" style={{ margin: 0 }}>
              <label htmlFor="forgot-new-pass">New Password</label>
              <div className="password-with-eye-ball">
                <input
                  id="forgot-new-pass"
                  value={pass}
                  type={!passNewVisible ? "password" : "text"}
                  onChange={(e) => {
                    setPass(e.target.value)
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setNewPassVisible(!passNewVisible)
                  }}
                >
                  {!passNewVisible ? (
                    <img src="/img/modal/eyeball-visible.svg" alt="eyeball-new-visible" />
                  ) : (
                    <img src="/img/modal/eyeball-invisible.svg" alt="eyeball-new-invisible" />
                  )}
                </button>
              </div>
              {errPass && <span>{errPass}</span>}
            </div>
          )}
          {step === "setNewPass" && (
            <div className="forgot-input-form" style={{ margin: "25px 0 50px" }}>
              <label htmlFor="forgot-conf-pass">Confirm Password</label>
              <div className="password-with-eye-ball">
                <input
                  id="forgot-conf-pass"
                  value={confPass}
                  type={!passConfVisible ? "password" : "text"}
                  onChange={(e) => {
                    setConfPass(e.target.value)
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setConfPassVisible(!passConfVisible)
                  }}
                >
                  {!passConfVisible ? (
                    <img src="/img/modal/eyeball-visible.svg" alt="eyeball-conf-visible" />
                  ) : (
                    <img src="/img/modal/eyeball-invisible.svg" alt="eyeball-conf-invisible" />
                  )}
                </button>
              </div>
              {errConfPass && <span>{errConfPass}</span>}
            </div>
          )}
          {step === "checkEmail" && (
            <img className="forgot-check-email" src={data.img_src} alt="check-email" />
          )}
          <button
            className="forgot-pass-modal-button"
            type="submit"
            style={{ marginTop: step === "passChanged" ? "200px" : "" }}
          >
            {submitting ? <Loading /> : <span>{data.btnTitle}</span>}
          </button>
          {(step === "reset" || step === "checkEmail") && (
            <div className="reset-receive-link">
              <p>Didn&apos;t receive the link?</p>
              <button
                type="button"
                onClick={() => {
                  setStep("reset")
                }}
              >
                Resend
              </button>
            </div>
          )}
        </div>
      </form>
    </Modal>
  )
}

export default ForgotPassModal
