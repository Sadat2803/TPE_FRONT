import rootReducer from '.'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['auth', 'commande'],
}

const middlewares = [thunkMiddleware]
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
	let md = applyMiddleware(...middlewares)
	if (process.env.NODE_ENV === 'development') {
		md = composeWithDevTools(applyMiddleware(...middlewares))
	}
	let store = createStore(persistedReducer, md)
	let persistor = persistStore(store)
	return { store, persistor }
}
