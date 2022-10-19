import axios from 'axios'

export default axios.create({
  headers: { 'Access-Control-Allow-Origin': 'https://testingbengkel.herokuapp.com' },
  baseURL: 'http://54.65.89.147/digi/api/v1/'
})
