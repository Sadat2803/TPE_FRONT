import Cookies from 'js-cookie'
import axios from 'axios'

export const BASE_URL =
	process.env.NODE_ENV === 'production'
		? 'https://b2bglob.com/'
		: 'http://localhost:3001'
export const PUBLIC = `${BASE_URL}/media`
//export const PUBLIC = `http://141.94.27.46:3000/media`

const api = axios.create({ baseURL: BASE_URL })

// This for the client side
api.interceptors.request.use((config) => {
	const jwt = Cookies.get('jwt')
	if (jwt) {
		config.headers.Authorization = ''
		delete config.headers.Authorization
		config.headers.Authorization = `Bearer ${jwt}`
	}
	return config
})

export default api
