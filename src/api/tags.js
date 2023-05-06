import axios from '@/api/axios'

const pullTags = () => {
  return axios.get('/tags')
}

export default {
  pullTags,
}
