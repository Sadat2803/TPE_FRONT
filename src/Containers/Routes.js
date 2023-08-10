import { Route, Switch } from 'react-router'

import AnomalieTransport from './Admin/Plateforme/AnomalieTransport'
import Attribuer from './Admin/Plateforme/Attribuer'
import ChauffeurAccount from './Account/ChauffeurAccount'
import ClientAccount from './Account/ClientAccount'
import CloseSignature from './CloseSignature'
import Commandes from './Admin/Plateforme/Commandes'
import CommandesList from './CommandesList/CommandesList'
import ComptabiliteByDay from './ComptabiliteClient/ComptabiliteByDay'
import ComptabiliteByDayTransporter from './ComptabiliteTransporteur/ComptabiliteByDayTransporter'
import ComptabiliteByMonth from './ComptabiliteClient/ComptabiliteByMonth'
import ComptabiliteByMonthTransporter from './ComptabiliteTransporteur/ComptabiliteByMonthTransporter'
import ComptabiliteClients from './Admin/Comptabilite/ComptabiliteClients'
import ComptabiliteTransporteurs from './Admin/Comptabilite/ComptabiliteTransporteurs'
import CreateAccount from './CreateAccount/CreateAccount'
import CreateChauffeur from './CreateChauffeur/CreateChauffeur'
import CreateTransporter from './CreateTransporter/CreateTransporter'
import DetailCommandeAdmin from './Admin/Plateforme/DetailCommandeAdmin'
import DetailsChauffeur from './DetailsChauffeur/DetailsChauffeur'
import DetailsCommande from './DetailsCommande/DetailsCommande'
import DetailsCommandeTransporter from './DetailsCommandeTransporter/DetailsCommandeTransporter'
import EditSignalement from './Signaler/Chauffeur/EditSignalement'
import EditSignalementAdmin from './Signaler/Chauffeur/EditSignalementAdmin'
import Facturation from './Admin/Plateforme/Facturation'
import Felicitation from './Felicitation/Felicitation'
import Historique from './Historique/Historique'
import HistoriqueTransporter from './Historique/HistoriqueTransporter'
import HomePage from './Home/HomePage'
import ListChauffeurs from './ListChauffeurs/ListChauffeurs'
import ListTransportsChauffeurs from './ListTransportsChauffeurs/ListTransportsChauffeurs'
import Map from './Map/Map'
import MesClients from './Admin/MesClients'
import MesTransporteurs from './Admin/Transporteurs/MesTransporteurs'
import MesTransports from './MesTransports/MesTransports'
import NewSignalement from './Signaler/Chauffeur/NewSignalement'
import NotFound from './NotFound/NotFound'
import NouveauxTransporteurs from './Admin/Transporteurs/NouveauxTransporteurs'
import PasserCommande from './PasserCommande/PasserCommande'
import PayCommande from './PayCommande/PayCommande'
import PayHop from './PayHop'
import Plateforme from './Plateforme/Plateforme'
import PublicPasserCommande from './PublicPasserCommande/PublicPasserCommande'
import React from 'react'
import Register from './Register/Register'
import RegisterTransporter from './RegisterTransporter/RegisterTransporter'
import Salon from './Admin/Plateforme/Salon'
import SignIn from './SignIn/SignIn'
import SignInV2 from './SignInV2/SignInV2'
import SignalerAdminAll from './Signaler/Chauffeur/SignalerAdminAll'
import SignalerChauffeurAll from './Signaler/Chauffeur/SignalerChauffeurAll'
import SignalerClientAll from './Signaler/Chauffeur/SignalerClientAll'
import SignalerTransporterAll from './Signaler/Chauffeur/SignalerTransporterAll'
import SingleClient from './Admin/SingleClient'
import SingleClientFacturation from './Admin/Plateforme/SingleClientFacutration'
import SingleTransportChauffeur from './SingleTransportChauffeur/SingleTransportChauffeur'
import SingleTransporter from './Admin/Transporteurs/SingleTransporter'
import Tarif from './Tarif/Tarif'
import TransporterAccount from './Account/TransporterAccount'

