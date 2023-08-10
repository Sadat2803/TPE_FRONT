import api from './base'

export const createTarif = async (data) => {
	const res = await api.post('/tarif', data)
	return res.data
}

export const getTarif = async (type="MISEADISPO") => {
	const res = await api.get(`/tarif?type=${type}`)
	return res.data
}



export const payTarif = async (data) => {
	const res = await api.post('/tarif/pay', data)
	return res.data
}