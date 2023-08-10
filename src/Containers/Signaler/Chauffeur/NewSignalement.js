import { Controller, useForm } from 'react-hook-form'
import {
	FormContentSection,
	FormSectionCard,
	FormSectionTitle,
	GradientText,
	StyledTextArea,
	SubmitButton,
	SubmitButtonContainer,
} from '../../PasserCommande/PasserCommande.styles'
import React, { useEffect, useRef, useState } from 'react'

import LayoutChauffeur from '../../../Components/LayoutChauffeur/LayoutChauffeur'
import Modal from 'react-modal'
import TimeField from 'react-simple-timefield'
import UploadMultipleFiles from '../../../Components/UploadMultipleFiles/UploadMultipleFiles'
import { createSignalement } from '../../../api/signalements'
import { getCommande } from '../../../api/commande'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function NewSignalement(props) {
	const { id } = useParams()
	const history = useHistory()

	const [modalIsOpen, setModalIsOpen] = useState(false)
	const { register, handleSubmit, watch, setValue, control } = useForm()
	const [commande, setCommande] = useState()

	const file = useRef()
	file.current = watch('file', null)

	const type = useRef()
	type.current = watch('type', '')

	const $getCommande = async (id) => {
		try {
			const commande = await getCommande(id)
			setCommande(commande)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		$getCommande(id)
	}, [id])

	const onSubmit = async (values) => {
		values.commande = id

		try {
			await createSignalement(values)
			setModalIsOpen(true)
		} catch (error) {
			console.log(error)
		}
	}

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
				<div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<GradientText marginTop={'unset'}>
							{'ajouter signalement'.toUpperCase()}
						</GradientText>
					</div>

					<form onSubmit={handleSubmit(onSubmit)}>
						{commande &&
							commande.type_commande === 'course-a-course' && (
								<FormContentSection>
									<FormSectionTitle></FormSectionTitle>
									<FormSectionCard>
										<div
											className='radio-btn-group-palettes'
											style={{
												display: 'flex',
												flexDirection: 'row',
												marginBottom: '2rem',
											}}
										>
											<div
												className='radio'
												style={{
													marginRight: '1rem',
												}}
											>
												<input
													id='chargement'
													type='radio'
													value='chargement'
													{...register('type')}
												/>

												<label htmlFor='chargement'>
													Anomalie heure chargement
												</label>
											</div>

											<div
												className='radio'
												style={{
													marginRight: '1rem',
												}}
											>
												<input
													id='livraison'
													type='radio'
													value='livraison'
													{...register('type')}
												/>

												<label htmlFor='livraison'>
													Anomalie heure de livraison
												</label>
											</div>
										</div>

										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												textAlign: 'center',
											}}
										>
											{type.current && (
												<div>
													<p>
														<b>
															Anomalie heure{' '}
															{type.current ===
															'chargement'
																? 'chargement'
																: 'de livraison'}
														</b>
													</p>
													<p>
														Saisissez le temps du
														retard en minutes et en
														heures
													</p>
													<div
														style={{
															display: 'flex',
															alignItems:
																'center',
															justifyContent:
																'center',
														}}
													>
														<Controller
															name='duration'
															rules={{
																required: true,
															}}
															control={control}
															render={({
																field: {
																	onChange,
																	value,
																},
															}) => (
																<TimeField
																	value={
																		value
																	}
																	onChange={(
																		event,
																		value
																	) => {
																		onChange(
																			value
																		)
																	}}
																	input={
																		<input
																			type='text'
																			className='date-input'
																			onFocus={(
																				e
																			) => {
																				e.target.select()
																			}}
																		/>
																	}
																	colon=':'
																/>
															)}
														/>
													</div>
												</div>
											)}
										</div>
									</FormSectionCard>
								</FormContentSection>
							)}

						<FormContentSection>
							<FormSectionTitle></FormSectionTitle>
							<FormSectionCard>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										marginBottom: '2.5rem',
										width: '100%',
									}}
								>
									<span
										style={{
											marginBottom: '1rem',
											color: 'black',
											fontSize: 14,
										}}
									>
										Note
									</span>
									<StyledTextArea
										type='text'
										rows={4}
										placeholder=''
										{...register('note', {
											required: true,
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
										// marginLeft: 10,
										// marginTop: 10,
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
											Joindre images
										</span>
									</div>
									<UploadMultipleFiles
										name='files'
										onChange={(files) =>
											setValue(
												'files',
												files.map((f) => f.id)
											)
										}
									/>
								</div>
							</FormSectionCard>
						</FormContentSection>

						<div style={{ height: '1rem' }} />

						<SubmitButtonContainer>
							<SubmitButton type='submit'>Ajouter</SubmitButton>
						</SubmitButtonContainer>
					</form>
				</div>
			</div>

			<Modal
				isOpen={modalIsOpen}
				//onRequestClose={() => setModalIsOpen(false)}
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
						background: '#E4EAF0',
					},
				}}
				contentLabel='Modal'
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
					<span
						style={{
							color: '#51C7F2',
							fontSize: '25px',
							fontWeight: 'bold',
						}}
					>
						Enregistrement
					</span>

					<div
						style={{
							marginTop: 20,
						}}
					>
						Vos données ont été enregistrés avec succès.
					</div>

					<button
						onClick={() => {
							setModalIsOpen(false)
							history.goBack()
						}}
						style={{
							padding: '1rem 3rem',
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
		</LayoutChauffeur>
	)
}

export default NewSignalement
