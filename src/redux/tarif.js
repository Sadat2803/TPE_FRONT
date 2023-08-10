const SET_TARIF = 'SET_TARIF'
const SET_MISEADISPO = 'SET_MISEADISPO'
const SET_COURSEACOURSE = 'SET_COURSEACOURSE'

export const setTarif = (tarif) => {
	return {
		type: SET_TARIF,
		payload: {
			tarif,
		},
	}
}
export const setMiseADispo = (tarifMiseADispo) => {
	return {
		type: SET_MISEADISPO,
		payload: {
			tarifMiseADispo,
		},
	}
}
export const seCourseACourse = (tarifCourseACourse) => {
	return {
		type: SET_COURSEACOURSE,
		payload: {
			tarifCourseACourse,
		},
	}
}
const initialState = {
	tarif: null,
    tarifCourseACourse: null,
	tarifMiseADispo: null,

}

export default (state = initialState, action) => {
	const { type, payload, error } = action

	switch (type) {
		case SET_TARIF:
			return {
				...state,
				tarif: payload.tarif,
			}
		case SET_COURSEACOURSE: 
			return {
				...state,
				tarifCourseACourse: payload.tarifCourseACourse
			}
		case SET_MISEADISPO: 
			return {
				...state,
				tarifMiseADispo: payload.tarifMiseADispo
			}
		default:
			return state
	}
}
