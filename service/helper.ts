export function getWidth() {
  if (typeof window !== "undefined") {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  }
  return 0
}

export function ValidateEmail(e: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(e)
}

export function CheckPassword(pass: string) {
  let result = {
    status: true,
    msg: "Password is good",
  }
  if (pass.length < 6) {
    result = {
      status: false,
      msg: "Password Should be Minimum 6 Characters",
    }
  } else {
    let strength = 0
    if (pass.match(/[a-z]+/)) {
      strength += 1
    }
    if (pass.match(/[A-Z]+/)) {
      strength += 1
    }
    if (pass.match(/[0-9]+/)) {
      strength += 1
    }
    if (pass.match(/[$@#&!]+/)) {
      strength += 1
    }
    if (strength < 3) {
      result = {
        status: false,
        msg: "Password is too weak.",
      }
    }
  }
  return result
}

export function CheckConfPass(confPass: string, pass: string) {
  if (pass === confPass) {
    return true
  } else {
    return false
  }
}
