import React, { useEffect, useState } from 'react'

import CourseACourseHorizontal from '../../Components/SingleCommandeHorizontal/CourseACourseHorizontal'
import { GradientText } from '../PasserCommande/PasserCommande.styles'
import LayoutChauffeur from '../../Components/LayoutChauffeur/LayoutChauffeur'
import MiseADispoHorizontal from '../../Components/SingleCommandeHorizontal/MiseADispoHorizontal'
import SingleCommandeHorizontal from '../../Components/SingleCommandeHorizontal/SingleCommandeHorizontal'
import { getCommandesByChauffeur } from '../../api/commande'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

function ListTransportsChauffeurs(props) {
	const history = useHistory()
	const [commandes, setCommandes] = useState([])
	const user = useSelector((state) => state.auth.user)

	useEffect(() => {
		async function fetchCommandes() {
			const res = await getCommandesByChauffeur(user._id)
			setCommandes(res.docs)
		}

		fetchCommandes()
	}, [])

	return (
		<LayoutChauffeur>
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
				<GradientText>MES TRANSPORTS</GradientText>

				<div
					style={{
						width: '90%',
						fontFamily: 'Montserrat',
						minHeight: '60vh',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						marginTop: '1rem',
					}}
				>
					<div
						style={{
							width: '100%',
							fontFamily: 'Montserrat',
							//paddingLeft: '1rem',
							paddingRight: '1rem',
							marginBottom: '2rem',
						}}
					>
						<input
							style={{
								padding: '1rem',
								borderRadius: 5,
								border: '1px solid #E4EAF0',
								width: '25rem',
								fontFamily: 'Montserrat',
								marginRight: '1rem',
							}}
							placeholder='Rechercher par : Ville, Date, Tarif, Département'
						/>
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							flexWrap: 'wrap',
							width: '100%',
							height: '100%',
							alignItems: 'flex-start',
							marginBottom: '2rem',
						}}
					>
						{commandes.map((commande) => {
							if (commande.type_commande === 'course-a-course') {
								return (
									<CourseACourseHorizontal
										key={commande._id}
										commande={commande}
										hideAttribuer
										hideTarif
										hideRecu
										enableSaveStatus
										onClickDetails={() => {
											history.push(
												`/chauffeur/transports/${commande._id}`
											)
										}}
										onClickSignaler={() => {
											history.push(
												`/chauffeur/transports/${commande._id}/signaler`
											)
										}}
									/>
								)
							} else {
								return (
									<MiseADispoHorizontal
										key={commande._id}
										commande={commande}
										hideAttribuer
										hideTarif
										hideRecu
										enableSaveStatus
										onClickDetails={() => {
											history.push(
												`/chauffeur/transports/${commande._id}`
											)
										}}
										onClickSignaler={() => {
											history.push(
												`/chauffeur/transports/${commande._id}/signaler`
											)
										}}
									/>
								)
							}
						})}
					</div>
				</div>
			</div>
		</LayoutChauffeur>
	)
}

export default ListTransportsChauffeurs
