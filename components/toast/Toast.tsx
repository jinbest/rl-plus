import React, { useEffect } from "react"
import "animate.css/animate.min.css"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast, cssTransition } from "react-toastify"
import { ToastMsgParams } from "./toast-msg-params"

const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut",
})

type Props = {
  param: ToastMsgParams
  resetStatus: () => void
}

const Toast = (props: Props) => {
  useEffect(() => {
    const { msg, isSuccess, isError, isWarning } = props.param

    if (isSuccess) {
      handleSuccess(msg)
    } else if (isError) {
      handleError(msg)
    } else if (isWarning) {
      handleWarn(msg)
    }
  }, [props])

  const handleSuccess = (alert: string) => {
    toast.success(alert, {
      transition: bounce,
    })
    props.resetStatus()
  }

  const handleWarn = (alert: string) => {
    toast.warn(alert, {
      transition: bounce,
    })
    props.resetStatus()
  }

  const handleError = (alert: string) => {
    toast.error(alert, {
      transition: bounce,
    })
    props.resetStatus()
  }

  return (
    <ToastContainer
      transition={bounce}
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

export default Toast