function Routes(props) {
	return (
		<Switch>
			{/* <Route path='/' component={Public} exact /> */}
			<Route path='/' component={HomePage} exact />
			<Route path='/commandes/new' component={PasserCommande} exact />
			<Route path='/commandes/:id/pay' component={PayCommande} exact />

			<Route path='/chauffeurs' component={ListChauffeurs} exact />

			<Route
				path='/chauffeur/transports'
				component={ListTransportsChauffeurs}
				exact
			/>

			<Route
				path='/chauffeur/transports/:id'
				component={SingleTransportChauffeur}
				exact
			/>

			<Route
				path='/chauffeur/transports/:id/close'
				component={CloseSignature}
				exact
			/>

			<Route
				path='/chauffeur/transports/:id/signaler'
				component={SignalerChauffeurAll}
				exact
			/>
			<Route
				path='/client/transports/:id/signaler'
				component={SignalerClientAll}
				exact
			/>
			<Route
				path='/admin/transports/:id/signaler'
				component={SignalerAdminAll}
				exact
			/>
			<Route
				path='/transporter/transports/:id/signaler'
				component={SignalerTransporterAll}
				exact
			/>

			<Route
				path='/chauffeur/transports/:id/signaler/new'
				component={NewSignalement}
				exact
			/>

			<Route
				path='/chauffeur/transports/:commande_id/signaler/:signalement_id/edit'
				component={EditSignalement}
				exact
			/>

			<Route
				path='/admin/transports/:commande_id/signaler/:signalement_id/edit'
				component={EditSignalementAdmin}
				exact
			/>

			<Route path='/plateforme' component={Plateforme} exact />
			<Route path='/transports' component={MesTransports} exact />
			<Route
				path='/transports/:id'
				component={DetailsCommandeTransporter}
				exact
			/>

			<Route path='/chauffeurs/new' component={CreateChauffeur} exact />

			<Route path='/chauffeurs/:id' component={DetailsChauffeur} exact />

			<Route path='/commandes/list' component={CommandesList} exact />
			<Route path='/commandes/:id' component={DetailsCommande} exact />
			<Route path='/signin' component={SignIn} />

			<Route path='/login' component={SignInV2} />

			{/* Test */}
			<Route path='/signup' component={Register} />
			<Route path='/client/signup' component={Register} />
			<Route path='/transporter/signup' component={RegisterTransporter} />
			<Route path='/felicitation/client' component={Felicitation} />
			<Route path='/felicitation/transporter' component={Felicitation} />
			{/* <PrivateRoute path='/Home' component={Home} /> */}
			<Route path='/Felicitation' component={Felicitation} exact />
			<Route path='/CreateAccount' component={CreateAccount} exact />
			<Route
				path='/CreateTransporter'
				component={CreateTransporter}
				exact
			/>

			<Route path='/client/account' component={ClientAccount} />
			<Route path='/transporter/account' component={TransporterAccount} />
			<Route path='/chauffeur/account' component={ChauffeurAccount} />

			<Route path='/admin/clients' component={MesClients} exact />
			<Route path='/admin/clients/:id' component={SingleClient} exact />
			<Route
				path='/admin/transporteurs'
				component={MesTransporteurs}
				exact
			/>

			<Route path='/pay' component={PayHop} exact />

			<Route
			    // path='/admin/transporteurs/:id'
				path='/admin/transporters/:id'
				component={SingleTransporter}
				exact
			/>
			<Route
				path='/admin/transporteurs/new'
				component={NouveauxTransporteurs}
				exact
			/>

			<Route
				path='/admin/plateforme/commandes'
				component={Commandes}
				exact
			/>

			<Route
				path='/admin/plateforme/commandes/:id'
				component={DetailCommandeAdmin}
				exact
			/>

			<Route
				path='/admin/plateforme/attribuer'
				component={Attribuer}
				exact
			/>

			<Route path='/admin/plateforme/salon' component={Salon} exact />

			<Route
				path='/admin/plateforme/facturation'
				component={Facturation}
				exact
			/>

			<Route
				path='/admin/plateforme/facturation/:id'
				component={SingleClientFacturation}
				exact
			/>

			<Route
				path='/admin/plateforme/anomalie-transport'
				component={AnomalieTransport}
				exact
			/>

			<Route
				path='/admin/comptabilite/clients'
				component={ComptabiliteClients}
				exact
			/>

			<Route
				path='/admin/comptabilite/transporteurs'
				component={ComptabiliteTransporteurs}
				exact
			/>

			<Route
				path='/passer-commande'
				component={PublicPasserCommande}
				exact
			/>

			<Route
				path='/comptabilite/client/day'
				component={ComptabiliteByDay}
				exact
			/>

			<Route
				path='/comptabilite/client/month'
				component={ComptabiliteByMonth}
				exact
			/>

			<Route
				path='/comptabilite/transporter/day'
				component={ComptabiliteByDayTransporter}
				exact
			/>

			<Route
				path='/comptabilite/transporter/month'
				component={ComptabiliteByMonthTransporter}
				exact
			/>

			<Route path='/historique/client' component={Historique} exact />
			<Route
				path='/historique/transporter'
				component={HistoriqueTransporter}
				exact
			/>

			<Route path='/tarif' component={Tarif} exact />

			<Route path='/map' component={Map} exact />

			<Route component={NotFound} />
		</Switch>
	)
}

export default Routes
