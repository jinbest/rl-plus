import React, { useState, useEffect } from "react"
import { Modal, Checkbox } from "semantic-ui-react"
import Image from "next/image"
import logo from "../../public/img/header/logo.png"
import { ValidateEmail, CheckPassword } from "../../service/helper"
import Loading from "../Loading"
import APIClient from "../../service/api-clients"
import apiConfig from "../../config/config"
import { RegisterResParams, LoginResParams } from "../../models/sign-params"
import { ToastMsgParams } from "../toast/toast-msg-params"
import { CheckPassParam } from "../../models/check-pass-param"
import { useRouter } from "next/router"

const apiClient = APIClient.getInstance()

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  setForgotModal: (val: boolean) => void
  setToastParam: (val: ToastMsgParams) => void
}

const SignModal = ({ open, setOpen, setForgotModal, setToastParam }: Props) => {
  const router = useRouter()

  const [signKey, setSignKey] = useState(true)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const [errEmail, setErrEmail] = useState("")
  const [errUsername, setErrUsername] = useState("")
  const [errPass, setErrPass] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [check, setCheck] = useState(false)
  const [checkPass, setCheckPass] = useState<CheckPassParam>(CheckPassword(""))
  const [disable, setDisable] = useState(true)
  const [passVisible, setPassVisible] = useState(false)

  const handleSubmit = async () => {
    if (!validate()) {
      return
    }
    setSubmitting(true)
    let msg = "You've been registered successfully.",
      isFailed = false
    try {
      if (signKey) {
        const res = await apiClient.post<RegisterResParams>(apiConfig.REGISTER_API_URL, {
          email: email,
          password: pass,
          username: username,
        })
        if (res && res.success) {
          window.localStorage.setItem("token", res.token)
          setOpen(false)
        }
      } else {
        const logRes = await apiClient.post<LoginResParams>(apiConfig.LOGIN_API_URL, {
          email: email,
          password: pass,
        })
        if (logRes.success) {
          window.localStorage.setItem("token", logRes.token)
          msg = "You've logged in successfully."
          setOpen(false)
        } else {
          msg = "Password mismatch."
          isFailed = true
        }
      }
    } catch (error) {
      msg = "Something went wrong."
      isFailed = true
    } finally {
      setToastParam({
        msg,
        isSuccess: !isFailed,
        isError: isFailed,
      })
      setSubmitting(false)
    }
  }

  const init = () => {
    setEmail("")
    setUsername("")
    setPass("")
  }

  const clearErr = () => {
    setErrEmail("")
    setErrUsername("")
    setErrPass("")
  }

  useEffect(() => {
    if (((signKey && username) || !signKey) && email && pass) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [username, email, pass])

  const validate = () => {
    let result = true
    if (!email) {
      setErrEmail("Email is required.")
      result = false
    } else if (!ValidateEmail(email)) {
      setErrEmail("Email is not correct.")
      result = false
    }
    if (signKey && !username) {
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
    setTimeout(() => {
      clearErr()
      init()
    }, 3000)
    return result
  }

  const handleCheckedChange = (checked: boolean | undefined) => {
    setCheck(checked || false)
  }

  const handleChangePassword = (val: string) => {
    setPass(val)
    setCheckPass(CheckPassword(val))
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
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
            {signKey && (
              <div>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                />
                {errUsername && <span>{errUsername}</span>}
              </div>
            )}
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              {errEmail && <span>{errEmail}</span>}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              {signKey && pass && (
                <p className="password-status">
                  At least{" "}
                  <span style={{ color: checkPass.character ? "#00FF19" : "" }}>8 characters</span>,{" "}
                  <span style={{ color: checkPass.number ? "#00FF19" : "" }}>1 number</span> and{" "}
                  <span style={{ color: checkPass.letter ? "#00FF19" : "" }}>1 letter</span>.
                </p>
              )}
              <div className="password-with-eye-ball">
                <input
                  id="password"
                  value={pass}
                  type={!passVisible ? "password" : "text"}
                  onChange={(e) => {
                    handleChangePassword(e.target.value)
                  }}
                />
                <button
                  onClick={() => {
                    setPassVisible(!passVisible)
                  }}
                >
                  {!passVisible ? (
                    <img src="/img/modal/eyeball-visible.svg" alt="eyeball-visible" />
                  ) : (
                    <img src="/img/modal/eyeball-invisible.svg" alt="eyeball-invisible" />
                  )}
                </button>
              </div>
              {signKey && pass && (
                <div className="pass-status-progress">
                  <div className="custom-progress-bar">
                    <div
                      style={{
                        background:
                          checkPass.strength === "Weak"
                            ? "#E00000"
                            : checkPass.strength === "Fair"
                            ? "#FFC700"
                            : checkPass.strength === "Strong"
                            ? "#006A04"
                            : "",
                      }}
                    />
                    <div
                      style={{
                        background:
                          checkPass.strength === "Fair"
                            ? "#FFC700"
                            : checkPass.strength === "Strong"
                            ? "#006A04"
                            : "",
                      }}
                    />
                    <div
                      style={{
                        background: checkPass.strength === "Strong" ? "#006A04" : "",
                      }}
                    />
                  </div>
                  <div>
                    <p>{checkPass.strength}</p>
                    <img src="img/modal/info.png" alt="info" />
                  </div>
                </div>
              )}
              {errPass && <span>{errPass}</span>}
            </div>
          </div>
          <div className="sign-vertical-liner">
            <div className="vertical-line" />
            <p>or</p>
            <div className="vertical-line" />
          </div>
          <div className="sign-with-social">
            <button>
              <span className="sign-with-social-logo" style={{ background: "white" }}>
                <img src="/img/modal/google.png" alt="google-logo" />
              </span>
              <span className="sign-with-social-button">
                {signKey ? <span>SIGN UP WITH GOOGLE</span> : <span>SIGN IN WITH GOOGLE</span>}
              </span>
            </button>
            <button>
              <span className="sign-with-social-logo" style={{ background: "#8697F6" }}>
                <img src="/img/modal/discord.png" alt="discord-logo" />
              </span>
              <span className="sign-with-social-button">
                {signKey ? <span>SIGN UP WITH DISCORD</span> : <span>SIGN IN WITH DISCORD</span>}
              </span>
            </button>
            <button>
              <span className="sign-with-social-logo" style={{ background: "#115C93" }}>
                <img src="/img/modal/steam.png" alt="steam-logo" />
              </span>
              <span className="sign-with-social-button">
                {signKey ? <span>SIGN UP WITH STEAM</span> : <span>SIGN IN WITH STEAM</span>}
              </span>
            </button>
            <button>
              <span className="sign-with-social-logo" style={{ background: "#000000" }}>
                <img src="/img/modal/games.png" alt="games-logo" />
              </span>
              <span className="sign-with-social-button">
                {signKey ? (
                  <span>SIGN UP WITH EPIC GAMES</span>
                ) : (
                  <span>SIGN IN WITH EPIC GAMES</span>
                )}
              </span>
            </button>
          </div>
        </div>
        <div className="sign-modal-content-2">
          {signKey && (
            <Checkbox
              checked={check}
              onChange={(e, { checked }) => handleCheckedChange(checked)}
              label="Yes, I would like to receive email offers and promotions from RLPlus"
            />
          )}
          <button
            disabled={disable}
            className="sign-modal-button"
            onClick={handleSubmit}
            style={{ opacity: disable ? 0.7 : "inherit" }}
          >
            {submitting ? <Loading /> : <span>{signKey ? "Register" : "Log In"}</span>}
          </button>
          {signKey ? (
            <div className="switch-register-login">
              <p>Already have an account ?</p>
              <button
                onClick={() => {
                  init()
                  setSignKey(false)
                }}
              >
                Log In
              </button>
            </div>
          ) : (
            <div className="switch-register-login">
              <p>Don&apos;t have an account ?</p>
              <button
                onClick={() => {
                  init()
                  setSignKey(true)
                }}
              >
                Register now
              </button>
            </div>
          )}
          {signKey && (
            <p className="sign-modal-privacy-text">
              {`By creating an account, I agree to RL.Plus's${" "}`}
              <a
                onClick={() => {
                  setOpen(false)
                  router.push("/terms-of-service")
                }}
              >
                Terms of Service
              </a>
              {`${" "}and${" "}`}
              <a
                onClick={() => {
                  setOpen(false)
                  router.push("/privacy-policy")
                }}
              >
                Privacy Policy
              </a>
            </p>
          )}
          {!signKey && (
            <button
              className="forgot-password-button"
              onClick={() => {
                setForgotModal(true)
                init()
                setOpen(false)
              }}
            >
              Forgot Password?
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default SignModal
