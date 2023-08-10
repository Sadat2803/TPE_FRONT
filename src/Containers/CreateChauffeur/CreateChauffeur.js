import React from 'react'
import Modal from 'react-modal'
import LayoutTransporter from '../../Components/LayoutTransporter/LayoutTransporter'
import {
	FormSectionCard,
	GradientText,
	StyledInput,
	SubmitButton,
	SubmitButtonContainer,
} from '../PasserCommande/PasserCommande.styles'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { CustomInput } from '../RegisterTransporter/style'
import { signup } from '../../api/auth'
import { useSelector } from 'react-redux'

import 'flatpickr/dist/themes/material_blue.css'
import Flatpickr from 'react-flatpickr'
import { French } from 'flatpickr/dist/l10n/fr.js'
import { Controller } from 'react-hook-form'

import toast from 'react-hot-toast'

Modal.setAppElement('#root')

function CreateChauffeur(props) {
	const { register, handleSubmit, control } = useForm()

	const history = useHistory()

	const currentUser = useSelector((state) => state.auth.user)

	const onSubmit = async (data) => {
		console.log(data)

		delete data._repeat_password

		data.password = data._password

		try {
			const res = await signup({
				...data,
				role: 'chauffeur',
				transporter: currentUser._id,
			})

			console.log(res)
			history.push(`/chauffeurs`)
		} catch (error) {
			// TODO show error
			const data = error?.response?.data?.errors
			if (data.msg === 'EMAIL_ALREADY_EXISTS') {
				toast.error(
					'Ce mail est déjà utilisé par un autre utilisateur.',
					{
						style: {
							fontFamily: 'Montserrat',
						},
					}
				)
			}
		}
	}

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
				<GradientText>AJOUTER CHAUFFEUR</GradientText>
				<div
					style={{
						width: '70%',
						fontFamily: 'Montserrat',
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
										placeholder=''
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
										placeholder=''
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
										placeholder=''
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
										placeholder=''
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
										placeholder=''
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
										placeholder=''
										{...register('_password', {
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
										Confirmer mot de passe
									</span>
									<CustomInput
										type='password'
										placeholder=''
										{...register('_repeat_password', {
											required: true,
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

export default CreateChauffeur
