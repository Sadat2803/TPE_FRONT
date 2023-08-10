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
import { getSignalement, updateSignalement } from '../../../api/signalements'
import { useHistory, useParams } from 'react-router-dom'

import LayoutChauffeur from '../../../Components/LayoutChauffeur/LayoutChauffeur'
import TimeField from 'react-simple-timefield'
import UploadMultipleFiles from '../../../Components/UploadMultipleFiles/UploadMultipleFiles'

function EditSignalement(props) {
	const history = useHistory()
	const { commande_id, signalement_id } = useParams()
	const [signalement, setSignalement] = useState(null)
	const { register, handleSubmit, setValue, reset, control, watch } =
		useForm()

	const type = useRef()
	type.current = watch('type', '')

	useEffect(() => {
		async function _getSignalement(_id) {
			try {
				const data = await getSignalement(_id)
				setSignalement(data)

				reset({
					note: data.note,
					type: data.type,
					duration: data.duration,
				})
			} catch (error) {
				// TODO show some type of error alert
				console.log(error)
			}
		}

		signalement_id && _getSignalement(signalement_id)
	}, [commande_id, signalement_id])

	const onSubmit = async (values) => {
		let data = { ...values }

		if (data.files) {
			data.files = data.files.map((file) => file.id ?? file._id)
		}

		try {
			await updateSignalement(signalement_id, data)
			history.goBack()
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
						<div
							onClick={() => {
								history.goBack()
							}}
							style={{
								background: '#51C7F2',
								width: '3rem',
								height: '3rem',
								borderRadius: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								cursor: 'pointer',
							}}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width={14.017}
								height={14.11}
								viewBox='0 0 14.017 14.11'
								{...props}
							>
								<g
									data-name='Group 11287'
									fill='none'
									stroke='#fff'
									strokeWidth={2}
								>
									<path
										data-name='Path 11687'
										d='M16.6 11.818l-6.348 6.349 2.115 2.115 4.232 4.232'
										transform='translate(-8.838 -11.113)'
									/>
									<path
										data-name='Path 11688'
										d='M22.147 11.818l-6.348 6.349 6.348 6.348'
										transform='translate(-8.838 -11.113)'
									/>
								</g>
							</svg>
						</div>

						<div
							style={{
								width: '1rem',
							}}
						/>

						<GradientText marginTop={'unset'}>
							{'modifier signalement'.toUpperCase()}
						</GradientText>
					</div>

					<form onSubmit={handleSubmit(onSubmit)}>
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
												Saisissez le temps du retard en
												minutes et en heures
											</p>
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
												}}
											>
												<Controller
													name='duration'
													rules={{ required: true }}
													control={control}
													render={({
														field: {
															onChange,
															value,
														},
													}) => (
														<TimeField
															value={value}
															onChange={(
																event,
																value
															) => {
																onChange(value)
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
										placeholder='Les palettes n’ont pas supportés le chargement'
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
									{signalement && (
										<UploadMultipleFiles
											name='files'
											initialFiles={signalement.files}
											onChange={(files) => {
												setValue('files', files)
											}}
										/>
									)}
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
		</LayoutChauffeur>
	)
}

export default EditSignalement
