import {
	FormContentSection,
	FormSectionCard,
	FormSectionTitle,
	Select,
	Seperator,
	StyledForm,
	StyledInput,
} from '../../Containers/PasserCommande/PasserCommande.styles'
import React, { useEffect, useState } from 'react'
import { getCommande, updateStatutCommande } from '../../api/commande'

import { CustomInput } from '../../Containers/RegisterTransporter/style'
import InformationCourseACourse from '../../Containers/PasserCommande/InformationsCourseACourse'
import MiseADispo from '../../Containers/PasserCommande/MiseADispo'
import PoidsLours from '../../assets/img/poid_lourd@2x.png'
import VehiculeLeger from '../../assets/img/vehicule_leger@2x.png'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setTarif } from '../../redux/tarif'

function SingleCommande({ _id }) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		control,
		getValues,
	} = useForm()

	const [commande, setCommande] = useState(null)

	const [statut, setStatut] = useState('en-cours')

	const history = useHistory()
	const dispatch = useDispatch()
	const tarifMiseADispo = useSelector((state) => state.tarif.tarifMiseADispo)
	const tarifCourseACourse = useSelector((state) => state.tarif.tarifCourseACourse)


	const onSubmit = async (data) => {}

	useEffect(() => {
		async function _getCommande(id) {
			const commande = await getCommande(id)
			console.log(commande)
			setCommande(commande)
			setStatut(commande.statut)
			reset(commande)
		}

		if (_id) {
			_getCommande(_id)
		}
	}, [_id])

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<FormContentSection>
				<FormSectionTitle>Statut du transport</FormSectionTitle>
				<div
					style={{
						//width: '16%',
						display: 'flex',
						flexDirection: 'row',
						fontSize: 13,
					}}
				>
					<div
						style={{
							//padding: '0.5rem 2rem',
							display: 'flex',
							flexDirection: 'row',
							color: '#838EAB',
							fontSize: 13,
							borderRadius: 5,
							marginBottom: 3,
							width: '100%',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<span
							onClick={() => {
								setStatut('en-cours')
							}}
							style={{
								padding: '1rem',
								background:
									statut === 'en-cours'
										? '#C752B6'
										: '#838EAB',
								color:
									statut === 'en-cours' ? 'white' : '#9EA8BF',
								borderRadius: 50,
								fontWeight: 'bold',
								fontSize: 20,
								cursor: 'pointer',
							}}
						>
							En cours
						</span>

						<span
							onClick={() => {
								history.push(
									`/chauffeur/transports/${commande._id}/signaler`
								)
							}}
							style={{
								padding: '1rem',
								background: commande?.signaler
									? '#FCC200'
									: '#838EAB',
								color: commande?.signaler ? 'white' : '#9EA8BF',
								cursor: 'pointer',
								borderRadius: 50,
								fontWeight: 'bold',
								fontSize: 20,
							}}
						>
							Signaler{' '}
							{commande?.signaler &&
								`+${commande.signalement_count}`}
						</span>

						<span
							onClick={() => {
								setStatut('terminer')
							}}
							style={{
								padding: '1rem',
								background:
									statut === 'terminer'
										? '#0FD39E'
										: '#838EAB',
								color:
									statut === 'terminer' ? 'white' : '#9EA8BF',
								borderRadius: 50,
								fontWeight: 'bold',
								fontSize: 20,
								cursor: 'pointer',
							}}
						>
							Terminer
						</span>
					</div>
				</div>

				<div
					onClick={async () => {
						await updateStatutCommande(
							commande._id,
							statut,
							commande.transporterID._id
						)
						history.goBack()
					}}
					style={{
						fontSize: 20,
						background: '#50F5A9',
						padding: '1rem 2rem',
						marginTop: '2rem',
						color: 'white',
						borderRadius: 5,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						cursor: 'pointer',
						fontWeight: 'bold',
					}}
				>
					Enregistrer
				</div>
			</FormContentSection>
			<FormContentSection>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						//alignItems: 'flex-start',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
						}}
					>
						<FormSectionTitle>Type de transport</FormSectionTitle>

						<svg
							xmlns='http://www.w3.org/2000/svg'
							style={{
								width: 20,
								height: 20,
								marginTop: 10,
								marginLeft: 10,
							}}
							fill='none'
							viewBox='0 0 24 24'
							stroke='#51C7F2'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
					</div>
				</div>
				<FormSectionCard>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							marginBottom: '1rem',
						}}
					>
						<div
							style={{
								width: '15rem',
							}}
						>
							<input
								type='radio'
								onClick={() => dispatch(setTarif(tarifCourseACourse))}
								disabled
								style={{
									marginRight: '1rem',
									transform: 'scale(1.5)',
								}}
								{...register('type_commande', {
									required: true,
								})}
								value={'course-a-course'}
							/>

							<span>Course à course</span>
						</div>

						<div
							style={{
								width: '15rem',
							}}
						>
							<input
								style={{
									marginRight: '1rem',
								}}
								disabled
								type='radio'
								onClick={() => dispatch(setTarif(tarifMiseADispo))}
								{...register('type_commande', {
									required: true,
								})}
								value={'mise-a-disposition'}
							/>

							<span>Mise à disposition</span>
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
								width: '15rem',
							}}
						>
							<input
								disabled
								style={{
									marginRight: '1rem',
								}}
								{...register('temporisation', {
									required: true,
								})}
								type='radio'
								value={'immediat'}
							/>

							<span>Immédiat</span>
						</div>

						<div
							style={{
								width: '15rem',
							}}
						>
							<input
								disabled
								style={{
									marginRight: '1rem',
								}}
								{...register('temporisation', {
									required: true,
								})}
								type='radio'
								value={'planifie'}
							/>

							<span>Planifié</span>
						</div>
					</div>
				</FormSectionCard>
			</FormContentSection>

			{watch('type_commande') === 'mise-a-disposition' ? (
				<MiseADispo
					register={register}
					watch={watch}
					setValue={setValue}
					hideUpload={true}
					initialFiles={commande.files}
					display
					control={control}
					getValues={getValues}
					//keepFilesAsObjects={preloadForm || keepFilesAsObjects}
				/>
			) : (
				<InformationCourseACourse
					display
					initialNumberOfCourses={
						commande ? commande.courses.length : 1
					}
					register={register}
					watch={watch}
					setValue={setValue}
					control={control}
					getValues={getValues}
				/>
			)}

			{/* HERE */}

			{watch('type_commande') !== 'mise-a-disposition' && (
				<FormContentSection>
					<FormSectionTitle></FormSectionTitle>
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
								Référence interne client
							</span>
							<StyledInput
								disabled
								type='text'
								placeholder=''
								{...register('ref_client', {
									required: true,
									//maxLength: 80
								})}
							/>
						</div>
					</FormSectionCard>
				</FormContentSection>
			)}

			<FormContentSection>
				<FormSectionTitle>Détails Transport</FormSectionTitle>
				<FormSectionCard>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginBottom: '2.5rem',
						}}
					>
						<span
							style={{
								marginBottom: '1rem',
								color: 'black',
								fontSize: 14,
							}}
						>
							Type de trasport
						</span>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginBottom: '1rem',
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginBottom: '1rem',
								}}
							>
								<div
									style={{
										width: '15rem',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-start',
									}}
								>
									<input
										disabled
										type='radio'
										style={{
											marginRight: '1rem',
										}}
										{...register('type_transport', {
											required: true,
										})}
										value={'Véhicule léger'}
									/>

									<span
										style={{
											marginRight: '0.5rem',
										}}
									>
										Véhicule léger
									</span>
									<img
										src={VehiculeLeger}
										style={{
											width: 40,
										}}
										alt=''
									/>
								</div>

								<div
									style={{
										width: '15rem',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-start',
									}}
								>
									<input
										disabled
										style={{
											marginRight: '1rem',
										}}
										type='radio'
										{...register('type_transport', {
											required: true,
										})}
										value={'Poids lourds'}
									/>

									<span
										style={{
											marginRight: '0.5rem',
										}}
									>
										Poids lourds
									</span>

									<img
										src={PoidsLours}
										style={{
											width: 40,
										}}
										alt=''
									/>
								</div>
							</div>

							<Seperator />

							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginBottom: '1rem',
								}}
							>
								<div
									style={{
										width: '15rem',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-start',
									}}
								>
									<input
										disabled
										type='radio'
										style={{
											marginRight: '1rem',
										}}
										{...register('type_transport_details', {
											required: true,
										})}
										value={'Break'}
									/>

									<span
										style={{
											marginRight: '0.5rem',
										}}
									>
										Break
									</span>
								</div>

								<div
									style={{
										width: '15rem',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-start',
									}}
								>
									<input
										disabled
										style={{
											marginRight: '1rem',
										}}
										type='radio'
										{...register('type_transport_details', {
											required: true,
										})}
										value={'Fourgon 12m³'}
									/>

									<span
										style={{
											marginRight: '0.5rem',
										}}
									>
										Fourgon 12m³
									</span>
								</div>

								<div
									style={{
										width: '15rem',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-start',
									}}
								>
									<input
										disabled
										style={{
											marginRight: '1rem',
										}}
										type='radio'
										{...register('type_transport_details', {
											required: true,
										})}
										value={'Fourgon 14m³'}
									/>

									<span
										style={{
											marginRight: '0.5rem',
										}}
									>
										Fourgon 14m³
									</span>
								</div>

								<div
									style={{
										width: '15rem',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-start',
									}}
								>
									<input
										disabled
										style={{
											marginRight: '1rem',
										}}
										type='radio'
										{...register('type_transport_details', {
											required: true,
										})}
										value={'Camion 20m³'}
									/>

									<span
										style={{
											marginRight: '0.5rem',
										}}
									>
										Camion 20m³
									</span>
								</div>
							</div>
						</div>
					</div>

					{commande?.type_transport !== 'Poids lourds' && (
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
								Options Véhicule léger
							</span>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginBottom: '1rem',
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										marginBottom: '1rem',
									}}
								>
									<div
										style={{
											width: '15rem',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'flex-start',
										}}
									>
										<input
											type='checkbox'
											disabled={true}
											style={{
												marginRight: '1rem',
											}}
											{...register(
												'options_vehicule_leger',
												{
													//required: true,
												}
											)}
											value={'Frigorifique'}
										/>

										<span
											style={{
												marginRight: '0.5rem',
											}}
										>
											Frigorifique
										</span>
									</div>

									<div
										style={{
											width: '15rem',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'flex-start',
										}}
									>
										<input
											type='checkbox'
											disabled={true}
											style={{
												marginRight: '1rem',
											}}
											{...register(
												'options_vehicule_leger',
												{
													//required: true,
												}
											)}
											value={'Bachée'}
										/>

										<span
											style={{
												marginRight: '0.5rem',
											}}
										>
											Bachée
										</span>
									</div>

									<div
										style={{
											width: '15rem',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'flex-start',
										}}
									>
										<input
											type='checkbox'
											disabled={true}
											style={{
												marginRight: '1rem',
											}}
											{...register(
												'options_vehicule_leger',
												{
													//required: true,
												}
											)}
											value={'Tall'}
										/>

										<span
											style={{
												marginRight: '0.5rem',
											}}
										>
											Tall
										</span>
									</div>

									<div
										style={{
											width: '15rem',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'flex-start',
										}}
									>
										<input
											type='checkbox'
											disabled={true}
											style={{
												marginRight: '1rem',
											}}
											{...register(
												'options_vehicule_leger',
												{
													//required: true,
												}
											)}
											value={'Hayon'}
										/>

										<span
											style={{
												marginRight: '0.5rem',
											}}
										>
											Hayon
										</span>
									</div>
								</div>
							</div>
						</div>
					)}

					{commande?.type_transport !== 'Véhicule léger' && (
						<>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginBottom: '1rem',
								}}
							>
								{[
									'7,5 Tonnes',
									'12 Tonnes',
									'19 Tonnes',
									'Tracteur',
								].map((item, index) => (
									<div
										key={String(index)}
										style={{
											width: '15rem',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'flex-start',
											marginBottom: '1rem',
										}}
									>
										<input
											type='checkbox'
											disabled={true}
											style={{
												marginRight: '1rem',
											}}
											{...register(
												'options_poids_lourds',
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

							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginBottom: '1rem',
								}}
							>
								{['Tracteur+semi', 'Semi'].map(
									(item, index) => (
										<div
											key={String(index)}
											style={{
												width: '15rem',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'flex-start',
												marginBottom: '1rem',
											}}
										>
											<input
												type='checkbox'
												disabled={true}
												style={{
													marginRight: '1rem',
												}}
												{...register(
													'options_poids_lourds',
													{
														//required: true,
													}
												)}
												value={item}
											/>

											<span>{item}</span>
										</div>
									)
								)}
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<span
									style={{
										marginBottom: '1rem',
										color: 'black',
										fontSize: 14,
									}}
								>
									Options poids lourds
								</span>
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
											//marginBottom: '1rem',
										}}
									>
										{[
											'Frigorifique',
											'Bachée',
											'Tall',
											'Hayon',
										].map((item, index) => (
											<div
												key={String(index)}
												style={{
													width: '15rem',
													display: 'flex',
													alignItems: 'center',
													justifyContent:
														'flex-start',
												}}
											>
												<input
													type='checkbox'
													disabled={true}
													style={{
														marginRight: '1rem',
													}}
													{...register(
														'options_poids_lourds',
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
							</div>
						</>
					)}
				</FormSectionCard>
			</FormContentSection>

			<FormContentSection>
				<FormSectionTitle>Rippeur</FormSectionTitle>
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
									<g id='user' transform='translate(0.5 0.5)'>
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
								disabled
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

			<FormContentSection>
				<FormSectionTitle>Matériels supplémentaire</FormSectionTitle>
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
								'Transpalette électrique',
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
										disabled
										type='checkbox'
										style={{
											marginRight: '1rem',
										}}
										{...register('manutention', {
											required: true,
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
										width: '33%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-start',
										marginBottom: '1rem',
									}}
								>
									<input
										disabled
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

			{/* <div
				onClick={async () => {
					await updateStatutCommande(
						commande._id,
						statut,
						commande.transporterID._id
					)
					history.goBack()
				}}
				style={{
					fontSize: 20,
					background: '#50F5A9',
					padding: '1rem 2rem',
					marginTop: '2rem',
					color: 'white',
					borderRadius: 5,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					cursor: 'pointer',
					fontWeight: 'bold',
				}}
			>
				Enregistrer
			</div> */}

			<div style={{ height: '2rem' }} />
		</StyledForm>
	)
}

export default SingleCommande
