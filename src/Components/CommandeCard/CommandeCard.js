import React, { useState } from 'react'

import moment from 'moment'
import { updateStatutCommande } from '../../api/commande'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

function CommandeCard({ commande }) {
	const history = useHistory()
	const [statut, setStatut] = useState(commande.statut)
	const user = useSelector(state => state.auth.user)
	return (
		<div
			key={commande._id}
			style={{
				width: '100%',
				background: '#E4EAF0',
				display: 'flex',
				flexDirection: 'row',
				padding: '0.5rem 1rem',
				borderRadius: 10,
				alignItems: 'center',
				justifyContent: 'space-evenly',
				marginBottom: '1rem',
			}}
		>
			<input
				type='checkbox'
				onChange={(event) => {
					// const target = event.target
					// if (target.checked) {
					// 	setSelectedCommandes([
					// 		...selectedCommandes,
					// 		commande._id,
					// 	])
					// } else {
					// 	setSelectedCommandes(
					// 		selectedCommandes.filter(
					// 			(c) => c._id != commande._id
					// 		)
					// 	)
					// }
				}}
			/>
			<span style={{ width: 10 }} />
			<div
				style={{
					//width: '16%',
					display: 'flex',
					flexDirection: 'column',
					fontSize: 13,
				}}
			>
				<span
					style={{
						fontWeight: 'bold',
						color: '#51C7F2',
						marginBottom: 3,
					}}
				>
					{commande.type_commande == 'course-a-course'
						? 'Course à course'
						: 'Mise à disposition'}
				</span>

				<span
					style={{
						//fontWeight: 'bold',
						color: '#838EAB',
						marginBottom: 5,
					}}
				>
					Date et type
				</span>

				{commande.type_commande === 'course-a-course' &&
					[...commande.courses].slice(0, 2).map((course) => (
						<div
							key={course._id}
							style={{
								background: 'white',
								padding: '0.5rem 2rem',
								display: 'flex',
								flexDirection: 'row',
								color: '#838EAB',
								fontSize: 13,
								borderRadius: 5,
								marginBottom: 3,
							}}
						>
							<span
								style={{
									marginRight: 15,
								}}
							>
								{moment(course.date_transport).format(
									'DD/MM/YYYY'
								)}
							</span>
							<span>{course.type}</span>
						</div>
					))}

				{commande.type_commande === 'mise-a-disposition' && (
					<>
						<div
							style={{
								background: 'white',
								padding: '0.5rem 2rem',
								display: 'flex',
								flexDirection: 'row',
								color: '#838EAB',
								fontSize: 13,
								borderRadius: 5,
								marginBottom: 3,
							}}
						>
							<span
								style={{
									marginRight: 15,
								}}
							>
								{moment(commande.debut).format('DD/MM/YYYY')}
							</span>
							<span>Début</span>
						</div>
						<div
							style={{
								background: 'white',
								padding: '0.5rem 2rem',
								display: 'flex',
								flexDirection: 'row',
								color: '#838EAB',
								fontSize: 13,
								borderRadius: 5,
								marginBottom: 3,
							}}
						>
							<span
								style={{
									marginRight: 15,
								}}
							>
								{moment(commande.fin).format('DD/MM/YYYY')}
							</span>
							<span>Fin</span>
						</div>
					</>
				)}

				{commande.type_commande === 'course-a-course' && (
					<span
						style={{
							color: '#838EAB',
							textDecoration: 'underline',
							marginTop: 10,
						}}
					>
						Voir le détail pour voir les étapes
					</span>
				)}

				{commande.type_commande === 'mise-a-disposition' && (
					<div
						style={{
							background: 'white',
							padding: '0.5rem 2rem',
							display: 'flex',
							flexDirection: 'row',
							color: '#838EAB',
							fontSize: 13,
							borderRadius: 5,
							marginBottom: 3,
						}}
					>
						<span
							style={{
								marginRight: 15,
							}}
						>
							{commande.heure_jour}h jours pour
						</span>
						<span>{commande.kilo_jour}KM</span>
					</div>
				)}
			</div>

			{/*  */}

			<div
				style={{
					//width: '16%',
					display: 'flex',
					flexDirection: 'column',
					fontSize: 13,
				}}
			>
				<span
					style={{
						//fontWeight: 'bold',
						color: '#838EAB',
						marginBottom: 5,
						//marginTop: 5,
					}}
				>
					Trajet
				</span>

				{commande.type_commande === 'course-a-course' &&
					[...commande.courses].slice(0, 2).map((course) => (
						<div
							key={course._id}
							style={{
								background: 'white',
								padding: '0.5rem 2rem',
								display: 'flex',
								flexDirection: 'row',
								color: '#838EAB',
								fontSize: 13,
								borderRadius: 5,
								marginBottom: 3,
							}}
						>
							<span
								style={{
									marginRight: 15,
									maxWidth: 100,
								}}
							>
								{course.adresse_debut
									? course?.adresse_debut?.label
									: course?.adresse?.label}
							</span>
							<span>{course?.time}</span>
						</div>
					))}

				{commande.type_commande === 'mise-a-disposition' && (
					<>
						<div
							style={{
								background: 'white',
								padding: '0.5rem 2rem',
								display: 'flex',
								flexDirection: 'row',
								color: '#838EAB',
								fontSize: 13,
								borderRadius: 5,
								marginBottom: 3,
							}}
						>
							<span
								style={{
									marginRight: 15,
									maxWidth: 100,
								}}
							>
								{commande.adresse_debut
									? commande.adresse_debut?.label
									: commande?.adresse?.label}
							</span>
							<span>{commande.heure_debut}</span>
						</div>

						<div
							style={{
								background: 'white',
								padding: '0.5rem 2rem',
								display: 'flex',
								flexDirection: 'row',
								color: '#838EAB',
								fontSize: 13,
								borderRadius: 5,
								marginBottom: 3,
							}}
						>
							<span
								style={{
									marginRight: 15,
									maxWidth: 100,
								}}
							>
								{commande?.adresse_fin?.label}
							</span>
							<span>{commande?.heure_fin}</span>
						</div>
					</>
				)}
			</div>

			{/*  */}

			<div
				style={{
					//width: '16%',
					display: 'flex',
					flexDirection: 'column',
					fontSize: 13,
				}}
			>
				<span
					style={{
						//fontWeight: 'bold',
						color: '#838EAB',
						marginBottom: 5,
						//marginTop: 20,
					}}
				>
					Type de Véhicule
				</span>

				<div
					style={{
						background: 'white',
						padding: '0.5rem 2rem',
						display: 'flex',
						flexDirection: 'row',
						color: '#838EAB',
						fontSize: 13,
						borderRadius: 5,
						marginBottom: 3,
					}}
				>
					<span
						style={{
							marginRight: 15,
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<span>{commande.type_transport} </span>
						<span>{commande.type_transport_details} </span>
					</span>
				</div>
			</div>

			{/* <div
				style={{
					//width: '16%',
					display: 'flex',
					flexDirection: 'column',
					fontSize: 13,
				}}
			>
				<span
					style={{
						//fontWeight: 'bold',
						color: '#838EAB',
						marginBottom: 5,
						//marginTop: 20,
					}}
				>
					Statut
				</span>

				<div
					style={{
						//padding: '0.5rem 2rem',
						display: 'flex',
						flexDirection: 'column',
						color: '#838EAB',
						fontSize: 13,
						borderRadius: 5,
						marginBottom: 3,
					}}
				>
					<span
						onClick={async () => {
							await updateStatutCommande(commande._id, 'en-cours')
							setStatut('en-cours')
						}}
						style={{
							padding: '0.3rem 0.7rem',
							background:
								statut === 'en-cours' ? '#C752B6' : '#838EAB',
							color: statut === 'en-cours' ? 'white' : '#9EA8BF',
							borderRadius: 50,
							fontWeight: 'bold',
							marginBottom: 5,
							fontSize: 10,
							cursor: 'pointer',
						}}
					>
						En cours
					</span>

					<span
						style={{
							padding: '0.3rem 0.7rem',
							background: '#838EAB',
							color: 'white',
							borderRadius: 50,
							fontWeight: 'bold',
							color: '#9EA8BF',
							marginBottom: 5,
							fontSize: 10,
						}}
					>
						Signaler
					</span>

					<span
						onClick={async () => {
							await updateStatutCommande(commande._id, 'terminer')
							setStatut('terminer')
						}}
						style={{
							padding: '0.3rem 0.7rem',
							background:
								statut === 'terminer' ? '#0FD39E' : '#838EAB',
							color: statut === 'terminer' ? 'white' : '#9EA8BF',
							borderRadius: 50,
							fontWeight: 'bold',
							fontSize: 10,
							cursor: 'pointer',
						}}
					>
						Terminer
					</span>
				</div>
			</div> */}

			<div
				style={{
					//width: '16%',
					display: 'flex',
					flexDirection: 'column',
					fontSize: 13,
				}}
			>
				<span
					style={{
						//fontWeight: 'bold',
						color: '#838EAB',
						marginBottom: 5,
						//marginTop: 20,
					}}
				>
					Montant
				</span>

				<div
					style={{
						background: 'white',
						padding: '0.5rem 2rem',
						display: 'flex',
						flexDirection: 'row',
						color: '#838EAB',
						fontSize: 13,
						borderRadius: 5,
						marginBottom: 3,
					}}
				>
					<span
						style={{
							marginRight: 15,
							display: 'flex',
							flexDirection: 'column',
							color: '#51C7F2',
							fontWeight: 'bold',
							fontSize: 15,
							padding: '1rem 0.5rem',
						}}
					>
						<span>{user.role === 'client' ? commande.prix : (commande.prix - (commande.prix * (commande.margin ?? 0)) / 100).toFixed(2)}€ ht</span>
					</span>
				</div>
			</div>

			{/*  */}

			<div
				style={{
					//width: '16%',
					display: 'flex',
					flexDirection: 'column',
					fontSize: 13,
				}}
			>
				<button
					onClick={() =>
						history.push(`/chauffeur/transports/${commande._id}`)
					}
					style={{
						padding: '0.5rem 1.5rem',
						background: '#51C7F2',
						border: 'none',
						cursor: 'pointer',
						color: 'white',
						borderRadius: 7,
						marginTop: 5,
						fontFamily: 'Montserrat',
						fontWeight: 'bold',
					}}
				>
					Voir détails
				</button>
			</div>
		</div>
	)
}

export default CommandeCard
