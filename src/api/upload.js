import api from './base'

export const uploadSingleFile = async (file) => {
	const formData = new FormData()
	formData.append('file', file)
	const res = await api.post('/upload/one', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})

	return res.data
}
