import axios from 'axios'

const API = axios.create({
  timeout: 10000,
  baseURL: 'https://pacific-headland-14893.herokuapp.com'
})

export default API
