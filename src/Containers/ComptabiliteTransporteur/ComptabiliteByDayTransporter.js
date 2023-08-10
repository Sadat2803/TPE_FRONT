import { GradientText, SubText } from '../PasserCommande/PasserCommande.styles'
import React, { useEffect, useState } from 'react'

import CourseACourseHorizontal from '../../Components/SingleCommandeHorizontal/CourseACourseHorizontal'
import LayoutTransporter from '../../Components/LayoutTransporter/LayoutTransporter'
import MiseADispoHorizontal from '../../Components/SingleCommandeHorizontal/MiseADispoHorizontal'
import SingleCommandeHorizontal from '../../Components/SingleCommandeHorizontal/SingleCommandeHorizontal'
import _ from 'lodash'
import { getCommandesbyTransporterId } from '../../api/commande'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

function ComptabiliteByDayTransporter(props) {
	const history = useHistory()
	const [total, setTotal] = useState(0)
	const [commandes, setCommandes] = useState([])
	const transporterID = useSelector((state) => state.auth.user._id)

	useEffect(() => {
		async function _getCommandes(transporterID) {
			const commandes = await getCommandesbyTransporterId(transporterID)
			setCommandes(commandes.docs)
			setTotal(_.sum(commandes.docs.map((cmd) => cmd.prix)))
		}

		_getCommandes(transporterID)
	}, [transporterID])

	return (
		<LayoutTransporter>
			<div
				style={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					paddingTop: '2rem',
					paddingBottom: '4rem',
				}}
			>
				<GradientText>{'comptabilité'.toUpperCase()}</GradientText>
				<SubText>
					Ici retrouver la totalité des transports facturer
				</SubText>

				<div
					style={{
						width: '100%',
						fontFamily: 'Montserrat',
						paddingLeft: '1rem',
						paddingRight: '1rem',
						marginBottom: '2rem',
						marginTop: '1rem',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<div>
						<input
							style={{
								padding: '1rem',
								borderRadius: 5,
								border: '1px solid #E4EAF0',
								width: '25rem',
								fontFamily: 'Montserrat',
							}}
							placeholder='Rechercher par : Ville, Date, Tarif, Département'
						/>
					</div>

					<div
						style={{
							background: '#838EAB',
							padding: '1rem 2rem',
							display: 'flex',
							alignItems: 'center',
							color: 'white',
							borderRadius: 10,
						}}
					>
						<span>Total:</span>
						<span style={{ width: '2rem' }} />
						<span style={{ fontWeight: 'bold' }}>{total}€</span>
					</div>
				</div>

				<div
					style={{
						width: '100%',
						padding: '1rem',
						marginBottom: '1rem',
					}}
				>
					<span
						onClick={() =>
							history.push('/comptabilite/transporter/month')
						}
						style={{
							padding: '1rem 2rem',
							borderRadius: 5,
							cursor: 'pointer',
							marginRight: '1rem',
							fontWeight: 'bold',
							color: 'white',
							background: '#E4EAF0',
							fontFamily: 'Montserrat',
						}}
					>
						Mois
					</span>
					<span
						onClick={() =>
							history.push('/comptabilite/transporter/day')
						}
						style={{
							padding: '1rem 2rem',
							borderRadius: 5,
							cursor: 'pointer',
							fontWeight: 'bold',
							color: 'white',
							marginRight: '1rem',
							background: '#50F5A9',
							fontFamily: 'Montserrat',
						}}
					>
						Jours
					</span>
				</div>

				<div
					style={{
						width: '100%',
						fontFamily: 'Montserrat',
						paddingLeft: '1rem',
						paddingRight: '1rem',
						marginBottom: 5,
					}}
				>
					{commandes.map((commande) => {
						if (commande.type_commande === 'course-a-course') {
							return (
								<CourseACourseHorizontal
									key={commande._id}
									commande={commande}
									onClickDetails={() => {
										history.push(
											`/commandes/${commande._id}`
										)
									}}
									onClickSignaler={() => {
										history.push(
											`/client/transports/${commande._id}/signaler`
										)
									}}
								/>
							)
						} else {
							return (
								<MiseADispoHorizontal
									key={commande._id}
									commande={commande}
									onClickDetails={() => {
										history.push(
											`/commandes/${commande._id}`
										)
									}}
									onClickSignaler={() => {
										history.push(
											`/client/transports/${commande._id}/signaler`
										)
									}}
								/>
							)
						}
					})}
				</div>
			</div>
		</LayoutTransporter>
	)
}

export default ComptabiliteByDayTransporter
