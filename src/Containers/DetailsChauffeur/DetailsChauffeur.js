import 'flatpickr/dist/themes/material_blue.css'

import { Controller, useForm } from 'react-hook-form'
import {
	FormSectionCard,
	GradientText,
	StyledInput,
	SubmitButton,
	SubmitButtonContainer,
} from '../PasserCommande/PasserCommande.styles'
import React, { useEffect, useState } from 'react'
import {
	getChauffeur,
	toggleSuspendreChauffeur,
	updateChauffeur,
} from '../../api/chauffeurs'
import { useHistory, useParams } from 'react-router'

import { CustomInput } from '../RegisterTransporter/style'
import Flatpickr from 'react-flatpickr'
import { French } from 'flatpickr/dist/l10n/fr.js'
import LayoutTransporter from '../../Components/LayoutTransporter/LayoutTransporter'
import Modal from 'react-modal'
import toast from 'react-hot-toast'

Modal.setAppElement('#root')

function DetailsChauffeur(props) {
	const { register, handleSubmit, reset, control } = useForm()

	const { id } = useParams()
	const history = useHistory()

	const [chauffeur, setChauffeur] = useState(null)
	const [suspendre, setSuspendre] = useState(false)

	const onSubmit = async (data) => {
		if (data.password.length === 0) {
			delete data.password
		}

		delete data.transporter
		delete data.type_vehicule
		delete data.vehicules
		delete data.manutention
		delete data.epi
		delete data.createdAt
		delete data.premium
		delete data.reduction
		delete data.status
		delete data.suspendre
		delete data.transporter
		delete data.type_vehicule
		delete data.updatedAt
		delete data.__id
		delete data._id
		delete data.verification
		delete data.verified

		console.log(data)

		await updateChauffeur(id, data)
		history.goBack()
	}

	const onError = async (errors) => {
		if (errors.password) {
			toast('Mot de pass doit être de 8 caractères minimum', {
				style: {
					fontFamily: 'Montserrat',
				},
			})
		}
	}

	useEffect(() => {
		async function _getChauffeur(id) {
			const chauffeur = await getChauffeur(id)
			console.log(chauffeur)
			setChauffeur(chauffeur)
			setSuspendre(chauffeur.suspendre)
			reset(chauffeur)
		}

		if (id) {
			_getChauffeur(id)
		}
	}, [id])

	return (
		<LayoutTransporter>
			<div
				style={{
					//height: '80vh',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					paddingTop: '2rem',
					paddingBottom: '4rem',
				}}
			>
				<GradientText>CHAUFFEUR</GradientText>
				<div
					style={{
						width: '70%',
						fontFamily: 'Montserrat',
					}}
				>
					<FormSectionCard>
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<button
								onClick={async () => {
									await toggleSuspendreChauffeur(
										chauffeur._id,
										!suspendre
									)
									setSuspendre(!suspendre)
								}}
								style={{
									border: 'none',
									background: '#ECC9F7',
									color: '#AB1CC5',
									fontSize: 17,
									fontFamily: 'Montserrat',
									fontWeight: 'bold',
									padding: '0.6rem 1rem',
									borderRadius: 5,
									cursor: 'pointer',
								}}
							>
								{suspendre ? 'Activer' : 'Suspendre'}
							</button>
						</div>
					</FormSectionCard>
					<form onSubmit={handleSubmit(onSubmit, onError)}>
						<FormSectionCard>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginBottom: '2rem',
								}}
							>
								<span
									style={{
										color: '#262626',
										marginBottom: '1rem',
									}}
								>
									Sexe
								</span>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
									}}
								>
									<div
										style={{
											width: '30%',
										}}
									>
										<input
											type='radio'
											style={{
												marginRight: '1rem',
												transform: 'scale(1.5)',
											}}
											{...register('sexe', {
												required: true,
											})}
											value={'homme'}
										/>

										<span>Homme</span>
									</div>

									<div>
										<input
											type='radio'
											style={{
												marginRight: '1rem',
												transform: 'scale(1.5)',
											}}
											{...register('sexe', {
												required: true,
											})}
											value={'femme'}
										/>

										<span>Femme</span>
									</div>
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginBottom: '2rem',
								}}
							>
								<span
									style={{
										color: '#262626',
										marginBottom: '1rem',
									}}
								>
									Permis
								</span>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
									}}
								>
									{['Léger', 'Lourds', 'Super lourds'].map(
										(item, index) => (
											<div
												key={String(index)}
												style={{
													width: '20%',
												}}
											>
												<input
													type='checkbox'
													style={{
														marginRight: '1rem',
														transform: 'scale(1.5)',
													}}
													{...register('permis', {
														required: true,
													})}
													value={item}
												/>

												<span>{item}</span>
											</div>
										)
									)}
								</div>
							</div>

							{/* <div
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginBottom: '2rem',
								}}
							>
								<span
									style={{
										color: '#262626',
										marginBottom: '1rem',
									}}
								>
									Type de véhicule
								</span>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
									}}
								>
									<div
										style={{
											width: '30%',
										}}
									>
										<input
											type='checkbox'
											style={{
												marginRight: '1rem',
												transform: 'scale(1.5)',
											}}
											{...register('type_vehicule', {
												required: true,
											})}
											value={'Véhicule Léger'}
										/>

										<span>Véhicule Léger</span>
									</div>

									<div>
										<input
											type='checkbox'
											style={{
												marginRight: '1rem',
												transform: 'scale(1.5)',
											}}
											{...register('type_vehicule', {
												required: true,
											})}
											value={'Poids lourds'}
										/>

										<span>Poids lourds</span>
									</div>
								</div>
							</div> */}

							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginBottom: '2rem',
								}}
							>
								<div
									style={{
										width: '50%',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<span
										style={{
											color: '#262626',
											paddingBottom: '1rem',
										}}
									>
										Nom
									</span>
									<CustomInput
										type='text'
										placeholder='Doe'
										{...register('last_name', {
											required: true,
										})}
									/>
								</div>

								<div style={{ width: 50 }} />

								<div
									style={{
										width: '50%',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<span
										style={{
											color: '#262626',
											paddingBottom: '1rem',
										}}
									>
										Prénom
									</span>
									<CustomInput
										type='text'
										placeholder='Doe'
										{...register('first_name', {
											required: true,
										})}
									/>
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginBottom: '2rem',
								}}
							>
								<div
									style={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<span
										style={{
											color: '#262626',
											paddingBottom: '1rem',
										}}
									>
										Adresse
									</span>
									<CustomInput
										type='text'
										placeholder='54 rue avenue de la grande armée, 75017, Paris, France'
										{...register('address', {
											required: true,
										})}
									/>
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginBottom: '2rem',
								}}
							>
								<div
									style={{
										width: '50%',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<span
										style={{
											color: '#262626',
											paddingBottom: '1rem',
										}}
									>
										Téléphone
									</span>
									<CustomInput
										type='text'
										placeholder='(0) 01 45 66 32 88'
										{...register('phone', {
											required: true,
										})}
									/>
								</div>

								<div style={{ width: 50 }} />

								<div
									style={{
										width: '50%',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<span
										style={{
											color: '#262626',
											paddingBottom: '1rem',
										}}
									>
										Adresse email
									</span>
									<CustomInput
										type='text'
										placeholder='John.doe@wayne.fr'
										{...register('email', {
											required: true,
										})}
									/>
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginBottom: '2rem',
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										width: '50%',
									}}
								>
									<span
										style={{
											marginBottom: '1rem',
											color: 'black',
											fontSize: 14,
										}}
									>
										Date de naissance
									</span>
									<Controller
										name='date_naiss'
										rules={{ required: true }}
										control={control}
										render={({
											field: { onChange, value },
										}) => (
											<Flatpickr
												onChange={([date]) => {
													onChange(date)
												}}
												className='date-input'
												options={{
													mode: 'single',
													locale: French,
													dateFormat: 'd/m/Y',
												}}
												value={value}
											/>
										)}
									/>
								</div>

								<div style={{ width: 50 }} />

								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										width: '50%',
									}}
								>
									<span
										style={{
											marginBottom: '1rem',
											color: 'black',
											fontSize: 14,
										}}
									>
										Date d’embauche
									</span>
									{/* <StyledInput
										type='date'
										style={{
											fontFamily: 'Montserrat',
											color: '#838EAB',
										}}
										{...register('date_embauche', {
											required: true,
											maxLength: 80,
										})}
									/> */}
									<Controller
										name='date_embauche'
										rules={{ required: true }}
										control={control}
										render={({
											field: { onChange, value },
										}) => (
											<Flatpickr
												onChange={([date]) => {
													onChange(date)
												}}
												className='date-input'
												options={{
													mode: 'single',
													locale: French,
													dateFormat: 'd/m/Y',
												}}
												value={value}
											/>
										)}
									/>
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginBottom: '2rem',
								}}
							>
								<span
									style={{
										color: '#262626',
										marginBottom: '1rem',
									}}
								>
									Fimo
								</span>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
									}}
								>
									{['Oui'].map((item, index) => (
										<div
											key={String(index)}
											style={{
												width: '20%',
											}}
										>
											<input
												type='radio'
												style={{
													marginRight: '1rem',
													transform: 'scale(1.5)',
												}}
												{...register('fimo')}
												value={item}
											/>

											<span>{item}</span>
										</div>
									))}
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginBottom: '2rem',
								}}
							>
								<span
									style={{
										color: '#262626',
										marginBottom: '1rem',
									}}
								>
									Matière dangereuse
								</span>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
									}}
								>
									{['Oui'].map((item, index) => (
										<div
											key={String(index)}
											style={{
												width: '20%',
											}}
										>
											<input
												type='radio'
												style={{
													marginRight: '1rem',
													transform: 'scale(1.5)',
												}}
												{...register('danger')}
												value={item}
											/>

											<span>{item}</span>
										</div>
									))}
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
								}}
							>
								<div
									style={{
										width: '50%',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<span
										style={{
											color: '#262626',
											paddingBottom: '1rem',
										}}
									>
										Mot de passe
									</span>
									<CustomInput
										type='password'
										autoComplete='new-password'
										placeholder='Saisir mot de passe'
										{...register('password', {
											minLength: 8,
										})}
									/>
								</div>
							</div>
						</FormSectionCard>

						<div style={{ height: '1rem' }} />

						<SubmitButtonContainer>
							<SubmitButton type='submit'>
								Enregistrer
							</SubmitButton>
						</SubmitButtonContainer>
					</form>
				</div>
			</div>
		</LayoutTransporter>
	)
}

export default DetailsChauffeur
