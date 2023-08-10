import { Controller, useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import {
	deleteClient,
	getSingleClient,
	toggleSuspendreClient,
	updateClient,
} from '../../api/clients'
import { useHistory, useParams } from 'react-router'

import { CustomInput } from '../RegisterTransporter/style'
import File from '../../assets/img/file@2x.png'
import { FormSectionCard } from '../PasserCommande/PasserCommande.styles'
import LayoutAdmin from '../../Components/LayoutAdmin/LayoutAdmin'
import { PUBLIC } from '../../api/base'
import Switch from 'react-switch'
import toast from 'react-hot-toast'

function SingleClient(props) {
	const { register, handleSubmit, reset, control } = useForm()
	const { id } = useParams()
	const history = useHistory()

	const [client, setClient] = useState(null)
	const [suspendre, setSuspendre] = useState(false)

	useEffect(() => {
		async function getClient(id) {
			const data = await getSingleClient(id)
			setClient(data)
			setSuspendre(data.suspendre === true)
			reset(data)
		}

		if (id) {
			getClient(id)
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

		await updateClient(client._id, values)
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
									Mes clients
								</p>
								<p style={{ fontSize: 14 }}>Fiche Client</p>
							</div>

							<div
								style={{
									display: 'flex',
								}}
							>
								<button
									onClick={async () => {
										await toggleSuspendreClient(
											client._id,
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
									onClick={async () => {
										await deleteClient(client._id)
										history.goBack()
									}}
									style={{
										border: 'none',
										background: '#F7CDC9',
										color: '#C5431C',
										fontSize: 17,
										fontFamily: 'Montserrat',
										fontWeight: 'bold',
										padding: '0.6rem 1rem',
										borderRadius: 5,
										cursor: 'pointer',
										marginLeft: '1rem',
									}}
								>
									Supprimer
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
									placeholder='Wayne'
									{...register('societe', {
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
									placeholder='Directeur d’exploitation'
									{...register('quality', {
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
									placeholder='Transport frigorifique'
									{...register('domain', {
										required: true,
									})}
								/>
							</div>
						</div>

						<div
							style={{
								width: '100%',
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
									required: true,
								})}
							/>
						</div>

						<div
							style={{
								width: '100%',
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
								placeholder='Paris'
								{...register('city', {
									required: false,
								})}
							/>
						</div>

						<div
							style={{
								width: '100%',
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
								placeholder='75017'
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

						{client?.logo && (
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
								<span
									style={{
										marginBottom: '1rem',
										color: 'black',
										fontSize: 14,
									}}
								>
									Logo (PNG ou JPG)
								</span>

								<img
									alt=''
									style={{
										width: 100,
										height: 100,
										borderRadius: 5,
										objectFit: 'cover',
									}}
									src={`${PUBLIC}/${client.logo.name}`}
								/>
							</div>
						)}

						{client?.kbis && (
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
								<span
									style={{
										marginBottom: '1rem',
										color: 'black',
										fontSize: 14,
									}}
								>
									KBIS (PDF ou JPG)
								</span>

								{client?.kbis?.mimetype !==
									'application/pdf' && (
									<img
										alt=''
										style={{
											width: 100,
											height: 100,
											borderRadius: 5,
											objectFit: 'cover',
										}}
										src={`${PUBLIC}/${client?.kbis?.name}`}
									/>
								)}

								{client?.kbis?.mimetype ==
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
													`${PUBLIC}/${client.kbis.name}`
												)
											}}
										>
											{client?.kbis?.name}
										</span>
									</div>
								)}
							</div>
						)}

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
									Activer compte premium
								</span>
								<Controller
									control={control}
									name='premium'
									render={({
										field: { value, onChange },
									}) => (
										<Switch
											onChange={onChange}
											checked={value}
											offColor='#F3F6F9'
											onColor='#F3F6F9'
											checkedIcon={false}
											uncheckedIcon={false}
											offHandleColor='#BFBFBF'
											onHandleColor='#168EEA'
											height={40}
											width={80}
											boxShadow='0px 5px 7px 0px rgba(0,0,0,0.23)'
										/>
									)}
								/>
							</div>

							<div style={{ width: 50 }} />

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
									Paramétrer une réduction en %
								</span>
								<CustomInput
									type='number'
									min={0}
									max={100}
									{...register('reduction', {})}
								/>
							</div>
						</div>
					</FormSectionCard>
				</form>
			</div>
		</LayoutAdmin>
	)
}

export default SingleClient
