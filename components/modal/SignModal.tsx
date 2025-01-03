import React, { useState, useEffect } from "react"
import { Modal, Checkbox } from "semantic-ui-react"
import Image from "next/image"
import logo from "../../public/img/header/logo.png"
import { ValidateEmail, CheckPassword } from "../../service/helper"
import Loading from "../Loading"
import APIClient from "../../service/api-clients"
import apiConfig from "../../config/config"
import { SignResParam } from "../../models/sign-params"
import { ToastMsgParams } from "../toast/toast-msg-params"
import { CheckPassParam } from "../../models/check-pass-param"
import { useRouter } from "next/router"
import GoogleAuth from "./oauth-comp/GoogleAuth"

const apiClient = APIClient.getInstance()

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  setForgotModal: (val: boolean) => void
  setToastParam: (val: ToastMsgParams) => void
  signKey: boolean
  setSignKey: (val: boolean) => void
}

const SignModal = ({
  open,
  setOpen,
  setForgotModal,
  setToastParam,
  signKey,
  setSignKey,
}: Props) => {
  const router = useRouter()

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
        const res = await apiClient.post<SignResParam>(apiConfig.REGISTER_API_URL, {
          email: email,
          password: pass,
          username: username,
        })
        if (res && res.success && res.token) {
          window.localStorage.setItem("token", res.token)
          setOpen(false)
        }
      } else {
        const logRes = await apiClient.post<SignResParam>(apiConfig.LOGIN_API_URL, {
          email: email,
          password: pass,
        })
        if (logRes.success && logRes.token) {
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

  const signWithSteam = () => {
    const popupWindow = window.open(apiConfig.STEAM_URL)
    if (typeof window !== "undefined" && window.focus && popupWindow) {
      popupWindow.focus()
    }
  }

  const signWithDiscord = () => {
    const popupWindow = window.open(apiConfig.DISCORD_URL)
    if (typeof window !== "undefined" && window.focus && popupWindow) {
      popupWindow.focus()
    }
  }

  useEffect(() => {
    window.addEventListener("message", async (event) => {
      if (event.origin !== apiConfig.API_URL) return
      const { token, ok, mode } = event.data

      console.log("event.data", event.data)

      if (mode === "discord") {
        if (ok) {
          if (token) {
            localStorage.setItem("token", token)
            setToastParam({
              msg: "You've signed with Discord account successfully.",
              isSuccess: true,
            })
          }
          setOpen(false)
        } else {
          const discordID = event.data.id,
            username = event.data.name,
            discrim = event.data.discrim
          signSocialAccount(discordID, username, discrim)
        }
      } else if (mode === "steam") {
        if (ok) {
          if (token) {
            localStorage.setItem("token", token)
            setToastParam({
              msg: "You've signed with Steam account successfully.",
              isSuccess: true,
            })
          }
          setOpen(false)
        } else {
          const steamId = event.data.id,
            username = event.data.name
          signSocialAccount(steamId, username)
        }
      }
    })
  }, [])

  const signSocialAccount = async (id: number, username: string, discrim?: string) => {
    const API_URL = discrim ? apiConfig.DISCORD_SIGN_UP : apiConfig.STEAM_SIGN_UP

    let msg = discrim
        ? "You've signed with Discord account successfully."
        : "You've signed with Steam account successfully.",
      isFailed = false

    try {
      const res = discrim
        ? await apiClient.post<SignResParam>(API_URL, {
            discordId: id,
            username: username,
            discrim: discrim,
          })
        : await apiClient.post<SignResParam>(API_URL, {
            steamId: id,
            username: username,
          })
      if (res.success && res.token) {
        window.localStorage.setItem("token", res.token)
        setOpen(false)
      } else if (res.message) {
        msg = res.message
        isFailed = true
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
    }
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
          <h2 className="sign-main-title">Welcome</h2>
          <p className="sign-sub-title">
            {signKey ? "Sign Up to continue" : "Sign In to continue"}
          </p>
        </div>
        <div className="sign-modal-header-logo">
          <Image src={logo} alt="logo" width="120" height="54" />
        </div>
      </div>
      <div className="sign-modal-content custom-scroll-bar">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
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
                    <span style={{ color: checkPass.character ? "#00FF19" : "" }}>
                      8 characters
                    </span>
                    , <span style={{ color: checkPass.number ? "#00FF19" : "" }}>1 number</span> and{" "}
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
                    type="button"
                    onClick={() => {
                      setPassVisible(!passVisible)
                    }}
                  >
                    {!passVisible ? (
                      <Image
                        width="20"
                        height="20"
                        src="/img/modal/eyeball-visible.svg"
                        alt="eyeball-visible"
                      />
                    ) : (
                      <Image
                        width="20"
                        height="20"
                        src="/img/modal/eyeball-invisible.svg"
                        alt="eyeball-invisible"
                      />
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
                      <p style={{ marginRight: "5px" }}>{checkPass.strength}</p>
                      <Image width="11" height="11" src="/img/modal/info.png" alt="info" />
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
            <div className="sign-horizontal-liner">
              <div className="horizontal-line" />
              <p>or</p>
              <div className="horizontal-line" />
            </div>
            <div className="sign-with-social">
              <GoogleAuth signKey={signKey} setOpen={setOpen} setToastParam={setToastParam} />
              <button type="button" onClick={signWithDiscord}>
                <span className="sign-with-social-logo" style={{ background: "#8697F6" }}>
                  <div style={{ margin: "auto" }}>
                    <Image width="24" height="18" src="/img/modal/discord.png" alt="discord-logo" />
                  </div>
                </span>
                <span className="sign-with-social-button">
                  {signKey ? <span>SIGN UP WITH DISCORD</span> : <span>SIGN IN WITH DISCORD</span>}
                </span>
              </button>
              <button type="button" onClick={signWithSteam}>
                <span className="sign-with-social-logo" style={{ background: "#115C93" }}>
                  <div style={{ margin: "auto" }}>
                    <Image width="24" height="24" src="/img/modal/steam.png" alt="steam-logo" />
                  </div>
                </span>
                <span className="sign-with-social-button">
                  {signKey ? <span>SIGN UP WITH STEAM</span> : <span>SIGN IN WITH STEAM</span>}
                </span>
              </button>
              {/* <button
                type="button"
                onClick={() => {
                  console.log("Games-OAuth-Login")
                }}
              >
                <span className="sign-with-social-logo" style={{ background: "#000000" }}>
                  <div style={{ margin: "auto" }}>
                    <Image width="24" height="28" src="/img/modal/games.png" alt="games-logo" />
                  </div>
                </span>
                <span className="sign-with-social-button">
                  {signKey ? (
                    <span>SIGN UP WITH EPIC GAMES</span>
                  ) : (
                    <span>SIGN IN WITH EPIC GAMES</span>
                  )}
                </span>
              </button> */}
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
              type="submit"
              style={{ opacity: disable ? 0.7 : "inherit" }}
            >
              {submitting ? <Loading /> : <span>{signKey ? "Register" : "Log In"}</span>}
            </button>
            {signKey ? (
              <div className="switch-register-login">
                <p>Already have an account ?</p>
                <button
                  type="button"
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
                  type="button"
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
                type="button"
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
        </form>
      </div>
    </Modal>
  )
}

export default SignModal
