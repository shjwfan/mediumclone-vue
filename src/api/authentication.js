import axios from '@/api/axios'

const login = credentials => {
  return axios.post('/users/login', {user: credentials})
}

const register = credentials => {
  return axios.post('/users', {user: credentials})
}

export default {
  login,
  register,
}
