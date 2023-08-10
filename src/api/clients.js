import api from './base'
import axios from 'axios'

export const getClients = async (page, size) => {
	const res = await api.get(
		`/users?filter=client&fields=role&page=${page}&limit=${size}`
	)
	return res.data
}

export const getSingleClient = async (_id) => {
	const res = await api.get(`/users/${_id}`)
	return res.data
}

export const getSingleTransporter = async (_id) => {
	const res = await api.get(`/users/${_id}`)
	return res.data
}

export const getSingleChauffeur = async (_id) => {
	const res = await api.get(`/users/${_id}`)
	return res.data
}

export const toggleSuspendreClient = async (id, suspendre) => {
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

export const updateClient = async (id, values) => {
	const params = new URLSearchParams()

	Object.entries(values).map((item) => params.append(item[0], item[1]))

	const config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const res = await api.patch(`/users/${id}`, params, config)

	return res.data
}

export const updateTransporter = async (id, values) => {
	const params = new URLSearchParams()

	Object.entries(values).map((item) => params.append(item[0], item[1]))

	const config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const res = await api.patch(`/users/${id}`, params, config)

	return res.data
}

export const deleteClient = async (id) => {
	const res = await api.delete(`/users/${id}`)
	return res.data
}

export const getComptabiliteClients = async (page, size) => {
	const res = await api.get(`/comptabilite/clients?size=${size}&page=${page}`)
	return res.data
}

export const updateClientAccount = async (data) => {
	const res = await api.patch('/profile', data)
	return res.data
}

export const updateTransporterAccount = async (data) => {
	const res = await api.patch('/profile', data)
	return res.data
}

export const updateChauffeurAccount = async (data) => {
	const res = await api.patch('/profile', data)
	return res.data
}

export const searchCommandesByPrixMinMaxForClient = async (
	min,
	max,
	client
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
			filter: `prix >= ${min} AND prix <= ${max} AND client_id = ${client}`,
		}),
	})

	return res.data
}

export const searchCommandesByDateForClient = async (min, max, transporter) => {
	const res = await axios({
		method: 'POST',
		url: `http://141.94.27.46:7701/indexes/commandes/search`,
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer QNYw4Apg0b7c9bc136c5fb1fa035556bfea22858bf951fdb183343460bd9f020ad7bd97f',
		},
		data: JSON.stringify({
			filter: `absolute_start_date_unix >= ${min} AND absolute_start_date_unix <= ${max} AND client_id = ${transporter}`,
		}),
	})

	return res.data
}
