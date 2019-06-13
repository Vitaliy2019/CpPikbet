import axios from 'axios'
let options = {}
if (process.SERVER_BUILD) {
  options.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:50032' : 'https://api.acrtr.ru'
}
let ax = {
  options,
  create: (token) => {
    options.headers = {
      Authorization: token
    }
    return axios.create(ax.options)
  }
}
export default ax
