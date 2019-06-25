/* eslint-disable */
import axios from 'axios'

// create an axios instance

const service = axios.create({
  baseURL: process.env.BASE_API, // api из base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

export default service
