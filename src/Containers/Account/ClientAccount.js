import {
	FormSectionCard,
	GradientText,
	SubmitButton,
	SubmitButtonContainer,
	Wrapper,
} from '../PasserCommande/PasserCommande.styles'
import React, { useEffect, useRef, useState } from 'react'
import { getSingleClient, updateClientAccount } from '../../api/clients'
import { useDispatch, useSelector } from 'react-redux'

import Container from '../../Components/LayoutClient/container.component'
import { CustomInput } from '../RegisterTransporter/style'
import File from '../../assets/img/file@2x.png'
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

function ClientAccount() {
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

	const [client, setClient] = useState()

	useEffect(() => {
		async function fetchClient(_id) {
			const data = await getSingleClient(_id)

			delete data.createdAt
			delete data.epi
			delete data.manutention
			delete data.premium
			delete data.reduction
			delete data.role
			delete data.status
			delete data.suspendre
			delete data.updatedAt
			delete data.vehicules
			delete data.verification
			delete data.verified
			setClient(data)
			reset(data)
		}

		if (_id) {
			fetchClient(_id)
		}
	}, [_id])

	// const password = useRef()
	// password.current = watch('password', '')

	const logo = useRef()
	logo.current = watch('logo', null)

	const kbis = useRef()
	kbis.current = watch('kbis', null)

	// useEffect(() => {
	// 	register('logo', null)
	// 	register('kbis', null)
	// }, [])

	const onError = async (errors) => {
		if (errors.password) {
			toast('Mot de pass doit être de 8 caractères minimum', {
				style: {
					fontFamily: 'Montserrat',
				},
			})
		}
	}

	const onSubmit = async (data) => {
		const update = {
			...client,
			password: data.password,
		}

		if (data.password.length === 0) {
			delete data.password
			delete update.password
		}

		console.log(data)

		data.logo = logo.current?.id
		data.kbis = kbis.current?.id

		// delete data.password
		// delete data.confirm_password

		try {
			const res = await updateClientAccount(update)

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
		<Container>
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
						width: '60%',
						fontFamily: 'Montserrat',
						alignSelf: 'center',
					}}
				>
					<form onSubmit={handleSubmit(onSubmit, onError)}>
						<FormSectionCard>
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
								<div style={{ width: '1rem' }} />
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
										SIRET
									</span>
									<CustomInput
										type='text'
										disabled
										placeholder='833 543 509 000'
										{...register('siret', {
											required: true,
										})}
									/>
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

								<div style={{ width: '1rem' }} />

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

								<div style={{ width: '1rem' }} />

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
										Domaine d’activité
									</span>
									<CustomInput
										type='text'
										disabled
										placeholder='Transport frigorifique'
										{...register('domain', {
											required: true,
										})}
									/>
								</div>
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
									display: 'flex',
									flexDirection: 'row',
								}}
							>
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

								<div style={{ width: '1rem' }} />

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
										Adresse email
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
										paddingBottom: '2rem',
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
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
										type='password'
										//disabled
										autoComplete='new-password'
										placeholder='Saisir mot de passe'
										{...register('password', {
											minLength: 8,
										})}
									/>
								</div>

								{/* <div style={{ width: '1rem' }} />

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
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginBottom: '1rem',
									width: '50%',
									fontFamily: 'Montserrat',
									//marginLeft: 10,
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
									onFile={(file) => setValue('logo', file)}
								/>
								{logo.current && (
									<div>
										<img
											alt=''
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
									//marginLeft: 10,
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
									onFile={(file) => setValue('kbis', file)}
								/>
								{kbis?.current?.mimetype !==
									'application/pdf' && (
									<img
										alt=''
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
											alt=''
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
						<div style={{ height: '1rem' }} />
						<SubmitButtonContainer>
							<SubmitButton type='submit'>
								Enregistrer
							</SubmitButton>
						</SubmitButtonContainer>
					</form>
				</div>
			</div>
		</Container>
	)
}

export default ClientAccount
