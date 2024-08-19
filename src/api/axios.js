import axios from 'axios'

const $api = axios.create({
  baseURL: 'https://api.anilibria.tv/v3/'
})

export default $api
