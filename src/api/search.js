import axios from 'axios'

export const geoSearchChauffeurs = async (lat, lng, radius) => {
	const res = await axios({
		method: 'POST',
		url: 'http://141.94.27.46:7701/indexes/users/search',
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer QNYw4Apg0b7c9bc136c5fb1fa035556bfea22858bf951fdb183343460bd9f020ad7bd97f',
		},
		data: JSON.stringify({
			filter: `_geoRadius(${lat}, ${lng}, ${radius})`,
		}),
	})

	return res.data
}

export const searchCommandesByClientAndTransporter = async (query) => {
	const res = await axios({
		method: 'GET',
		url: `http://141.94.27.46:7701/indexes/commandes/search?q=${query}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer QNYw4Apg0b7c9bc136c5fb1fa035556bfea22858bf951fdb183343460bd9f020ad7bd97f',
		},
	})

	return res.data
}

export const searchCommandesByPrixMinMax = async (min, max) => {
	const res = await axios({
		method: 'POST',
		url: `http://141.94.27.46:7701/indexes/commandes/search`,
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer QNYw4Apg0b7c9bc136c5fb1fa035556bfea22858bf951fdb183343460bd9f020ad7bd97f',
		},
		data: JSON.stringify({
			filter: `prix >= ${min} AND prix <= ${max}`,
		}),
	})

	return res.data
}

export const searchCommandesByDate = async (min, max) => {
	const res = await axios({
		method: 'POST',
		url: `http://141.94.27.46:7701/indexes/commandes/search`,
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer QNYw4Apg0b7c9bc136c5fb1fa035556bfea22858bf951fdb183343460bd9f020ad7bd97f',
		},
		data: JSON.stringify({
			filter: `absolute_start_date_unix >= ${min} AND absolute_start_date_unix <= ${max}`,
		}),
	})

	return res.data
}

export const fullTextSearchChauffeurs = async (q) => {
	const res = await axios({
		method: 'GET',
		url: `http://141.94.27.46:7701/indexes/users/search?q=${q}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer QNYw4Apg0b7c9bc136c5fb1fa035556bfea22858bf951fdb183343460bd9f020ad7bd97f',
		},
	})

	return res.data
}

export const fullTextSearchClients = async (q) => {
	const res = await axios({
		method: 'GET',
		url: `http://141.94.27.46:7701/indexes/users/search?q=${q}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer QNYw4Apg0b7c9bc136c5fb1fa035556bfea22858bf951fdb183343460bd9f020ad7bd97f',
		},
		data: JSON.stringify({
			filter: `role = client`,
		}),
	})

	return res.data
}

export const fullTextSearchTransporteurs = async (q) => {
	const res = await axios({
		method: 'GET',
		url: `http://141.94.27.46:7701/indexes/users/search?q=${q}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer QNYw4Apg0b7c9bc136c5fb1fa035556bfea22858bf951fdb183343460bd9f020ad7bd97f',
		},
		data: JSON.stringify({
			filter: `role = transporter AND status = ok`,
		}),
	})

	return res.data
}

export const fullTextSearchNewTransporteurs = async (q) => {
	const res = await axios({
		method: 'GET',
		url: `http://141.94.27.46:7701/indexes/users/search?q=${q}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer QNYw4Apg0b7c9bc136c5fb1fa035556bfea22858bf951fdb183343460bd9f020ad7bd97f',
		},
		data: JSON.stringify({
			filter: `role = transporter AND status = pending`,
		}),
	})

	return res.data
}
