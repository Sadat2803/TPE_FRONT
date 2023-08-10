import api from './base'
import axios from 'axios'

export const getTransporteurs = async (page, size) => {
	const res = await api.get(
		`/users?filter=transporter&fields=role&page=${page}&limit=${size}`
	)
	return res.data
}

export const getNewTransporters = async (page, size) => {
	const res = await api.get(
		`/users/transporters/new?page=${page}&limit=${size}`
	)

	return res.data
}

export const getValidTransporters = async (page, size) => {
	const res = await api.get(
		`/users/transporters/valid?page=${page}&limit=${size}`
	)

	return res.data
}

export const getSingleTransporteur = async (_id) => {
	const res = await api.get(`/users/${_id}`)
	return res.data
}

export const updateTransporterStatus = async (id, status) => {
	const params = new URLSearchParams()

	params.append('status', status)

	const config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const res = await api.patch(`/users/${id}`, params, config)

	return res.data
}

export const deleteTransporter = async (id) => {
	const res = await api.delete(`/users/${id}`)
	return res.data
}

export const getSingleTransporter = async (_id) => {
	const res = await api.get(`/users/${_id}`)
	return res.data
}

export const toggleSuspendreTransporter = async (id, suspendre) => {
	const params = new URLSearchParams()
	params.append('suspendre', suspendre)

	const config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const res = await api.patch(`/users/${id}`, params, config)

	return res.data
}
export const getComptabiliteTransporteurs = async (page, size) => {
	const res = await api.get(
		`/comptabilite/transporteurs?size=${size}&page=${page}`
	)
	return res.data
}

export const searchCommandesByPrixMinMaxForTransporter = async (
	min,
	max,
	transporter
) => {
	const res = await axios({
		method: 'POST',
		url: `http://141.94.27.46:7701/indexes/commandes/search`,
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer QNYw4Apg0b7c9bc136c5fb1fa035556bfea22858bf951fdb183343460bd9f020ad7bd97f',
		},
		data: JSON.stringify({
			filter: `prix >= ${min} AND prix <= ${max} AND transporter_id = ${transporter}`,
		}),
	})

	return res.data
}

export const searchCommandesByDateForTransporter = async (
	min,
	max,
	transporter
) => {
	const res = await axios({
		method: 'POST',
		url: `http://141.94.27.46:7701/indexes/commandes/search`,
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer QNYw4Apg0b7c9bc136c5fb1fa035556bfea22858bf951fdb183343460bd9f020ad7bd97f',
		},
		data: JSON.stringify({
			filter: `absolute_start_date_unix >= ${min} AND absolute_start_date_unix <= ${max} AND transporter_id = ${transporter}`,
		}),
	})

	return res.data
}
