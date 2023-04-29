import axios from '@/api/axios'

const pullUser = () => {
  return axios.get('/user')
}

export default {
  pullUser,
}
