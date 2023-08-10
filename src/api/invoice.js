import api from './base'

export const getInvoice = async (type, client, commandes) => {
	const res = await api.post('/invoice', {
		type,
		client,
		commandes,
	})

	return res.data
}

export const getInvoiceForOneCommande = async (client, commande) => {
	const res = await api.post('/invoice/single', {
		client,
		commande,
	})

	return res.data
}
