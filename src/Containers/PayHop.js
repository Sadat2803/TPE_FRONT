import Container from '../Components/LayoutClient/container.component'
import React from 'react'

function PayHop(props) {
	return (
		<Container>
			<form
				method='post'
				name='Monetico'
				target='_top'
				action='https://p.monetico-services.com/test/paiement.cgi'
			>
				<input type='hidden' name='version' value='3.0' />
				<input type='hidden' name='TPE' value='1234567' />
				<input type='hidden' name='date' value='05/05/2019:11:55:23' />
				<input type='hidden' name='montant' value='62.73EUR' />
				<input type='hidden' name='reference' value='REF001' />
				<input
					type='hidden'
					name='MAC'
					value='78bc376c5b192f1c48844794cbdb0050f156b9a2'
				/>
				<input
					type='hidden'
					name='url_retour_ok'
					value='http://url.retour.com/ok.cgi?ref=REF001'
				/>
				<input
					type='hidden'
					name='url_retour_err'
					value='http://url.retour.com/ko.cgi?ref=REF001'
				/>
				<input type='hidden' name='lgue' value='FR' />
				<input type='hidden' name='societe' value='monSite1' />
				<input
					type='hidden'
					name='contexte_commande'
					value='ewoJI(…)KCX0KfQ=='
				/>
				<input
					type='hidden'
					name='texte-libre'
					value='ExempleTexteLibre'
				/>
				<input
					type='hidden'
					name='mail'
					value='internaute@sonemail.fr'
				/>
				<input type='submit' name='bouton' value='Paiement CB' />
			</form>
		</Container>
	)
}

export default PayHop
