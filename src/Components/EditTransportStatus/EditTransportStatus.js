import React, { useState } from 'react'

import Modal from 'react-modal'
import Select from 'react-select'
import { StyledTextArea } from '../../Containers/PasserCommande/PasserCommande.styles'
import { updatePaymentForCommande } from '../../api/commande'

const PAYMENT_STATUS_OPTIONS = [
	{
		label: 'A facturer',
		value: 'a-facturer',
	},
	{
		label: 'En attente',
		value: 'en-attente',
	},
	{
		label: 'Payé',
		value: 'paye',
	},
	{
		label: 'Défault',
		value: 'default',
	},
]

function EditTransportStatus({
	modalIsOpen,
	setModalIsOpen,
	transport,
	onSuccess = () => {},
}) {
	const [prix, setPrix] = useState(transport.prix)
	const [paymentStatus, setPaymentStatus] = useState(
		transport.paymentStatus ?? null
	)
	const [paymentNote, setPaymentNote] = useState(transport.paymentNote)

	const [loading, setLoading] = useState(false)

	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={() => setModalIsOpen(false)}
			style={{
				overlay: {
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.45)',
				},
				content: {
					top: '50%',
					left: '50%',
					right: 'auto',
					bottom: 'auto',
					marginRight: '-50%',
					transform: 'translate(-50%, -50%)',
					borderRadius: 19,
					padding: '2rem',
				},
			}}
			contentLabel=''
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					fontFamily: 'Montserrat',
				}}
			>
				<label>Tarif</label>

				<input
					style={{
						padding: '1rem',
						borderRadius: 5,
						border: '1px solid #E4EAF0',
						width: '100%',
						//height: '4rem',
						marginRight: '1rem',
						marginBottom: '1rem',
						fontFamily: 'Montserrat',
					}}
					type='number'
					value={prix}
					onChange={(e) => setPrix(Number(e.target.value))}
				/>

				<label>Statut</label>

				<Select
					options={PAYMENT_STATUS_OPTIONS}
					styles={{
						option: (provided, state) => ({
							...provided,
							fontFamily: 'Montserrat',
						}),
					}}
					value={
						PAYMENT_STATUS_OPTIONS.find(
							(item) => item.value === paymentStatus
						) ?? { label: 'Défault', value: 'default' }
					}
					menuPortalTarget={document.querySelector('body')}
					onChange={(x) => setPaymentStatus(x.value)}
				/>

				<label style={{ marginTop: '1rem' }}>Notes</label>

				<textarea
					type='text'
					rows={4}
					style={{
						marginBottom: '1rem',
						fontFamily: 'Montserrat',
					}}
					value={paymentNote}
					onChange={(e) => setPaymentNote(e.target.value)}
				/>

				<button
					onClick={async () => {
						setLoading(true)
						await updatePaymentForCommande(
							transport._id,
							prix,
							paymentStatus,
							paymentNote
						)
						await onSuccess()
						setLoading(false)
						setModalIsOpen(false)
					}}
					disabled={loading}
					style={{
						padding: '1rem 2rem',
						background: '#60d2f8',
						border: 'none',
						cursor: 'pointer',
						color: 'white',
						borderRadius: 7,
						fontFamily: 'Montserrat',
						fontWeight: 'bold',
						marginRight: '1rem',
						width: '100%',
					}}
				>
					{loading ? 'En cours' : 'Enregistrer'}
				</button>
			</div>
		</Modal>
	)
}

export default EditTransportStatus
