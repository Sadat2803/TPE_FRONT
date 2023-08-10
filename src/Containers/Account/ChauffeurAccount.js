import 'flatpickr/dist/themes/material_blue.css'

import { Controller, useForm } from 'react-hook-form'
import {
	FormSectionCard,
	GradientText,
	SubmitButton,
	SubmitButtonContainer,
	Wrapper,
} from '../PasserCommande/PasserCommande.styles'
import React, { useEffect, useState } from 'react'
import {
	getSingleChauffeur,
	updateChauffeurAccount,
	updateTransporterAccount,
} from '../../api/clients'
import { useDispatch, useSelector } from 'react-redux'

import { CustomInput } from '../RegisterTransporter/style'
import Flatpickr from 'react-flatpickr'
import { French } from 'flatpickr/dist/l10n/fr.js'
import LayoutChauffeur from '../../Components/LayoutChauffeur/LayoutChauffeur'
import toast from 'react-hot-toast'
import { updateProfile } from '../../redux/auth'

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

function ChauffeurAccount(props) {
	const { _id } = useSelector((state) => state.auth.user)

	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm()

	const [chauffeur, setChauffeur] = useState()

	useEffect(() => {
		async function fetchChauffeur(_id) {
			const data = await getSingleChauffeur(_id)
			setChauffeur(data)
			reset(data)
		}

		if (_id) {
			fetchChauffeur(_id)
		}
	}, [_id])

	const onSubmit = async (data) => {
		delete data.password
		delete data.confirm_password

		try {
			const res = await updateChauffeurAccount(data)

			toast.success('Votre compte a été mis à jour', {
				style: {
					fontFamily: 'Montserrat',
				},
			})

			dispatch(updateProfile(res))

			await sleep(1000)

			window.location.reload()
		} catch (error) {
			console.log(error)
			toast.error("Une erreur s'est produite", {
				style: {
					fontFamily: 'Montserrat',
				},
			})
		}
	}

	console.log(errors)

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
				<Wrapper>
					<GradientText>MON COMPTE</GradientText>
				</Wrapper>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
					}}
				>
					<div
						style={{
							width: '60%',
							fontFamily: 'Montserrat',
							alignSelf: 'center',
						}}
					>
						<form onSubmit={handleSubmit(onSubmit)}>
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
												disabled
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
												disabled
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
										{[
											'Léger',
											'Lourds',
											'Super lourds',
										].map((item, index) => (
											<div
												key={String(index)}
												style={{
													width: '20%',
												}}
											>
												<input
													type='checkbox'
													disabled
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
										))}
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
											disabled
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
											disabled
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
											disabled
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
											disabled
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
											disabled
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
													disabled
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
													disabled
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
													disabled
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
													disabled
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
											Changer mon mot de passe
										</span>
										<CustomInput
											disabled
											type='password'
											placeholder=''
											// {...register('_password', {
											// 	required: true,
											// })}
										/>
									</div>

									<div style={{ width: 50 }} />

									{/* <div
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
											Confirmer mot de passe
										</span>
										<CustomInput
											type='password'
											placeholder='***'
											{...register('_repeat_password', {
												required: true,
											})}
										/>
									</div> */}
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
			</div>
		</LayoutChauffeur>
	)
}

export default ChauffeurAccount
