import React, { useState } from 'react'
import {
	updateStatutCommande,
	updateStatutOnlyCommande,
} from '../../api/commande'

import moment from 'moment'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

function CourseACourseHorizontal({
	commande,
	onClickDetails = () => {},
	onClickSignaler = () => {},
	hideStatus = false,
	hideAccept = true,
	onClickAccept = () => {},
	hideRadio = false,
	hidePrice = false,
	hideRecu = false,
	hideAttribuer = false,
	hideTarif = false,
	enableSaveStatus = false,
	onClickRecu = () => {},
	onClickAttribuer = () => {},
}) {
	const [statut, setStatut] = useState(commande.statut)
	const history = useHistory()
	const user = useSelector(state => state.auth.user)
	return (
		<div
			style={{
				width: '100%',
				background: '#E4EAF0',
				display: 'flex',
				flexDirection: 'row',
				padding: '1rem',
				borderRadius: 10,
				alignItems: 'flex-start',
				justifyContent: 'space-between',
				marginBottom: 10,
			}}
		>
			<div
				style={{
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
					Course à course {!!commande ? ' N°' + commande.__id : '' } /{' '}
					<span style={{ color: 'red' }}>
						{commande.temporisation === 'immediat'
							? 'Immédiat'
							: 'Planifier'}
					</span>
				</span>

				<span
					style={{
						color: '#838EAB',
						width: '15rem',
					}}
				>
					Date du Transports :{' '}
					<span
						style={{
							marginRight: 15,
						}}
					>
						{moment(commande.courses[0].date_debut).format(
							'DD/MM/YYYY'
						)}
					</span>
				</span>

				<span
					style={{
						color: '#838EAB',
					}}
				>
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
				</span>

				<span
					style={{
						color: '#838EAB',
						marginTop: 10,
					}}
				>
					<span style={{ color: 'red' }}>
						+{commande?.courses?.length >= 1 ? commande.courses.length -1 : 0} Etapes{' '}
					</span>
					<span
						style={{ cursor: 'pointer' }}
						onClick={onClickDetails}
					>
						Consulter le détail
					</span>
				</span>
			</div>

			{/*  */}

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					fontSize: 13,
				}}
			>
				<span
					style={{
						fontWeight: 'bold',
						marginBottom: 3,
						color: '#838EAB',
					}}
				>
					Documents :{' '}
					<span style={{ color: 'red' }}>
						{commande.courses[0].files_debut.length +
							commande.courses[0].files_fin.length}
					</span>
					<span style={{ marginLeft: '1rem' }}>
						Référence interne client :{' '}
						<span style={{ color: 'red' }}>
							{commande.ref_client}
						</span>
					</span>
				</span>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						marginTop: '1rem',
					}}
				>
					<span
						style={{
							color: '#838EAB',
							marginBottom: '.5rem',
						}}
					>
						{commande.type_transport}
						{' : '}
						{commande.type_transport_details}
					</span>
					<span
						style={{
							color: '#838EAB',
							marginBottom: '.5rem',
						}}
					>
						{commande.options_vehicule_leger.join(',')}
					</span>
					<span
						style={{
							color: '#838EAB',
							marginBottom: '.5rem',
						}}
					>
						{commande.options_poids_lourds.join(',')}
					</span>
					<span
						style={{
							color: '#838EAB',
							marginBottom: '.5rem',
						}}
					>
						Notes utiles:{' '}
						<span style={{ color: 'red' }}>
							{commande.courses[0].notes_debut && 'Oui'}
						</span>
					</span>
					<span
						style={{
							color: '#838EAB',
						}}
					>
						Nombre de ripper en plus du chauffeur :{' '}
						<span style={{ color: 'red' }}>
							{commande.rippeurs}
						</span>
					</span>
				</div>
			</div>

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					fontSize: 13,
				}}
			>
				{!hideTarif && (<div
					style={{
						background: 'white',

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
							fontWeight: 'bold',
							fontSize: 15,
							padding: '1rem 0.5rem',
						}}
					>
						<span>
							Tarif:{' '}
							<span className='price' style={{ color: 'red' }}>
								{user.role === 'client' ? commande.prix : (commande.prix - (commande.prix * (commande.margin ?? 0)) / 100).toFixed(2)}€
							</span>
						</span>
					</span>
				</div>)}

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
								await updateStatutOnlyCommande(
									commande._id,
									'en-cours'
								)
								setStatut('en-cours')
							}
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
							width: '4.5rem',
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
							width: '4.5rem',
						}}
					>
						Signaler{' '}
						{commande?.signaler && `+${commande.signalement_count}`}
					</span>

					<span
						onClick={async () => {
							if (enableSaveStatus) {
								await updateStatutOnlyCommande(
									commande._id,
									'terminer'
								)
								setStatut('terminer')
							}
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
							width: '4.5rem',
						}}
					>
						Terminer
					</span>
				</div>
			</div>

			{/*  */}

			<div
				style={{
					color: '#838EAB',
					display: 'flex',
					flexDirection: 'column',
					fontSize: 13,
				}}
			>
				<span>
					Diable:{' '}
					<span style={{ color: 'red' }}>
						{commande.manutention.includes('Diable') && 'Oui'}
					</span>
				</span>
				<span>
					Transpalette manuel:{' '}
					<span style={{ color: 'red' }}>
						{commande.manutention.includes('Transpalette manuel') &&
							'Oui'}
					</span>
				</span>
				<span>
					Transpalette électrique:{' '}
					<span style={{ color: 'red' }}>
						{commande.manutention.includes(
							'Transpalette électrique'
						) && 'Oui'}
					</span>
				</span>
				<span>
					Sangle:{' '}
					<span style={{ color: 'red' }}>
						{commande.manutention.includes('Sangle') && 'Oui'}
					</span>
				</span>

				<span>
					Casque:{' '}
					<span style={{ color: 'red' }}>
						{commande.epi.includes('Casque') && 'Oui'}
					</span>
				</span>
				<span>
					Gants:{' '}
					<span style={{ color: 'red' }}>
						{commande.epi.includes('Gants') && 'Oui'}
					</span>
				</span>
				<span>
					Masque:{' '}
					<span style={{ color: 'red' }}>
						{commande.epi.includes('Masque') && 'Oui'}
					</span>
				</span>
				<span>
					Lunettes:{' '}
					<span style={{ color: 'red' }}>
						{commande.epi.includes('Lunettes') && 'Oui'}
					</span>
				</span>
				<span>
					Chaussure de sécurité:{' '}
					<span style={{ color: 'red' }}>
						{commande.epi.includes('Chaussure de sécurité') &&
							'Oui'}
					</span>
				</span>
				<span>
					Gilet de visibilité:{' '}
					<span style={{ color: 'red' }}>
						{commande.epi.includes('Gilet de visibilité') && 'Oui'}
					</span>
				</span>
			</div>
			<div
				style={{
					//width: '16%',
					display: 'flex',
					flexDirection: 'column',
					fontSize: 13,
					marginTop: 35,
				}}
			>
				{!hideAttribuer && (
					<>
						{commande.chauffeurID && (
							<span
								style={{
									color: 'black',
									fontWeight: 'bold',
								}}
							>
								{commande.chauffeurID.first_name}{' '}
								{commande.chauffeurID.last_name}
							</span>
						)}
						<button
							onClick={onClickAttribuer}
							style={{
								padding: '0.5rem 1.5rem',
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
							Attribuer
						</button>
					</>
				)}
				<button
					onClick={onClickDetails}
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
				{!hideRecu && (
					<button
						onClick={onClickRecu}
						style={{
							cursor: 'pointer',
							fontFamily: 'Montserrat',
							background: commande?.recu ? '#FCC200' : '#838EAB',
							color: commande?.recu ? 'white' : '#9EA8BF',
							border: 'none',
							fontWeight: 'bold',
							padding: '0.5rem 1.5rem',
							borderRadius: 4,
							marginTop: 5,
						}}
					>
						Reçu
					</button>
				)}

                {!hideAccept && (
					<button
						onClick={onClickAccept}
						style={{
							cursor: 'pointer',
							fontFamily: 'Montserrat',
							background:  '#50F5A9',
							color:  'white',
							border: 'none',
							fontWeight: 'bold',
							padding: '0.5rem 1.5rem',
							borderRadius: 4,
							marginTop: 5,
						}}
					>
						Accepter
					</button>
				)}
			</div>
		</div>
	)
}

export default React.memo(CourseACourseHorizontal)
