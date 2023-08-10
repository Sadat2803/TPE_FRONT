import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import ScrollToTop from '../Components/ScrollToTop'
import SnackbarProvider from 'react-simple-snackbar'
import SuspendedGuard from '../Components/SuspendedGuard'
import TarifConfig from '../Components/TarifConfig'
import { Toaster } from 'react-hot-toast'
import configureStore from '../redux/configureStore'

function App() {
	const { persistor, store } = configureStore()

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<SnackbarProvider>
					<Router>
						<ScrollToTop />
						<SuspendedGuard />
						<TarifConfig />
						<Routes />
					</Router>
				</SnackbarProvider>
				<Toaster />
			</PersistGate>
		</Provider>
	)
}

export default App
