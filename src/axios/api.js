import axios from 'axios'

export default axios.create({
  headers: { 'Access-Control-Allow-Origin': 'https://testingbengkel.herokuapp.com' },
  baseURL: 'https://testingbengkel.herokuapp.com/api/v1/'
})
