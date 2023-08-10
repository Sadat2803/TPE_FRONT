import auth from './auth'
import { combineReducers } from 'redux'
import commande from './commande'
import tarif from './tarif'

export default combineReducers({
	auth,
	commande,
	tarif,
})
