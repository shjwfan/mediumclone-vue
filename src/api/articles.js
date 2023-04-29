import axios from '@/api/axios'

const pullArticles = pullingUrl => {
  return axios.get(pullingUrl)
}

export default {
  pullArticles,
}
