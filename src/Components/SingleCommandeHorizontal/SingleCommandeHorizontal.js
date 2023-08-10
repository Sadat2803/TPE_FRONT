import React, { useState } from 'react'

import moment from 'moment'
import toast from 'react-hot-toast'
import { updateStatutCommande } from '../../api/commande'
import { useSelector } from 'react-redux'

function SingleCommandeHorizontal({
	commande,
	onClickDetails = () => {},
	onClickSignaler = () => {},
	hideStatus = false,
	enableAccept = false,
	onClickAccept = () => {},
	hideRadio = false,
	hidePrice = false,
	enableSaveStatus = false,
}) {
	const [statut, setStatut] = useState(commande.statut)
	const user = useSelector(state => state.auth.user)
	return (
		<div
			style={{
				width: '100%',
				background: '#E4EAF0',
				display: 'flex',
				flexDirection: 'row',
				padding: '0.5rem 1rem',
				borderRadius: 10,
				alignItems: 'flex-start',
				justifyContent: 'space-around',
				marginBottom: 10,
			}}
		>
			{/* {!hideRadio && (
				<>
					<input style={{ marginTop: 50 }} type='radio' />
					<span style={{ width: 10 }} />
				</>
			)} */}

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
					{commande.type_commande === 'course-a-course'
						? 'Course à course'
						: 'Mise à disposition'}{' '}
					/{' '}
					{commande.temporisation === 'immediat'
						? 'Immédiat'
						: 'Planifier'}
				</span>

				<span
					style={{
						//fontWeight: 'bold',
						color: '#838EAB',
					}}
				>
					Date du Transports :{' '}
					{commande.type_commande === 'course-a-course' && (
						<span
							style={{
								marginRight: 15,
							}}
						>
							{moment(commande.courses[0].date_debut).format(
								'DD/MM/YYYY'
							)}
						</span>
					)}
				</span>

				<span
					style={{
						color: '#838EAB',
					}}
				>
					{commande.type_commande === 'course-a-course' && (
						<>
							<span
								style={{
									marginRight: 15,
								}}
							>
								{commande.courses[0]?.heure_debut}{' '}
								{commande.courses[0]?.type_debut}{' '}
								{commande.courses[0]?.adresse_debut?.label}
							</span>

							<br />
							<span
								style={{
									marginRight: 15,
								}}
							>
								{commande.courses[0]?.heure_fin}{' '}
								{commande.courses[0]?.type_fin}{' '}
								{commande.courses[0]?.adresse_fin?.label}
							</span>
						</>
					)}
				</span>

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
							marginTop: 10,
						}}
					>
						+{commande.courses.length >= 1 ? commande.courses.length -1 : 0} Etapes Consulter le détail
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
						<span>
							{commande.heure_jour}h jours pour{' '}
							{commande.kilo_jour}KM
						</span>
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
				{commande.type_commande === 'course-a-course' && (
					<span
						style={{
							fontWeight: 'bold',
							marginBottom: 3,
							color: '#838EAB',
						}}
					>
						Documents :{' '}
						{commande.courses[0].files_debut.length +
							commande.courses[0].files_fin.length}
						<span style={{ marginLeft: '1rem' }}>
							Référence interne client : {commande.ref_client}
						</span>
					</span>
				)}

				<span
					style={{
						//fontWeight: 'bold',
						color: '#838EAB',
						marginBottom: 5,
						marginTop: 20,
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
							width: 100,
						}}
					>
						{commande.type_transport == 'Poids lourds' ? (
							<>
								<span
									style={{
										marginBottom: 10,
									}}
								>
									{commande.type_transport}
								</span>
								{commande.options_poids_lourds.map((item) => (
									<span key={item}>{item}</span>
								))}
							</>
						) : (
							<>
								<span>{commande.type_transport}</span>
								<span
									style={{
										marginBottom: 10,
									}}
								>
									{commande.type_transport_details}
								</span>

								{commande.options_vehicule_leger.map((item) => (
									<span key={item}>{item}</span>
								))}
							</>
						)}
					</span>
				</div>
			</div>

			{!hideStatus && (
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
							marginTop: 20,
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
								if (enableSaveStatus) {
									setStatut('en-cours')
								}
							}}
							style={{
								padding: '0.3rem 0.7rem',
								background:
									statut === 'en-cours'
										? '#C752B6'
										: '#838EAB',
								color:
									statut === 'en-cours' ? 'white' : '#9EA8BF',
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
							onClick={onClickSignaler}
							style={{
								padding: '0.3rem 0.7rem',
								background: commande?.signaler
									? '#FCC200'
									: '#838EAB',
								color: commande?.signaler ? 'white' : '#9EA8BF',
								cursor: 'pointer',
								borderRadius: 50,
								fontWeight: 'bold',
								marginBottom: 5,
								fontSize: 10,
							}}
						>
							Signaler{' '}
							{commande?.signaler &&
								`+${commande.signalement_count}`}
						</span>

						<span
							onClick={async () => {
								if (enableSaveStatus) {
									setStatut('terminer')
								}
							}}
							style={{
								padding: '0.3rem 0.7rem',
								background:
									statut === 'terminer'
										? '#0FD39E'
										: '#838EAB',
								color:
									statut === 'terminer' ? 'white' : '#9EA8BF',
								borderRadius: 50,
								fontWeight: 'bold',
								fontSize: 10,
								cursor: 'pointer',
							}}
						>
							Terminer
						</span>
					</div>
				</div>
			)}

			{!hidePrice && (
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
							marginTop: 20,
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
			)}

			{/*  */}

			<div
				style={{
					//width: '16%',
					display: 'flex',
					flexDirection: 'column',
					fontSize: 13,
					marginTop: 20,
				}}
			>
				{enableAccept && (
					<button
						onClick={onClickAccept}
						style={{
							padding: '0.5rem 1.5rem',
							background: '#50F5A9',
							border: 'none',
							cursor: 'pointer',
							color: 'white',
							borderRadius: 7,
							marginTop: 20,
							fontFamily: 'Montserrat',
							fontWeight: 'bold',
						}}
					>
						Accepter
					</button>
				)}

				<button
					onClick={onClickDetails}
					style={{
						padding: '1rem 2rem',
						background: '#51C7F2',
						border: 'none',
						cursor: 'pointer',
						color: 'white',
						borderRadius: 7,
						marginTop: 20,
						fontFamily: 'Montserrat',
						fontWeight: 'bold',
					}}
				>
					Voir détails
				</button>

				{enableSaveStatus && (
					<button
						onClick={async () => {
							toast.promise(
								updateStatutCommande(
									commande._id,
									statut,
									commande.transporterID._id
								),
								{
									loading: (
										<b style={{ fontFamily: 'Montserrat' }}>
											En cours
										</b>
									),
									success: (
										<b style={{ fontFamily: 'Montserrat' }}>
											Enregistré!
										</b>
									),
									error: (
										<b style={{ fontFamily: 'Montserrat' }}>
											Impossible d'enregistrer
										</b>
									),
								}
							)
						}}
						style={{
							padding: '1rem 2rem',
							background: '#50F5A9',
							border: 'none',
							cursor: 'pointer',
							color: 'white',
							borderRadius: 7,
							marginTop: 5,
							fontFamily: 'Montserrat',
							fontWeight: 'bold',
						}}
					>
						Enregistrer
					</button>
				)}
			</div>
		</div>
	)
}

export default React.memo(SingleCommandeHorizontal)
