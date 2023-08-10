import api from './base'

export const createCommande = async (data) => {
	const res = await api.post('/commandes', data)
	return res.data
}

export const getCommande = async (id) => {
	const res = await api.get(`/commandes/${id}`)
	return res.data
}

export const getCommandesbyClientIdByDay = async (clientId) => {
	const res = await api.get(`/commandes/client/${clientId}/all/day`)
	return res.data
}

export const getCommandesbyTransporterId = async (transporterId) => {
	const res = await api.get(`/commandes/transporter/${transporterId}`)
	return res.data
}

export const getAllCommandesByClientId = async (clientId) => {
	const res = await api.get(
		`/commandes/client/${clientId}/all?page=1&limit=100`
	)
	return res.data
}

export const getCommandesByClientIDByMonth = async (clientID) => {
	const res = await api.get(`/commandes/client/${clientID}/all/month`)
	return res.data
}

export const getCommandesByTransporterIDByMonth = async (clientID) => {
	const res = await api.get(`/commandes/transporter/${clientID}/all/month`)
	return res.data
}

export const getCommandesPaginated = async (page, size) => {
	const res = await api.get(`/commandes?page=${page}&limit=${size}`)
	return res.data
}

export const getCommandesPaginatedForAdmin = async (page, size) => {
	const res = await api.get(`/commandes/foradmin?page=${page}&limit=${size}`)
	return res.data
}

export const getCommandesWithTransporter = async (page, size) => {
	const res = await api.get(`/commandes/attribuer?page=${page}&limit=${size}`)
	return res.data
}

export const getCommandesWithAnomalies = async (page, size) => {
	const res = await api.get(`/commandes/anomalies?page=${page}&limit=${size}`)
	return res.data
}

export const getCommandesPlateForme = async (page, size) => {
	const res = await api.get(
		`/commandes/plateforme?page=${page}&limit=${size}`
	)
	return res.data
}

export const getCommandesForSalon = async (page, size) => {
	const res = await api.get(`/commandes/salon?page=${page}&limit=${size}`)
	return res.data
}

export const acceptCommande = async (commandeID, transporterID) => {
	const params = new URLSearchParams()
	params.append('transporterID', transporterID)
	//params.append('salon', false)

	const config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const res = await api.patch(`/commandes/${commandeID}`, params, config)

	return res.data
}

export const validateAttributionCommandes = async (commandes) => {
	const res = await api.post('/commandes/attribution', {
		commandes,
		salon: false,
	})

	return res.data
}

export const getCommandesByTransporter = async (_id) => {
	const res = await api.get(`/commandes/bytransporter/${_id}`)
	return res.data
}

export const getCommandesForTransporter = async (_id) => {
	const res = await api.get(`/commandes/fortransporter/${_id}`)
	return res.data
}

export const attributionCommandes = async (commandes, chauffeurID) => {
	const res = await api.post('/commandes/attribution', {
		commandes,
		chauffeurID,
	})

	return res.data
}

export const attributionCommandesTransporter = async (
	commandes,
	transporterID
) => {
	const res = await api.post('/commandes/attribution', {
		commandes,
		transporterID,
	})

	return res.data
}

export const attributionCommandeForSalon = async (commandes) => {
	const res = await api.post('/commandes/salon', {
		commandes,
	})

	return res.data
}

export const getCommandesByChauffeur = async (_id) => {
	const res = await api.get(`/commandes//byChauffeur/${_id}`)
	return res.data
}

export const updateRecuCommande = async (commandeID) => {
	const params = new URLSearchParams()
	params.append('recu', true)

	const config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const res = await api.patch(`/commandes/${commandeID}`, params, config)

	return res.data
}

export const updateCommandeWayPoints = async (commandeID, data) => {
	const res = await api.patch(`/commandes/${commandeID}`, data)
	return res.data
}

export const updateStatutOnlyCommande = async (commandeID, statut) => {
	const params = new URLSearchParams()
	params.append('statut', statut)

	const config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const res = await api.patch(`/commandes/${commandeID}`, params, config)

	return res.data
}

export const updateStatutCommande = async (
	commandeID,
	statut,
	transporterID
) => {
	const params = new URLSearchParams()
	params.append('statut', statut)
	params.append('transporterID', transporterID)

	const config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const res = await api.patch(`/commandes/${commandeID}`, params, config)

	return res.data
}

export const deleteCommande = async (id) => {
	const res = await api.delete(`/commandes/${id}`)
	return res.data
}

export const deleteManyCommandes = async (commandes) => {
	const res = await api.post('/commandes/delete', { commandes })
	return res.data
}

export const updatePaymentForCommande = async (
	commandeID,
	prix,
	paymentStatus,
	paymentNote
) => {
	const params = new URLSearchParams()
	params.append('prix', prix)
	params.append('paymentNote', paymentNote)
	params.append('paymentStatus', paymentStatus)

	const config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const res = await api.patch(`/commandes/${commandeID}`, params, config)

	return res.data
}

export const updateCommandesMargin = async (
	commandes,
	margin
) => {
	const res = await api.post('/commandes/margin', {
		commandes,
		margin,
	})

	return res.data
}
