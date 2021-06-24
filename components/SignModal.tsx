import React, { useState } from "react"
import { Modal, Checkbox } from "semantic-ui-react"
import config from "../static/config.json"
import Image from "next/image"
import logo from "../public/img/header/logo.png"
import { ValidateEmail, CheckPassword, CheckConfPass } from "../service/helper"
import Loading from "./Loading"
import APIClient from "../service/api-clients"
import apiConfig from "../config/config"
import { RegisterResParams, LoginResParams } from "../models/sign-params"

const apiClient = APIClient.getInstance()

type Props = {
  mobile?: boolean
}

const SignModal = ({ mobile }: Props) => {
  const [open, setOpen] = useState(false)
  const [signKey, setSignKey] = useState(true)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const [confPass, setConfPass] = useState("")
  const [errEmail, setErrEmail] = useState("")
  const [errUsername, setErrUsername] = useState("")
  const [errPass, setErrPass] = useState("")
  const [errConfPass, setErrConfPass] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!validate()) {
      return
    }
    setSubmitting(true)
    try {
      if (signKey) {
        const res = await apiClient.post<RegisterResParams>(apiConfig.REGISTER_API_URL, {
          email: email,
          password: pass,
          username: username,
        })
        if (res && res.success) {
          const logRes = await apiClient.post<LoginResParams>(apiConfig.LOGIN_API_URL, {
            email: email,
            password: pass,
          })
          if (logRes.success) {
            window.localStorage.setItem("token", logRes.token)
          }
        }
      }
    } catch (error) {
      // EMPTY
    } finally {
      setSubmitting(false)
    }
  }

  const init = () => {
    setEmail("")
    setUsername("")
    setPass("")
    setConfPass("")
  }

  const clearErr = () => {
    setErrEmail("")
    setErrUsername("")
    setErrPass("")
    setErrConfPass("")
  }

  const validate = () => {
    let result = true
    if (!email) {
      setErrEmail("E-Mail is required.")
      result = false
    } else if (!ValidateEmail(email)) {
      setErrEmail("E-Mail is not correct.")
      result = false
    }
    if (!username) {
      setErrUsername("Username is required.")
      result = false
    }
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
    if (signKey && !confPass) {
      setErrConfPass("Confirm password is required.")
      result = false
    } else if (signKey && !CheckConfPass(confPass, pass)) {
      setErrConfPass("Confirm Password is not matched with password.")
      result = false
    }
    setTimeout(() => {
      clearErr()
      init()
    }, 3000)
    return result
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <div>
          {!mobile ? (
            <div className="username">
              <div className="avatar">
                <img src={config.header.user.avatar} alt="avatar" />
              </div>
              <div className="user">
                <p className="name">{config.header.user.name}</p>
                <p>{config.header.user.info}</p>
              </div>
            </div>
          ) : (
            <p className="drawer-sign-trigger">{signKey ? "REGISTER" : "LOG IN"}</p>
          )}
        </div>
      }
      className="sign-modal"
    >
      <div className="sign-modal-header">
        <div>
          <p className="sign-main-title">Welcome</p>
          <p className="sign-sub-title">
            {signKey ? "Sign Up to continue" : "Sign In to continue"}
          </p>
        </div>
        <div className="sign-modal-header-logo">
          <Image src={logo} alt="logo" width="120" height="54" />
        </div>
      </div>
      <div className="sign-modal-content custom-scroll-bar">
        <div className="sign-modal-content-1">
          <div className="sign-input-form">
            <div>
              <p>E-Mail</p>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              {errEmail && <span>{errEmail}</span>}
            </div>
            {signKey && (
              <div>
                <p>Username</p>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                />
                {errUsername && <span>{errUsername}</span>}
              </div>
            )}
            <div>
              <p>Password</p>
              <input
                value={pass}
                type="password"
                onChange={(e) => {
                  setPass(e.target.value)
                }}
              />
              {errPass && <span>{errPass}</span>}
            </div>
            {signKey && (
              <div>
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
          </div>
          <div className="sign-vertical-liner">
            <div className="vertical-line" />
            <p>or</p>
            <div className="vertical-line" />
          </div>
          <div className="sign-with-social">
            <div>
              <div className="sign-with-social-logo" style={{ background: "white" }}>
                <img src="/img/sign-modal/google.png" alt="google-logo" />
              </div>
              <div className="sign-with-social-button">
                {signKey ? <p>SIGN UP WITH GOOGLE</p> : <p>SIGN IN WITH GOOGLE</p>}
              </div>
            </div>
            <div>
              <div className="sign-with-social-logo" style={{ background: "#8697F6" }}>
                <img src="/img/sign-modal/discord.png" alt="discord-logo" />
              </div>
              <div className="sign-with-social-button">
                {signKey ? <p>SIGN UP WITH DISCORD</p> : <p>SIGN IN WITH DISCORD</p>}
              </div>
            </div>
            <div>
              <div className="sign-with-social-logo" style={{ background: "#115C93" }}>
                <img src="/img/sign-modal/steam.png" alt="steam-logo" />
              </div>
              <div className="sign-with-social-button">
                {signKey ? <p>SIGN UP WITH STEAM</p> : <p>SIGN IN WITH STEAM</p>}
              </div>
            </div>
            <div>
              <div className="sign-with-social-logo" style={{ background: "#000000" }}>
                <img src="/img/sign-modal/games.png" alt="games-logo" />
              </div>
              <div className="sign-with-social-button">
                {signKey ? <p>SIGN UP WITH GAMES</p> : <p>SIGN IN WITH GAMES</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="sign-modal-content-2">
          <Checkbox label="Yes, I would like to receive e-mail offers and promotions from RLPlus" />
          <div className="sign-modal-button" onClick={handleSubmit}>
            {submitting ? <Loading /> : <p>{signKey ? "Register" : "Log In"}</p>}
          </div>
          {signKey ? (
            <p>
              Already have an account ? <span onClick={() => setSignKey(false)}>Log In</span>
            </p>
          ) : (
            <p>
              Don&apos;t have an account ? <span onClick={() => setSignKey(true)}>Register</span>
            </p>
          )}
          <p className="sign-modal-privacy-text">
            By creating an account, I agree to RLPlus’s Terms of Service, Privacy Policy and
            Intellectual Property Rights
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default SignModal
