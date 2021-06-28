const apiURL = "http://185.248.33.127:5000"
export default class Config {
  static REGISTER_API_URL = `${apiURL}/api/user/register`
  static LOGIN_API_URL = `${apiURL}/api/user/login`
  static GOOGLE_AUTH_LOGIN = `${apiURL}/api/user/googleAuth`
  static NEWS_RECENT = `${apiURL}/api/news/recent`
  static NEWS_ALL = `${apiURL}/api/news/all`
  static NEWS_ID = `${apiURL}/api/news`
}
