import api from './base'

export const getChauffeurs = async (idTransporter, page, size) => {
	const res = await api.get(
		`/users?filter=chauffeur&fields=role&page=${page}&limit=${size}&sort=name&order=-1`
	)
	return res.data
}

export const getChauffeursByTransporter = async (idTransporter, page, size) => {
	const res = await api.get(
		`/users/transporter/${idTransporter}/chauffeurs?page=${page}&limit=${size}&sort=name&order=-1`
	)
	return res.data
}

export const getChauffeur = async (_id) => {
	const res = await api.get(`/users/${_id}`)
	return res.data
}

export const updateChauffeur = async (id, values) => {
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

export const toggleSuspendreChauffeur = async (id, suspendre) => {
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
