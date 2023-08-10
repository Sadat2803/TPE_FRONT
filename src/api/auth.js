import api from './base'

export const signup = async (data) => {
	const res = await api.post('/register', data)
	return res.data
}

export const login = async (email, password) => {
	const params = new URLSearchParams()
	params.append('email', email)
	params.append('password', password)

	const res = await api.post('/login', params, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})

	return res.data
}

export const getUser = async (_id) => {
	const res = await api.get(`/users/${_id}`)
	return res.data
}
