import api, { BASE_URL } from './base'

import axios from 'axios'

export const requestSignature = async (commandeId) => {
	const res = await api.post(`/commandes/${commandeId}/sign`)

	return res.data
}

export const requestSignatureFile = async (commandeId) => {
	return axios({
		url: `${BASE_URL}/commandes/${commandeId}/sign/pdf`,
		method: 'GET',
		responseType: 'blob', // important
	}).then((response) => {
		const url = window.URL.createObjectURL(new Blob([response.data]))
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', `${commandeId}.pdf`)
		document.body.appendChild(link)
		link.click()
	})
}

export const downloadSignature = async (envelopeId, access_token) => {
	return axios({
		url: `https://demo.docusign.net/restapi/v2.1/accounts/6ad7c813-9362-46d9-8bc3-db236a546b33/envelopes/${envelopeId}/documents/combined`,
		method: 'GET',
		responseType: 'blob', // important
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	}).then((response) => {
		const url = window.URL.createObjectURL(new Blob([response.data]))
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', `${envelopeId}.pdf`)
		document.body.appendChild(link)
		link.click()
	})
}
