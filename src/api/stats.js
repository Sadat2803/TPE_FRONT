import api from './base'

export const getStats = async () => {
	const res = await api.get(`/stats`)
	return res.data
}

export const getStatsForSingleClient = async (id) => {
	const res = await api.get(`/stats/${id}`)
	return res.data
}
