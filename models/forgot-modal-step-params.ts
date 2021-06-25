export type ForgotModalStepParams = "reset" | "checkEmail" | "setNewPass" | "passChanged"

export interface ForgotModalDataParams {
  title: string
  content: string
  img_src: string
  btnTitle: string
}
