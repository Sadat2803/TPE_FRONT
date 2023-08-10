import {
	FormContentSection,
	FormSectionCard,
	FormSectionTitle,
	GradientText,
	SubmitButton,
	SubmitButtonContainer,
} from '../PasserCommande/PasserCommande.styles'
import React, { useEffect, useRef, useState } from 'react'

import AddVehicleRegister from '../../Components/AddVehicle/AddVehicleRegister'
import CommonHeader from '../../Components/CommonHeader/common-header.component'
import { CustomInput } from './style'
import Footer from '../../Components/Footer/footer.component'
import Modal from 'react-modal'
import { PUBLIC } from '../../api/base'
import Spinner from '../../Components/Spinner'
import UploadFile from '../../Components/UploadSingleFile/upload.component'
import { signup } from '../../api/auth'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

Modal.setAppElement('#root')

function RegisterTransporter(props) {
	const { register, handleSubmit, watch, setValue } = useForm()

	const password = useRef()
	password.current = watch('password', '')

	const logo = useRef()
	logo.current = watch('logo', null)

	const kbis = useRef()
	kbis.current = watch('kbis', null)

	const history = useHistory()

	const [loading, setLoading] = useState(false)

	const [modalIsOpen, setModalIsOpen] = useState(false)

	// useEffect(() => {
	// 	register('logo', null)
	// 	register('kbis', { required: true })
	// }, [])

	const onError = async (errors) => {
		console.log(errors)
		if (errors.password) {
			toast('Mot de pass doit être de 8 caractères minimum', {
				style: {
					fontFamily: 'Montserrat',
				},
			})
		}

		if (errors.kbis) {
			toast('Kbis obligatoire', {
				style: {
					fontFamily: 'Montserrat',
				},
			})
		}
	}

	const onSubmit = async (data) => {
		delete data.confirm_password

		data.logo = logo?.current?.id
		data.kbis = kbis?.current?.id

		try {
			setLoading(true)

			const res = await signup({
				...data,
				role: 'transporter',
			})

			setLoading(false)

			setModalIsOpen(true)

			//history.push('/')

			//history.push(`/felicitation/${res.user.role}`)
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
			setLoading(false)
		}
	}

	return (
		<div>
			<CommonHeader />
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
				<GradientText>
					{'Créer un compte transporteur'.toUpperCase()}
				</GradientText>
				<div
					style={{
						width: '50%',
						fontFamily: 'Montserrat',
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
										placeholder=''
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
										Qualité
									</span>
									<CustomInput
										type='text'
										placeholder=''
										{...register('quality', {
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
									placeholder=''
									{...register('address', {
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
									Ville
								</span>
								<CustomInput
									type='text'
									placeholder=''
									{...register('city', {
										required: false,
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
									placeholder=''
									{...register('postalCode', {
										required: false,
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
										Email
									</span>
									<CustomInput
										type='text'
										placeholder=''
										{...register('email', {
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
										placeholder=''
										{...register('password', {
											required: true,
											minLength: 8,
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
											minLength: 8,
											validate: (value) =>
												value === password.current ||
												'The passwords do not match',
										})}
									/>
								</div>
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
								</div>
								<UploadFile
									name='kbis'
									accept='.jpg, .png, .pdf'
									onFile={(file) => setValue('kbis', file)}
								/>
								{kbis.current &&
									kbis.current?.mimetype !==
										'application/pdf' && (
										<div>
											<img
												style={{
													width: 100,
													height: 100,
													borderRadius: 5,
													objectFit: 'cover',
												}}
												src={`${PUBLIC}/${kbis.current?.name}`}
											/>
										</div>
									)}
							</div>
						</FormSectionCard>

						<div style={{ height: '2rem' }} />

						<AddVehicleRegister
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
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											marginBottom: '1rem',
											justifyContent: 'space-between',
										}}
									>
										<span
											style={{
												color: 'black',
												fontSize: 14,
											}}
										>
											Combien de rippeur pouvez-vous en
											plus du chauffeur ?
										</span>
										<span
											style={{
												color: 'black',
												fontSize: 14,
											}}
										>
											(Facultatif)
										</span>
									</div>

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
											{...register('rippeurs')}
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

									<button
										type='button'
										style={{
											marginBottom: '1rem',
											border: 'none',
											alignSelf: 'flex-start',
											padding: '1rem 2rem',
											background: '#72c5ed',
											color: 'white',
											fontWeight: 'bold',
											cursor: 'pointer',
											borderRadius: 5,
											fontFamily: 'Montserrat',
										}}
										onClick={() =>
											setValue('manutention', [
												'Diable',
												'Transpalette manuel',
												'Sangle',
											])
										}
									>
										Tout
									</button>

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
															required: true,
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

									<button
										type='button'
										style={{
											marginBottom: '1rem',
											border: 'none',
											alignSelf: 'flex-start',
											padding: '1rem 2rem',
											background: '#72c5ed',
											color: 'white',
											fontWeight: 'bold',
											cursor: 'pointer',
											borderRadius: 5,
											fontFamily: 'Montserrat',
										}}
										onClick={() =>
											setValue('epi', [
												'Casque',
												'Gants',
												'Masque',
												'Lunettes',
												'Chaussure de sécurité',
												'Gilet de visibilité',
											])
										}
									>
										Tout
									</button>

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
														required: true,
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
							<SubmitButton type='submit' disabled={loading}>
								{loading ? (
									<div className='loader'></div>
								) : (
									'S’inscrire'
								)}
							</SubmitButton>
						</SubmitButtonContainer>
					</form>
				</div>
			</div>
			<Footer />

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => {}}
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
					},
				}}
				contentLabel='Example Modal'
			>
				<div
					style={{
						width: '35rem',
						fontFamily: 'Montserrat',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 15,
						textAlign: 'center',
					}}
				>
					<GradientText>{'Félicitation'.toUpperCase()}</GradientText>

					<div
						style={{
							textAlign: 'center',
						}}
					>
						La création de votre compte a bien été enregistré 😃
						<br />
						la plate-forme du transport doit maintenant validé votre
						compte.
						<br />
						<div style={{ height: 20 }} />
						<span>
							Vous recevrez un mail avec les informations
							nécessaires. À très vite 👍
						</span>
					</div>

					<button
						onClick={() => {
							history.push('/')
						}}
						style={{
							padding: '0.5rem 1rem',
							background: '#50F5A9',
							border: 'none',
							cursor: 'pointer',
							color: 'white',
							borderRadius: 7,
							marginTop: 30,
						}}
					>
						OK
					</button>
				</div>
			</Modal>
		</div>
	)
}

export default RegisterTransporter
