const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const UPDATE_PROFILE = 'UPDATE_PROFILE'
const SET_SUSPENDU = 'UPDATE_SUSPENDU'

export const setSuspendu = (suspendre) => {
	return {
		type: SET_SUSPENDU,
		payload: {
			suspendre,
		},
	}
}

export const loginAction = (user, token) => {
	return {
		type: LOGIN,
		payload: {
			user,
			token,
		},
	}
}

export const logoutAction = () => {
	return {
		type: LOGOUT,
		payload: null,
	}
}

export const updateProfile = (user) => {
	return {
		type: UPDATE_PROFILE,
		payload: {
			user,
		},
	}
}

const initialState = {
	isAuthenticated: false,
	token: null,
	user: null,
}

export default (state = initialState, action) => {
	const { type, payload, error } = action

	switch (type) {
		case LOGIN:
			return {
				...state,
				isAuthenticated: true,
				user: payload.user,
				token: payload.token,
			}

		case UPDATE_PROFILE:
			return {
				...state,
				user: {
					...state.user,
					...payload.user,
				},
			}

		case SET_SUSPENDU:
			return {
				...state,
				user: {
					...state.user,
					suspendre: payload.suspendre,
				},
			}

		case LOGOUT:
			return {
				...initialState,
			}

		default:
			return state
	}
}
