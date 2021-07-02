import React from "react"
import { GoogleLogin } from "react-google-login"
import { clientID } from "../../../static/mock-data"
import apiConfig from "../../../config/config"
import { SignResParam } from "../../../models/sign-params"
import { ToastMsgParams } from "../../toast/toast-msg-params"
import APIClient from "../../../service/api-clients"

const apiClient = APIClient.getInstance()

type Props = {
  signKey: boolean
  setOpen: (val: boolean) => void
  setToastParam: (val: ToastMsgParams) => void
}

const GoogleAuth = ({ signKey, setOpen, setToastParam }: Props) => {
  const handleGoogle = async (googleData: any) => {
    if (googleData.error) return

    const API_URL = signKey ? apiConfig.GOOGLE_AUTH_SIGN_UP : apiConfig.GOOGLE_AUTH_SIGN_IN

    let msg = signKey
        ? "You've been registered with gmail successfully."
        : "You've been logged in successfully.",
      isFailed = false

    try {
      const res = await apiClient.post<SignResParam>(API_URL, {
        token: googleData.tokenId,
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
    <GoogleLogin
      clientId={clientID}
      render={(renderProps) => (
        <button type="button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <span className="sign-with-social-logo" style={{ background: "white" }}>
            <img src="/img/modal/google.png" alt="google-logo" />
          </span>
          <span className="sign-with-social-button">
            {signKey ? <span>SIGN UP WITH GOOGLE</span> : <span>SIGN IN WITH GOOGLE</span>}
          </span>
        </button>
      )}
      onSuccess={handleGoogle}
      onFailure={handleGoogle}
      cookiePolicy={"single_host_origin"}
    />
  )
}

export default GoogleAuth
