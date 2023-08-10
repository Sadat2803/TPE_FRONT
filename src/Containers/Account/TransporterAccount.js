import {
	FormContentSection,
	FormSectionCard,
	FormSectionTitle,
	GradientText,
	SubmitButton,
	SubmitButtonContainer,
	Wrapper,
} from '../PasserCommande/PasserCommande.styles'
import React, { useEffect, useRef, useState } from 'react'
import {
	getSingleClient,
	getSingleTransporter,
	updateClientAccount,
	updateTransporterAccount,
} from '../../api/clients'
import { useDispatch, useSelector } from 'react-redux'

import AddVehicleRegister from '../../Components/AddVehicle/AddVehicleRegister'
import Container from '../../Components/LayoutClient/container.component'
import { CustomInput } from '../RegisterTransporter/style'
import File from '../../assets/img/file@2x.png'
import LayoutTransporter from '../../Components/LayoutTransporter/LayoutTransporter'
import Modal from 'react-modal'
import { PUBLIC } from '../../api/base'
import UploadFile from '../../Components/UploadSingleFile/upload.component'
import toast from 'react-hot-toast'
import { updateProfile } from '../../redux/auth'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function TransporterAccount(props) {
	const { _id } = useSelector((state) => state.auth.user)

	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm()

	const [transporter, setTransporter] = useState()

	useEffect(() => {
		async function fetchTransporter(_id) {
			const data = await getSingleTransporter(_id)
			setTransporter(data)
			reset(data)
		}

		if (_id) {
			fetchTransporter(_id)
		}
	}, [_id])

	const logo = useRef()
	logo.current = watch('logo', null)

	const kbis = useRef()
	kbis.current = watch('kbis', null)

	// useEffect(() => {
	// 	register('logo', null)
	// 	register('kbis', null)
	// }, [])

	const onSubmit = async (data) => {
		console.log(transporter)

		const update = {
			...transporter,
			password: data.password,
		}

		if (data.password.length === 0) {
			delete data.password
			delete update.password
		}

		update.logo = logo.current?.id
		update.kbis = kbis.current?.id

		try {
			const res = await updateTransporterAccount(update)

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
		<LayoutTransporter>
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
					}}
				>
					<div
						style={{
							//width: '60%',
							fontFamily: 'Montserrat',
							alignSelf: 'center',
						}}
					>
						<form onSubmit={handleSubmit(onSubmit)}>
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
										disabled
										placeholder='Wayne'
										{...register('societe', {
											required: true,
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
										disabled
										placeholder='Doe'
										{...register('last_name', {
											required: true,
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
										disabled
										placeholder='John'
										{...register('first_name', {
											required: true,
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
										disabled
										placeholder='Directeur d’exploitation'
										{...register('quality', {
											required: true,
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
										disabled
										placeholder='54 rue avenue de la grande armée, 75017, Paris, France'
										{...register('address', {
											required: true,
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
										disabled
										placeholder='test@gmail.com'
										{...register('email', {
											required: true,
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
											required: true,
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
											Changer mon mot de passe
										</span>
									</div>
									<CustomInput
										//disabled
										autoComplete='new-password'
										placeholder='Saisir mot de passe'
										{...register('password', {
											minLength: 8,
										})}
									/>
								</div>

								{/* <div
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
											Confirmer mot de passe
										</span>
									</div>
									<CustomInput
										type='password'
										placeholder=''
										{...register('confirm_password', {
											required: true,
											min: 8,
											validate: (value) =>
												value === password.current ||
												'The passwords do not match',
										})}
									/>
								</div> */}

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
										<span
											style={{
												marginBottom: '1rem',
												color: '#838EAB',
												fontSize: 14,
											}}
										>
											(Facultatif)
										</span>
									</div>
									<UploadFile
										name='logo'
										accept='.jpg, .png'
										onFile={(file) =>
											setValue('logo', file)
										}
									/>
									{logo.current && (
										<div>
											<img
												style={{
													width: 100,
													height: 100,
													borderRadius: 5,
													objectFit: 'cover',
												}}
												src={`${PUBLIC}/${logo.current?.name}`}
											/>
										</div>
									)}
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
										<span
											style={{
												marginBottom: '1rem',
												color: '#838EAB',
												fontSize: 14,
											}}
										>
											(Facultatif)
										</span>
									</div>
									<UploadFile
										name='kbis'
										accept='.jpg, .png, .pdf'
										onFile={(file) =>
											setValue('kbis', file)
										}
									/>
									{kbis?.current?.mimetype !==
										'application/pdf' && (
										<img
											style={{
												width: 100,
												height: 100,
												borderRadius: 5,
												objectFit: 'cover',
											}}
											src={`${PUBLIC}/${kbis?.current?.name}`}
										/>
									)}

									{kbis?.current?.mimetype ==
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
														`${PUBLIC}/${kbis?.current?.name}`
													)
												}}
											>
												{kbis?.current?.name}
											</span>
										</div>
									)}
								</div>
							</FormSectionCard>

							<div style={{ height: '2rem' }} />

							<AddVehicleRegister
								initialVehicles={transporter?.vehicules}
								onChange={(items) => {
									console.log(items)
									setValue('vehicules', items)
								}}
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
											Combien de rippeur pouvez-vous en
											plus du chauffeur ?
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
												
												min={0}
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
														justifyContent:
															'flex-start',
														marginBottom: '1rem',
													}}
												>
													<input
														type='checkbox'
														style={{
															marginRight: '1rem',
														}}
														{...register(
															'manutention',
															{
																//required: true,
															}
														)}
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
														justifyContent:
															'flex-start',
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
		</LayoutTransporter>
	)
}

export default TransporterAccount
