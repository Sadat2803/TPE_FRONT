

const axios = require('axios')

// Actions
const SET_CHAUFFEUR = 'redux/users/SET_CHAUFFEUR'
const LOG_OUT = 'redux/users/LOG_OUT'
const SIGN_IN = 'redux/users/SIGN_IN'
const SIGN_UP = 'redux/users/SIGN_UP'
const SIGN_UP_COMPLETE = 'redux/users/SIGN_UP_COMPLETE'
const SET_LOGIN_ERROR = 'redux/users/SET_LOGIN_ERROR'
const SET_SIGNUP_ERROR = 'redux/users/SET_SIGNUP_ERROR'

// Reducer

const initialState = {
    profileName: null,
    isLoggedIn: false,
    isFetching: false,
    jwt: null,
    loginError: null,
    signupError: null
}

const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHAUFFEUR:
            return {
                ...state,
                profileName: action.payload.username,
                isLoggedIn: true,
                isFetching: false,
                jwt: action.payload.jwt,
                loginError: null
            }
        case LOG_OUT:
            return initialState
        case SIGN_IN:
            return {
                ...state,
                isFetching: true,
                loginError: null
            }
        case SIGN_UP:
            return {
                ...state,
                isFetching: true,
                signupError: null
            }
        case SIGN_UP_COMPLETE:
            return {
                ...state,
                isFetching: false,
                signupError: null
            }
        case SET_LOGIN_ERROR:
            return {
                ...state,
                isFetching: false,
                loginError: action.payload.error
            }
        case SET_SIGNUP_ERROR:
            return {
                ...state,
                isFetching: false,
                signupError: action.payload.error
            }
        default:
            return state
    }
}

export default currentUser


// Action Creators
const setUser = userObj => {
    return {
        type: SET_CHAUFFEUR,
        payload: userObj
    }
}

const setLoginError = error => {
    return {
        type: SET_LOGIN_ERROR,
        payload: { error }
    }
}

const setSignupError = error => {
    return {
        type: SET_SIGNUP_ERROR,
        payload: { error }
    }
    
}

const signIn = (userObj) => dispatch => {
    dispatch({
        type: SIGN_IN
    })
    axios({
        method: 'post',
        url: 'htt://localhost:3030/chauffeurs/all ',
        data: {
            sexe:userObj.sexe,
        type_vehicule: userObj.type_vehicule,
        first_name: userObj.first_name,
        last_name: userObj.last_name,
        adresse: userObj.adresse,
        phone :userObj.phone,
        email:userObj.email,

        date_naiss: userObj.date_naiss,
        date_embauche: userObj.date_embauche,
        permis :userObj.permis,
        fimo:userObj.fimo,
        danger:userObj.danger,
        password:userObj.password
        }
    })
        .then(function (response) {
            // handle success
            dispatch(setUser({
                username: userObj.username,
                jwt: response.data.jwt
            }))

        })
        .catch(function (error) {
            // handle error
            let errorMessage = 'Network Error'
            if (error.response) {
                errorMessage = error.response.data.message
                errorMessage = errorMessage === 'WRONG_CREDENTIAL' ? 'Incorrect username or password' : errorMessage
                //User does not exist. Sign up for an account
            }
            dispatch(setLoginError(errorMessage))
        })
        .then(function () {
            // always executed
        })
}

const addChauffeur = (userObj) => dispatch => {
    dispatch({
        type: SIGN_UP

    })
    axios({
        method: 'post',
        url: 'htt://localhost:3030/chauffeurs/add ',
        data: {
            sexe:userObj.sexe,
        type_vehicule: userObj.type_vehicule,
        first_name: userObj.first_name,
        last_name: userObj.last_name,
        adresse: userObj.adresse,
        phone :userObj.phone,
        email:userObj.email,

        date_naiss: userObj.date_naiss,
        date_embauche: userObj.date_embauche,
        permis :userObj.permis,
        fimo:userObj.fimo,
        danger:userObj.danger,
        password:userObj.password


        }
        
    })
        .then(function (response) {
            // handle success
            if (response.data.userId) {
                dispatch({
                    type: SIGN_UP_COMPLETE,
                    
                })

                dispatch(signIn(userObj)) //Auto login on successful register
                this.props.browserHistory.push("/Felicitation")

            }
        })
       
        .catch(function (error) {
            // handle error
            let errorMessage = 'Network Error'
            if (error.response) {
                errorMessage = error.response.data.message
                errorMessage = errorMessage === 'USERNAME_IS_NOT_AVAILABLE' ? 'Username/Email is not available' : errorMessage
            }
            dispatch(setSignupError(errorMessage))

        })
        .then(function () {
            // always executed
        })
}

const getProfile = (access_token) => {
    axios({
        method: 'get',
        url: 'http://localhost:3000/api/user/me ',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            // handle success
            console.log(response)
        })
        .catch(function (error) {
            // handle error
            console.log(error.response)

        })
        .then(function () {
            // always executed
        })
}

const logOut = () => {
    return {
        type: LOG_OUT
    }
}

export const actions = {
  //  setUser,
    logOut,
 //   signIn,
 addChauffeur,
    setLoginError,
    setSignupError,
    getProfile
}
