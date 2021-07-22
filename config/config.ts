const apiURL = "http://93.99.104.61:5000"
export default class Config {
  /* auth */
  static REGISTER_API_URL = `${apiURL}/api/auth/register`
  static LOGIN_API_URL = `${apiURL}/api/auth/login`
  static GOOGLE_AUTH_SIGN_IN = `${apiURL}/api/auth/googleAuthSingIn`
  static GOOGLE_AUTH_SIGN_UP = `${apiURL}/api/auth/googleAuthSignUp`
  static STEAM_URL = `${apiURL}/api/auth/steam`
  static DISCORD_URL = `${apiURL}/api/auth/discord`
  static STEAM_SIGN_UP = `${apiURL}/api/auth/signUpWithSteamAccount`
  static DISCORD_SIGN_UP = `${apiURL}/api/auth/signUpWithDiscordAccount`
  static AUTH_TOKEN_TEST = `${apiURL}/api/auth/authTokenTest`
  static API_URL = apiURL

  /* news */
  static NEWS_RECENT = `${apiURL}/api/news/recent`
  static NEWS_ALL = `${apiURL}/api/news/all`
  static NEWS_ID = `${apiURL}/api/news`

  /* user */
  static USER_SKILL = `${apiURL}/api/user/skill`
  static USER_SEARCH = `${apiURL}/api/user/search`

  /* communities */
  static GET_COUNT = `${apiURL}/api/getCount`
}
