import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api'

axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (token) {
    token = `Token ${JSON.parse(token)}`
    config.headers.Authorization = token
  }
  return config
})

export default axios
