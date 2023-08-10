import {
	FormContentSection,
	FormSectionCard,
	FormSectionTitle,
} from '../../PasserCommande/PasserCommande.styles'
import React, { useEffect, useState } from 'react'
import {
	getSingleTransporter,
	toggleSuspendreTransporter,
} from '../../../api/transporteurs'
import { useHistory, useParams } from 'react-router'

import AddVehicleRegister from '../../../Components/AddVehicle/AddVehicleRegister'
import { CustomInput } from '../../RegisterTransporter/style'
import File from '../../../assets/img/file@2x.png'
import LayoutAdmin from '../../../Components/LayoutAdmin/LayoutAdmin'
import { PUBLIC } from '../../../api/base'
import toast from 'react-hot-toast'
import { updateTransporter } from '../../../api/clients'
import { useForm } from 'react-hook-form'

function SingleTransporter(props) {
	const { register, handleSubmit, setValue, reset } = useForm()
	const { id } = useParams()

	const history = useHistory()

	const [transporter, setTransporter] = useState(null)
	const [suspendre, setSuspendre] = useState(false)

	useEffect(() => {
		console.log(id)
		async function getTransporter(id) {
			const data = await getSingleTransporter(id)
			setTransporter(data)
			setSuspendre(data.suspendre === true)
			reset(data)
		}

		if (id) {
			getTransporter(id)
		}
	}, [id])

	const onSubmit = async (values) => {
		if (values.password.length === 0) {
			delete values.password
		}

		delete values._id
		delete values.verified
		delete values.verification
		delete values.updatedAt
		delete values.logo
		delete values.kbis
		delete values.createdAt
		delete values.email
		delete values.suspendre
		delete values.status

		if (!values.reduction) {
			values.reduction = 0
		}

		await updateTransporter(transporter._id, values)
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

	return (
		<LayoutAdmin>
			<div
				style={{
					width: '100%',
					fontFamily: 'Montserrat',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					paddingBottom: '1rem',
				}}
			>
				<form
					style={{ width: '60%' }}
					onSubmit={handleSubmit(onSubmit, onError)}
				>
					<FormSectionCard>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<div>
								<p
									style={{
										color: 'black',
										fontWeight: 'bold',
									}}
								>
									Transporteurs
								</p>
								<p style={{ fontSize: 14 }}>
									Fiche Transporteur
								</p>
							</div>

							<div
								style={{
									display: 'flex',
								}}
							>
								<button
									onClick={async () => {
										await toggleSuspendreTransporter(
											transporter._id,
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

								<button
									type='submit'
									style={{
										border: 'none',
										background: '#168EEA',
										color: '#FFF',
										fontSize: 17,
										fontFamily: 'Montserrat',
										fontWeight: 'bold',
										padding: '0.6rem 1rem',
										borderRadius: 5,
										cursor: 'pointer',
										marginLeft: '2rem',
									}}
								>
									Enregistrer
								</button>
							</div>
						</div>
					</FormSectionCard>

					<FormSectionCard>
						<div
							style={{
								width: '50%',
								display: 'flex',
								flexDirection: 'column',
								paddingBottom: '2rem',
							}}
						>
							<span
								style={{
									color: '#262626',
									paddingBottom: '1rem',
								}}
							>
								Nom société
							</span>
							<CustomInput
								type='text'
								placeholder='Wayne'
								{...register('societe', {
									//required: true,
								})}
							/>
						</div>

						<div
							style={{
								width: '50%',
								display: 'flex',
								flexDirection: 'column',
								paddingBottom: '2rem',
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
									//required: true,
								})}
							/>
						</div>

						<div
							style={{
								width: '50%',
								display: 'flex',
								flexDirection: 'column',
								paddingBottom: '2rem',
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
								placeholder='John'
								{...register('first_name', {
									//required: true,
								})}
							/>
						</div>

						<div
							style={{
								width: '50%',
								display: 'flex',
								flexDirection: 'column',
								paddingBottom: '2rem',
							}}
						>
							<span
								style={{
									color: '#262626',
									paddingBottom: '1rem',
								}}
							>
								Qualité
							</span>
							<CustomInput
								type='text'
								placeholder='Directeur d’exploitation'
								{...register('quality', {
									////required: true,
								})}
							/>
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								paddingBottom: '2rem',
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
									////required: true,
								})}
							/>
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								paddingBottom: '2rem',
							}}
						>
							<span
								style={{
									color: '#262626',
									paddingBottom: '1rem',
								}}
							>
								Ville
							</span>
							<CustomInput
								type='text'
								placeholder='54 rue avenue de la grande armée, 75017, Paris, France'
								{...register('city', {
									////required: false,
								})}
							/>
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								paddingBottom: '2rem',
							}}
						>
							<span
								style={{
									color: '#262626',
									paddingBottom: '1rem',
								}}
							>
								Code Postal
							</span>
							<CustomInput
								type='text'
								placeholder='54 rue avenue de la grande armée, 75017, Paris, France'
								{...register('postalCode', {
									////required: false,
								})}
							/>
						</div>

						<div
							style={{
								width: '50%',
								display: 'flex',
								flexDirection: 'column',
								paddingBottom: '2rem',
							}}
						>
							<span
								style={{
									color: '#262626',
									paddingBottom: '1rem',
								}}
							>
								Email
							</span>
							<CustomInput
								type='text'
								placeholder='test@gmail.com'
								{...register('email', {
									////required: true,
								})}
							/>
						</div>

						<div
							style={{
								width: '50%',
								display: 'flex',
								flexDirection: 'column',
								paddingBottom: '2rem',
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
									//required: true,
								})}
							/>
						</div>

						<div
							style={{
								width: '50%',
								display: 'flex',
								flexDirection: 'column',
								paddingBottom: '2rem',
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
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
							</div>
							<CustomInput
								type='password'
								autoComplete='new-password'
								placeholder='Saisir mot de passe'
								{...register('password', {
									minLength: 8,
								})}
							/>
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginBottom: '1rem',
								width: '50%',
								fontFamily: 'Montserrat',
								marginLeft: 10,
								marginTop: 10,
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<span
										style={{
											marginBottom: '1rem',
											color: 'black',
											fontSize: 14,
										}}
									>
										Logo(PNG ou JPG)
									</span>
								</div>

								{transporter?.logo && (
									<div>
										<img
											style={{
												width: 100,
												height: 100,
												borderRadius: 5,
												objectFit: 'cover',
											}}
											src={`${PUBLIC}/${transporter.logo.name}`}
										/>
									</div>
								)}
							</div>
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '50%',
								fontFamily: 'Montserrat',
								marginLeft: 10,
								marginTop: 10,
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<span
										style={{
											marginBottom: '1rem',
											color: 'black',
											fontSize: 14,
										}}
									>
										KBIS (PDF ou JPG)
									</span>
								</div>
								{transporter?.kbis?.mimetype !==
									'application/pdf' && (
									<div>
										<img
											style={{
												width: 100,
												height: 100,
												borderRadius: 5,
												objectFit: 'cover',
											}}
											src={`${PUBLIC}/${transporter?.kbis?.name}`}
										/>
									</div>
								)}

								{transporter?.kbis?.mimetype ==
									'application/pdf' && (
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
										}}
									>
										<img
											src={File}
											style={{
												height: 20,
												marginRight: '1rem',
											}}
										/>
										<span
											style={{
												cursor: 'pointer',
											}}
											onClick={() => {
												window.open(
													`${PUBLIC}/${transporter.kbis.name}`
												)
											}}
										>
											{transporter?.kbis?.name}
										</span>
									</div>
								)}
							</div>
						</div>
					</FormSectionCard>

					<div style={{ height: '2rem' }} />

					<AddVehicleRegister
						initialVehicles={
							transporter ? transporter.vehicules : []
						}
						disableAdd
						onChange={(items) => setValue('vehicules', items)}
					/>

					<div style={{ height: '2rem' }} />

					<FormContentSection>
						<FormSectionTitle>Rippeur</FormSectionTitle>
						<FormSectionCard>
							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									//marginBottom: '2.5rem',
								}}
							>
								<span
									style={{
										marginBottom: '1rem',
										color: 'black',
										fontSize: 14,
									}}
								>
									Nombre de ripper en plus du chauffeur
								</span>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='13.605'
											height='27.839'
											viewBox='0 0 13.605 27.839'
											style={{
												marginRight: '.5rem',
											}}
										>
											<g
												id='user'
												transform='translate(0.5 0.5)'
											>
												<path
													id='Path_11624'
													d='M31.488,8.816A3.412,3.412,0,1,1,34.9,5.4,3.412,3.412,0,0,1,31.488,8.816Zm0-6.054a2.645,2.645,0,1,0,2.645,2.645A2.645,2.645,0,0,0,31.488,2.762Z'
													transform='translate(-25.195 -1.992)'
													fill='#51c7f2'
													stroke='#51c7f2'
													strokeWidth='1'
												/>
												<path
													id='Path_11625'
													d='M30.917,33.11h-.752a.383.383,0,1,1,0-.767h.752A1.484,1.484,0,0,0,32.4,30.861V24.829a1.7,1.7,0,0,0-1.7-1.7H23.03a1.7,1.7,0,0,0-1.7,1.7v6.034a1.484,1.484,0,0,0,1.484,1.481h.725a.383.383,0,1,1,0,.767h-.725a2.252,2.252,0,0,1-2.249-2.249V24.829A2.472,2.472,0,0,1,23.03,22.36H30.7a2.472,2.472,0,0,1,2.469,2.469v6.034A2.252,2.252,0,0,1,30.917,33.11Z'
													transform='translate(-20.562 -14.552)'
													fill='#51c7f2'
													stroke='#51c7f2'
													strokeWidth='1'
												/>
												<path
													id='Path_11626'
													d='M38.027,48.646A2.029,2.029,0,0,1,36,46.619V40.231a.383.383,0,0,1,.767,0v6.388a1.26,1.26,0,0,0,2.52,0V34.509a.383.383,0,0,1,.767,0v12.11A2.029,2.029,0,0,1,38.027,48.646Z'
													transform='translate(-30.081 -21.807)'
													fill='#51c7f2'
													stroke='#51c7f2'
													strokeWidth='1'
												/>
												<path
													id='Path_11627'
													d='M29.453,48.646a2.029,2.029,0,0,1-2.027-2.027V34.509a.383.383,0,0,1,.767,0v12.11a1.26,1.26,0,0,0,2.52,0V40.231a.383.383,0,0,1,.767,0v6.388A2.029,2.029,0,0,1,29.453,48.646Z'
													transform='translate(-24.794 -21.807)'
													fill='#51c7f2'
													stroke='#51c7f2'
													strokeWidth='1'
												/>
											</g>
										</svg>
									</div>

									<CustomInput
										width={'100%'}
										type='number'
										{...register('rippeurs', {
											required: true,
										})}
									/>
								</div>
							</div>
						</FormSectionCard>
					</FormContentSection>

					<div style={{ height: '2rem' }} />

					<FormContentSection>
						<FormSectionTitle>
							Matériels supplémentaire
						</FormSectionTitle>
						<FormSectionCard>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									//marginBottom: '2.5rem',
								}}
							>
								<span
									style={{
										marginBottom: '1rem',
										color: 'black',
										fontSize: 14,
									}}
								>
									Matériels de manutention
								</span>

								<div
									style={{
										display: 'flex',
										flexWrap: 'wrap',
										flexDirection: 'row',
										marginBottom: '1rem',
									}}
								>
									{[
										'Diable',
										'Transpalette manuel',
										'Sangle',
									].map((item, index) => (
										<div
											key={String(index)}
											style={{
												width: '33%',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'flex-start',
												marginBottom: '1rem',
											}}
										>
											<input
												type='checkbox'
												style={{
													marginRight: '1rem',
												}}
												{...register('manutention', {
													//required: true,
												})}
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
									//marginBottom: '2.5rem',
								}}
							>
								<span
									style={{
										marginBottom: '1rem',
										color: 'black',
										fontSize: 14,
									}}
								>
									Epi
								</span>

								<div
									style={{
										display: 'flex',
										flexWrap: 'wrap',
										flexDirection: 'row',
										//marginBottom: '1rem',
									}}
								>
									{[
										'Casque',
										'Gants',
										'Masque',
										'Lunettes',
										'Chaussure de sécurité',
										'Gilet de visibilité',
									].map((item, index) => (
										<div
											key={String(index)}
											style={{
												width: '25%',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'flex-start',
												marginBottom: '1rem',
											}}
										>
											<input
												type='checkbox'
												style={{
													marginRight: '1rem',
												}}
												{...register('epi', {
													//required: true,
												})}
												value={item}
											/>

											<span>{item}</span>
										</div>
									))}
								</div>
							</div>
						</FormSectionCard>
					</FormContentSection>
				</form>
			</div>
		</LayoutAdmin>
	)
}

export default SingleTransporter
