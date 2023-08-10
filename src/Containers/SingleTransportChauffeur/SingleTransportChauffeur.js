import {
	FormContentSection,
	FormSectionTitle,
	GradientText,
} from '../PasserCommande/PasserCommande.styles'
import React, { useEffect, useState } from 'react'
import {
	downloadSignature,
	requestSignature,
	requestSignatureFile,
} from '../../api/sign'
import { getCommande, updateStatutCommande, updateStatutOnlyCommande } from '../../api/commande'

import CommandeForm from '../../Components/CommandeForm'
import LayoutChauffeur from '../../Components/LayoutChauffeur/LayoutChauffeur'
import SingleCommande from '../../Components/SingleCommande/SingleCommande'
import TransportTracking from '../../Components/TransportTracking/TransportTracking'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function CommandeStatus({ commande }) {
	const history = useHistory()
	const [statut, setStatut] = useState(commande.statut)
	const [loadingSignature, setLoadingSignature] = useState(false)
	const [showSignatureLoading, setShowSignatureLoading] = useState(false)

	return (
		<FormContentSection>
			<FormSectionTitle>Statut du transport</FormSectionTitle>
			<div
				style={{
					//width: '16%',
					display: 'flex',
					flexDirection: 'row',
					fontSize: 13,
				}}
			>
				<div
					style={{
						//padding: '0.5rem 2rem',
						display: 'flex',
						flexDirection: 'row',
						color: '#838EAB',
						fontSize: 13,
						borderRadius: 5,
						marginBottom: 3,
						width: '100%',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<button
						type='button'
						onClick={() => {
							setStatut('en-cours')
						}}
						disabled={loadingSignature}
						style={{
							padding: '1rem',
							background:
								statut === 'en-cours' ? '#C752B6' : '#838EAB',
							color: statut === 'en-cours' ? 'white' : '#9EA8BF',
							borderRadius: 50,
							fontWeight: 'bold',
							fontSize: 20,
							cursor: 'pointer',
							border: 'none',
							fontFamily: 'Montserrat',
						}}
					>
						En cours
					</button>

					<button
						type='button'
						onClick={() => {
							history.push(
								`/chauffeur/transports/${commande._id}/signaler`
							)
						}}
						disabled={loadingSignature}
						style={{
							padding: '1rem',
							background: commande?.signaler
								? '#FCC200'
								: '#838EAB',
							color: commande?.signaler ? 'white' : '#9EA8BF',
							cursor: 'pointer',
							borderRadius: 50,
							fontWeight: 'bold',
							fontSize: 20,
							border: 'none',
							fontFamily: 'Montserrat',
						}}
					>
						Signaler{' '}
						{commande?.signaler && `+${commande.signalement_count}`}
					</button>

					<button
						type='button'
						onClick={() => {
							setStatut('terminer')}
						}
						disabled={loadingSignature}
						style={{
							padding: '1rem',
							background:
								statut === 'terminer' ? '#0FD39E' : '#838EAB',
							color: statut === 'terminer' ? 'white' : '#9EA8BF',
							borderRadius: 50,
							fontWeight: 'bold',
							fontSize: 20,
							cursor: loadingSignature ? 'wait' : 'pointer',
							border: 'none',
							fontFamily: 'Montserrat',
						}}
					>
						Terminer
					</button>
				</div>
			</div>

			{commande.signed && (
				<button
					type='button'
					onClick={async () => {
						setShowSignatureLoading(true)
						await requestSignatureFile(commande._id)

						//await downloadSignature(envelopeId, access_token)
						setShowSignatureLoading(false)
					}}
					style={{
						padding: '1rem',
						background: '#0FD39E',
						color: 'white',
						borderRadius: 50,
						fontWeight: 'bold',
						fontSize: 20,
						cursor: showSignatureLoading ? 'wait' : 'pointer',
						border: 'none',
						fontFamily: 'Montserrat',
						marginTop: '1rem',
					}}
				>
					{showSignatureLoading ? 'Chargement' : 'Voir signature'}
				</button>
			)}

			<div
				onClick={async () => {
					setLoadingSignature(true)
					try {
						await updateStatutOnlyCommande(commande._id, statut);
					} finally {
						setLoadingSignature(false)
					}
					history.goBack()
				}}
				style={{
					fontSize: 20,
					background: '#50F5A9',
					padding: '1rem 2rem',
					marginTop: '2rem',
					color: 'white',
					borderRadius: 5,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					cursor: 'pointer',
					fontWeight: 'bold',
				}}
			>
				{loadingSignature ? 'Chargement' : 'Enregistrer'} 
			</div>
		</FormContentSection>
	)
}

function SingleTransportChauffeur(props) {
	const { id } = useParams()

	const [commande, setCommande] = useState(null)

	useEffect(() => {
		async function _getCommande(id) {
			const commande = await getCommande(id)
			setCommande(commande)
		}

		if (id) {
			_getCommande(id)
		}
	}, [id])

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
					fontFamily: 'Montserrat',
				}}
			>
				<GradientText>{'détails commande'.toUpperCase()}</GradientText>

				<div
					style={{
						width: '65%',
					}}
				>
					{commande && <CommandeStatus commande={commande} />}
				</div>

				<div
					style={{
						width: '65%',
					}}
				>
					{commande?.type_commande === 'mise-a-disposition' && (
						<TransportTracking commande={commande} />
					)}
				</div>

				{commande && (
					<CommandeForm
						hideSubmit
						disabled
						onSubmit={() => {}}
						preloadForm={true}
						preloadData={{ ...commande, prix: null }}
					/>
				)}
			</div>
		</LayoutChauffeur>
	)
}

export default SingleTransportChauffeur
