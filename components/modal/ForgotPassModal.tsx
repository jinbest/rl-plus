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

  useEffect(() => {
    if (step === "reset") {
      setData(_.cloneDeep(thisPage.reset))
    } else if (step === "checkEmail") {
      setData(_.cloneDeep(thisPage.checkEmail))
    } else if (step === "setNewPass") {
      setData(_.cloneDeep(thisPage.setNewPass))
    } else if (step === "passChanged") {
      setData(_.cloneDeep(thisPage.passChanged))
    }
  }, [step])

  const init = () => {
    setEmail("")
    setPass("")
    setConfPass("")
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
    }, 3000)
  }

  const validate = () => {
    let result = true
    if (step === "reset") {
      if (!email) {
        setErrEmail("E-Mail is required.")
        result = false
      } else if (!ValidateEmail(email)) {
        setErrEmail("E-Mail is not correct.")
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
      <div className="forgot-pass-modal-container custom-scroll-bar">
        {step !== "setNewPass" && <p className="forgot-modal-description">{data.content}</p>}
        {step === "reset" && (
          <div className="forgot-input-form">
            <p>E-Mail:</p>
            <input
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
            <p>New Password</p>
            <input
              value={pass}
              type="password"
              onChange={(e) => {
                setPass(e.target.value)
              }}
            />
            {errPass && <span>{errPass}</span>}
          </div>
        )}
        {step === "setNewPass" && (
          <div className="forgot-input-form" style={{ margin: "25px 0 50px" }}>
            <p>Confirm Password</p>
            <input
              value={confPass}
              type="password"
              onChange={(e) => {
                setConfPass(e.target.value)
              }}
            />
            {errConfPass && <span>{errConfPass}</span>}
          </div>
        )}
        {step === "checkEmail" && (
          <img className="forgot-check-email" src={data.img_src} alt="check-email" />
        )}
        <div
          className="forgot-pass-modal-button"
          onClick={handleSubmit}
          style={{ marginTop: step === "passChanged" ? "200px" : "" }}
        >
          {submitting ? <Loading /> : <p>{data.btnTitle}</p>}
        </div>
        {(step === "reset" || step === "checkEmail") && (
          <p>
            Didn&apos;t receive the link?{" "}
            <span
              onClick={() => {
                setStep("reset")
              }}
            >
              Resend
            </span>
          </p>
        )}
      </div>
    </Modal>
  )
}

export default ForgotPassModal
