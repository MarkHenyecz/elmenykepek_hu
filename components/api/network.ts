import Axios from 'axios'

const network = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

network.interceptors.request.use(
  async reqConfig => {
    let accessToken = localStorage.getItem('token')
    if (accessToken) {
        reqConfig.headers['Authorization'] = 'Bearer ' + accessToken
    }
    return reqConfig
  },
  error => {
    Promise.reject(error)
  },
)

if (process.env.NEXT_PUBLIC_API_LOG_REQUESTS == "true") {
  network.interceptors.response.use(response => {
    console.log(response.status, response.statusText ?? '')
    if (response.data) {
      console.log(response.data)
    }
    return response
  })

  network.interceptors.request.use(request => {
    console.log(request.baseURL + '/' + request.url)
    console.log(JSON.stringify(request.params))
    console.log(JSON.stringify(request.data))
    if (request.data) {
      console.log(JSON.stringify(request.data))
    }
    return request
  })
}

network.interceptors.response.use(response => {
  if (typeof response.headers.pagination === 'string') {
    response.headers.pagination = JSON.parse(response.headers.pagination)
  }

  return response
})

export default network
