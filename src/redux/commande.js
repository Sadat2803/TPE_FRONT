const SET_COMMANDE = 'SET_COMMANDE'
const DELETE_COMMANDE = 'DELETE_COMMANDE'

export const setCommande = (commande) => {
	return {
		type: SET_COMMANDE,
		payload: {
			commande,
		},
	}
}

export const deleteCommande = () => {
	return {
		type: DELETE_COMMANDE,
		payload: {},
	}
}

const initialState = {
	commande: null,
}

export default (state = initialState, action) => {
	const { type, payload, error } = action

	switch (type) {
		case SET_COMMANDE:
			return {
				...state,
				commande: payload.commande,
			}

		case DELETE_COMMANDE:
			return {
				...state,
				commande: null,
			}

		default:
			return state
	}
}
