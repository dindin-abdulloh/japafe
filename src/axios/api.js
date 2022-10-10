import axios from 'axios'

export default axios.create({
  headers: { 'Access-Control-Allow-Origin': 'https://testingbengkel.herokuapp.com' },
  baseURL: 'http://ec2-43-206-107-140.ap-northeast-1.compute.amazonaws.com/digibengkel/api/v1/'
})
