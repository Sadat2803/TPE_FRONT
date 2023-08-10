import {
	FormContentSection,
	FormSectionCard,
	FormSectionTitle,
	Select,
	Seperator,
	StyledForm,
	StyledInput,
	StyledTextArea,
	SubmitButton,
	SubmitButtonContainer,
} from '../../Containers/PasserCommande/PasserCommande.styles'
import React, { useEffect, useRef } from 'react'
import {
	dispoHoursAtom,
	kiloJoursAtom,
	nbrJoursAtom,
	nombreEtagesAtom,
	optionsPoidsLourdsAtom,
	optionsVehiculeLegerAtom,
	rippeurHoursAtom,
	rippeursAtom,
	temporisationAtom,
	typeCommandeAtom,
	typeEtageAtom,
	typeTransportAtom,
} from '../../utils/price'
import { useForm, useWatch } from 'react-hook-form'

import { CustomInput } from '../../Containers/RegisterTransporter/style'
import InformationCourseACourse from '../../Containers/PasserCommande/InformationsCourseACourse'
import MiseADispo from '../../Containers/PasserCommande/MiseADispo'
import PoidsLours from '../../assets/img/poid_lourd@2x.png'
import VehiculeLeger from '../../assets/img/vehicule_leger@2x.png'
import moment from 'moment'
import { useAtom } from 'jotai'
import { useOptimizedComponentWillMount } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { setTarif } from '../../redux/tarif'

function CommandeForm({
	onSubmit,
	onError = () => {},
	loading = false,
	preloadForm = false,
	keepFilesAsObjects = false,
	preloadData,
	hideSubmit = false,
	disabled = false,
	submitButtonText = 'Payer',
	forceRefresh = false,
}) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		unregister,
		control,
		reset,
		getValues,
		formState: { errors, isValid, isDirty },
	} = useForm()

	const user = useSelector((state) => state.auth.user)
	const dispatch = useDispatch()
	const tarifMiseADispo = useSelector((state) => state.tarif.tarifMiseADispo)
	const tarifCourseACourse = useSelector((state) => state.tarif.tarifCourseACourse)

	

	const type_transport = useRef()
	type_transport.current = watch('type_transport', '')

	const type_commande = useRef()
	type_commande.current = watch('type_commande', '')

	const nature = useRef()
	nature.current = watch('nature', '')

	const livraison = useRef()
	livraison.current = watch('livraison', '')

	const assurance = useRef()
	assurance.current = watch('assurance', '')

	useOptimizedComponentWillMount(() => {
		if (preloadForm) {
			reset(preloadData)
			type_commande.current = preloadData.type_commande
			type_transport.current = preloadData.type_transport
			nature.current = preloadData.nature
			livraison.current = preloadData.livraison
			assurance.current = preloadData.assurance
		}
	})

	if (preloadForm && preloadData) {
		preloadData.type_commande &&
			(type_commande.current = preloadData.type_commande)
		preloadData.type_transport &&
			(type_transport.current = preloadData.type_transport)
		preloadData.nature && (nature.current = preloadData.nature)
		preloadData.livraison && (livraison.current = preloadData.livraison)
		preloadData.assurance && (assurance.current = preloadData.assurance)
	}

	const [typeCommande, setTypeCommande] = useAtom(typeCommandeAtom)
	const [typeTransport, setTypeTransport] = useAtom(typeTransportAtom)
	const [temporisation, setTemporisation] = useAtom(temporisationAtom)
	const [typeEtage, setTypeEtage] = useAtom(typeEtageAtom)
	const [nombreEtages, setNombreEtages] = useAtom(nombreEtagesAtom)
	const [rippeurHours, setRippeurHours] = useAtom(rippeurHoursAtom)
	const [rippeurs, setRippeurs] = useAtom(rippeursAtom)
	const [optionsPoidsLourds, setOptionsPoidsLourds] = useAtom(
		optionsPoidsLourdsAtom
	)
	const [optionsVehiculeLeger, setOptionsVehiculeLeger] = useAtom(
		optionsVehiculeLegerAtom
	)

	const [dispoHours, setDispoHours] = useAtom(dispoHoursAtom)

	const [nbrJours, seNbrJours] = useAtom(nbrJoursAtom)
	const [kiloJours, setKiloJours] = useAtom(kiloJoursAtom)

	const kiloJoursValue = useWatch({
		name: 'kilo_jour',
		defaultValue: null,
		control,
	})

	useEffect(() => {
		console.log('change kiloJoursValue')
		setKiloJours(Number(kiloJoursValue))
	}, [kiloJoursValue])

	const debutValue = useWatch({
		name: 'debut',
		defaultValue: null,
		control,
	})

	const finValue = useWatch({
		name: 'fin',
		defaultValue: null,
		control,
	})

	useEffect(() => {
		if (debutValue && finValue) {
			const nbrJours = moment(finValue).diff(moment(debutValue), 'days')
			seNbrJours(Number(nbrJours))
		}
	}, [debutValue, finValue])

	const dispoHoursValue = useWatch({
		name: 'heure_jour',
		defaultValue: null,
		control,
	})

	useEffect(() => {
		if (dispoHoursValue) {
			setDispoHours(dispoHoursValue)
		}
	}, [dispoHoursValue])

	const typeCommandeValue = useWatch({
		name: 'type_commande',
		defaultValue: null,
		control,
	})

	const type_transport_details = useWatch({
		name: 'type_transport_details',
		defaultValue: null,
		control,
	})

	const options_poids_lourds = useWatch({
		name: 'vehicule_poids_lourds',
		defaultValue: null,
		control,
	})

	const temporisationValue = useWatch({
		name: 'temporisation',
		defaultValue: null,
		control,
	})

	const typeEtageValue = useWatch({
		name: 'type_etage',
		defaultValue: null,
		control,
	})

	const nombreEtagesValue = useWatch({
		name: 'etage',
		defaultValue: null,
		control,
	})

	const rippeurHoursValue = useWatch({
		name: 'heure_jour',
		defaultValue: null,
		control,
	})

	const rippeursValue = useWatch({
		name: 'rippeurs',
		defaultValue: null,
		control,
	})

	const optionsPoidsLourdsValue = useWatch({
		name: 'options_poids_lourds',
		defaultValue: null,
		control,
	})

	const optionsVehiculeLegerValue = useWatch({
		name: 'options_vehicule_leger',
		defaultValue: null,
		control,
	})

	useEffect(() => {
		if (typeCommandeValue) {
			setTypeCommande(typeCommandeValue)
		}
	}, [typeCommandeValue])

	useEffect(() => {
		if (type_transport_details) {
			setTypeTransport(type_transport_details)
		}
	}, [type_transport_details])

	useEffect(() => {
		if (options_poids_lourds && options_poids_lourds.length > 0) {
			setTypeTransport(options_poids_lourds)
		}
	}, [options_poids_lourds])

	useEffect(() => {
		if (temporisationValue) setTemporisation(temporisationValue)
	}, [temporisationValue])

	useEffect(() => {
		if (typeEtageValue) {
			setTypeEtage(typeEtageValue)
		}
	}, [typeEtageValue])

	useEffect(() => {
		if (nombreEtagesValue !== undefined) {
			setNombreEtages(nombreEtagesValue)
		}
	}, [nombreEtagesValue])

	useEffect(() => {
		if (rippeurHoursValue !== undefined) {
			setRippeurHours(rippeurHoursValue)
		}
	}, [rippeurHoursValue])

	useEffect(() => {
		if (rippeursValue !== undefined) {
			setRippeurs(rippeursValue)
		}
	}, [rippeursValue])

	useEffect(() => {
		if (optionsPoidsLourdsValue) {
			setOptionsPoidsLourds(optionsPoidsLourdsValue)
		}
	}, [optionsPoidsLourdsValue])

	useEffect(() => {
		if (optionsVehiculeLegerValue) {
			setOptionsVehiculeLeger(optionsVehiculeLegerValue)
		}
	}, [optionsVehiculeLegerValue])

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
			<FormContentSection>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
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

					{!!preloadData?.prix && (
						<div
							style={{
								padding: '0rem 1em',
								background: '#838EAB',
								color: 'white',
								fontFamily: 'Montserrat',
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								// top: 250,
								// right: 50,
								borderRadius: '0.5rem',
								fontSize: 15,
							}}
						>
							<span>Prix: </span>
							<span style={{ width: 20 }} />
							<span style={{ fontWeight: 'bold' }}>
								{user.role === 'client' ? preloadData.prix : (preloadData.prix - (preloadData.prix * (preloadData.margin ?? 0)) / 100).toFixed(2)}€ ht
							</span>
						</div>
					)}
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
								disabled={disabled}
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
								disabled={disabled}
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
								style={{
									marginRight: '1rem',
								}}
								disabled={disabled}
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
								style={{
									marginRight: '1rem',
								}}
								disabled={disabled}
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
					control={control}
					getValues={getValues}
					display={disabled}
					keepFilesAsObjects={preloadForm || keepFilesAsObjects}
				/>
			) : (
				<InformationCourseACourse
					unregister={unregister}
					register={register}
					watch={watch}
					setValue={setValue}
					control={control}
					getValues={getValues}
					display={disabled}
					initialNumberOfCourses={preloadData?.courses.length}
					keepFilesAsObjects={preloadForm || keepFilesAsObjects}
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
								type='text'
								disabled={disabled}
								placeholder=''
								{...register('ref_client')}
							/>
						</div>
					</FormSectionCard>
				</FormContentSection>
			)}

			<FormContentSection>
				<FormSectionTitle>Nature du chargement</FormSectionTitle>
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
								id='palettes'
								type='radio'
								disabled={disabled}
								value='palettes'
								{...register('nature', {
									required: true,
								})}
							/>

							<label htmlFor='palettes'>Palettes</label>
						</div>

						<div
							className='radio'
							style={{
								marginRight: '1rem',
							}}
						>
							<input
								id='autres'
								type='radio'
								disabled={disabled}
								value='autres'
								{...register('nature', {
									required: true,
								})}
							/>

							<label htmlFor='autres'>Autres</label>
						</div>
					</div>

					<div>
						{nature.current === 'palettes' && (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									//marginBottom: '2.5rem',
									width: '100%',
								}}
							>
								{type_commande.current ===
								'mise-a-disposition' ? (
									<>
										<span
											style={{
												marginBottom: '1rem',
												color: 'black',
												fontSize: 14,
											}}
										>
											En quelque mots décrire la nature des
											produits sur palettes
										</span>
										<StyledTextArea
											disabled={disabled}
											type='text'
											rows={4}
											placeholder=''
											{...register('palette_desc')}
										/>
									</>
								) : (
									<>
										<span
											style={{
												marginBottom: '1rem',
												color: 'black',
												fontSize: 14,
											}}
										>
											Nombre de palettes
										</span>
										<CustomInput
											width={'100%'}
											type='number'
											disabled={disabled}
											min={0}
											{...register('nbr_palettes')}
										/>
									</>
								)}
							</div>
						)}

						{nature.current === 'autres' && (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									//marginBottom: '2.5rem',
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
									Décrire la nature
								</span>
								<StyledTextArea
									disabled={disabled}
									type='text'
									rows={4}
									placeholder=''
									{...register('nature_desc')}
								/>
							</div>
						)}
					</div>
				</FormSectionCard>
			</FormContentSection>

			<FormContentSection>
				<FormSectionTitle>Lieu de livraison</FormSectionTitle>
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
								id='livraison-1'
								type='radio'
								disabled={disabled}
								value='Entrepot/Magasin/Chantier'
								{...register('livraison', {
									required: true,
								})}
							/>

							<label htmlFor='livraison-1'>
								Entrepot/Magasin/Chantier
							</label>
						</div>

						<div
							className='radio'
							style={{
								marginRight: '1rem',
							}}
						>
							<input
								id='livraison-2'
								type='radio'
								disabled={disabled}
								value='Domicile/Batiment/Maison'
								{...register('livraison', {
									required: true,
								})}
							/>

							<label htmlFor='livraison-2'>
								Domicile/Batiment/Maison
							</label>
						</div>
					</div>

					<div>
						{livraison.current === 'Domicile/Batiment/Maison' && (
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'center',
										width: '30%',
										marginRight: '1rem',
									}}
								>
									<span
										style={{
											marginRight: '1rem',
											color: 'black',
											fontSize: 14,
										}}
									>
										Etage
									</span>
									<CustomInput
										width={'100%'}
										type='number'
										disabled={disabled}
										min={0}
										{...register('etage')}
									/>
								</div>

								<div
									style={{
										//width: '25%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-start',
									}}
								>
									<input
										type='radio'
										style={{ marginRight: '1rem' }}
										disabled={disabled}
										{...register('type_etage')}
										value={'Escalier'}
									/>

									<span
										style={{
											marginRight: '0.5rem',
										}}
									>
										Escalier
									</span>
								</div>

								<div
									style={{
										//width: '25%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-start',
									}}
								>
									<input
										type='radio'
										style={{ marginRight: '1rem' }}
										disabled={disabled}
										{...register('type_etage')}
										value='Assenceur'
									/>

									<span
										style={{
											marginRight: '0.5rem',
										}}
									>
										Assenceur
									</span>
								</div>
							</div>
						)}
					</div>
				</FormSectionCard>
			</FormContentSection>

			<FormContentSection>
				<FormSectionTitle></FormSectionTitle>
				<FormSectionCard>
					<p
						style={{
							color: 'black',
							//fontWeight: 'bold',
						}}
					>
						Y a t-il de la manutention chauffeur ?
					</p>

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
								id='manutention_chauffeur-oui'
								type='radio'
								disabled={disabled}
								value='Oui'
								{...register('manutention_chauffeur', {
									required: true,
								})}
							/>

							<label htmlFor='manutention_chauffeur-oui'>
								Oui
							</label>
						</div>

						<div
							className='radio'
							style={{
								marginRight: '1rem',
							}}
						>
							<input
								id='manutention_chauffeur-non'
								type='radio'
								disabled={disabled}
								value='Non'
								{...register('manutention_chauffeur', {
									required: true,
								})}
							/>

							<label htmlFor='manutention_chauffeur-non'>
								Non
							</label>
						</div>
					</div>
				</FormSectionCard>
			</FormContentSection>

			{ ['chauffeur','transporter'].indexOf(user.role) === -1 &&
			 <FormContentSection>
				<FormSectionTitle>Assurance</FormSectionTitle>
				<FormSectionCard>
					<p
						style={{
							color: 'red',
							fontWeight: 'bold',
						}}
					>
						La plateforme prend en charge jusqu'a 100 000 euros de
						valeur marchandise.
					</p>

					<p
						style={{
							color: 'black',
							fontWeight: 'bold',
						}}
					>
						La valeur de votre chargement dépasse t'elle 100 000
						euros?
					</p>

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
								id='assurance-oui'
								type='radio'
								disabled={disabled}
								value='Oui'
								{...register('assurance', {
									required: true,
								})}
							/>

							<label htmlFor='assurance-oui'>Oui</label>
						</div>

						<div
							className='radio'
							style={{
								marginRight: '1rem',
							}}
						>
							<input
								id='assurance-non'
								type='radio'
								disabled={disabled}
								value='Non'
								{...register('assurance', {
									required: true,
								})}
							/>

							<label htmlFor='assurance-non'>Non</label>
						</div>
					</div>

					<div>
						{assurance.current === 'Oui' && (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										//width: '30%',
										marginRight: '1rem',
									}}
								>
									<span
										style={{
											color: 'black',
											fontWeight: 'bold',
											marginBottom: '1rem',
										}}
									>
										Ci-dessous saisir la valeur du
										chargement afin que nous puissions
										avertir les assureurs
									</span>

									<div
										style={{
											position: 'relative',
											width: '100%',
										}}
									>
										<CustomInput
											width={'100%'}
											type='text'
											disabled={disabled}
											{...register('assurance_amount', {
												validate: (value) =>
													!isNaN(
														Number(
															value.replace(
																' ',
																''
															)
														)
													),
											})}
										/>
										<span
											style={{
												position: 'absolute',
												right: '3rem',
												top: '1rem',
												color: 'red',
											}}
										>
											€
										</span>
									</div>
								</div>

								<p
									style={{
										color: 'black',
										fontWeight: 'bold',
									}}
								>
									Vous avez la possiblité de ne pas saisir la
									valur du chargment, cependant nous
									retiendrons la valeur de 100 000 euros. Cela
									conformément au conditions d'utilisation de
									notre plateforme.
								</p>
							</div>
						)}
					</div>
				</FormSectionCard>
			</FormContentSection>}

			<FormContentSection>
				<FormSectionTitle>Détails Transport</FormSectionTitle>
				<p>
					<b>
						La plateforme prend en charge pour les poids lourds 30
						minutes au chargement et 30 minutes au déchargement, au
						delà 0,41€ la minutes. 10 min pour les Véhicules légers.
					</b>
				</p>
				<FormSectionCard>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							//marginBottom: '1rem',
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
								//marginBottom: '1rem',
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
										type='radio'
										disabled={disabled}
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
										style={{
											marginRight: '1rem',
										}}
										disabled={disabled}
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
						</div>
					</div>

					{type_transport.current && (
						<>
							<Seperator />

							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									//marginBottom: '1rem',
								}}
							>
								{type_transport.current !== 'Poids lourds' && (
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											marginBottom: '1rem',
											width: '100%',
										}}
									>
										{[
											'Break',
											'Fourgon 12m³',
											'Fourgon 14m³',
											'Camion 20m³',
										].map((item) => (
											<div
												key={item}
												style={{
													width: '25%',
													display: 'flex',
													alignItems: 'center',
													justifyContent:
														'flex-start',
												}}
											>
												<input
													type='radio'
													style={{
														marginRight: '1rem',
													}}
													disabled={disabled}
													{...register(
														'type_transport_details'
													)}
													value={item}
												/>

												<span
													style={{
														marginRight: '0.5rem',
													}}
												>
													{item}
												</span>
											</div>
										))}
									</div>
								)}
							</div>

							{type_transport.current !== 'Poids lourds' && (
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
													justifyContent:
														'flex-start',
												}}
											>
												<input
													type='checkbox'
													style={{
														marginRight: '1rem',
													}}
													disabled={disabled}
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
													justifyContent:
														'flex-start',
												}}
											>
												<input
													type='checkbox'
													style={{
														marginRight: '1rem',
													}}
													disabled={disabled}
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
													justifyContent:
														'flex-start',
												}}
											>
												<input
													type='checkbox'
													style={{
														marginRight: '1rem',
													}}
													disabled={disabled}
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
													justifyContent:
														'flex-start',
												}}
											>
												<input
													type='checkbox'
													style={{
														marginRight: '1rem',
													}}
													disabled={disabled}
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

										{type_transport.current == null && (
											<Seperator />
										)}
									</div>
								</div>
							)}

							{type_transport.current !== 'Véhicule léger' && (
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
													justifyContent:
														'flex-start',
													marginBottom: '1rem',
												}}
											>
												<input
													type='radio'
													style={{
														marginRight: '1rem',
													}}
													disabled={disabled}
													{...register(
														'vehicule_poids_lourds'
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
														justifyContent:
															'flex-start',
														marginBottom: '1rem',
													}}
												>
													<input
														type='radio'
														style={{
															marginRight: '1rem',
														}}
														disabled={disabled}
														{...register(
															'vehicule_poids_lourds'
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
															alignItems:
																'center',
															justifyContent:
																'flex-start',
														}}
													>
														<input
															type='checkbox'
															style={{
																marginRight:
																	'1rem',
															}}
															disabled={disabled}
															{...register(
																'options_poids_lourds'
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
						</>
					)}
				</FormSectionCard>
			</FormContentSection>

			<FormContentSection>
				<FormSectionTitle></FormSectionTitle>
				<FormSectionCard>
					<p
						style={{
							color: 'black',
							//fontWeight: 'bold',
						}}
					>
						Y a-t-il un transport de matières dangereuses ?
					</p>

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
								id='danger-oui'
								type='radio'
								disabled={disabled}
								value='Oui'
								{...register('danger', {
									required: true,
								})}
							/>

							<label htmlFor='danger-oui'>Oui</label>
						</div>

						<div
							className='radio'
							style={{
								marginRight: '1rem',
							}}
						>
							<input
								id='danger-non'
								type='radio'
								disabled={disabled}
								value='Non'
								{...register('danger', {
									required: true,
								})}
							/>

							<label htmlFor='danger-non'>Non</label>
						</div>
					</div>
				</FormSectionCard>
			</FormContentSection>

			<FormContentSection>
				<FormSectionTitle>Rippeur</FormSectionTitle>
				<FormSectionCard>
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
								Nombre de ripper en plus du chauffeur
							</span>
							<span
								style={{
									marginBottom: '1rem',
									color: 'black',
									fontSize: 14,
								}}
							>
								( Facultatif )
							</span>
						</div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								marginBottom: '1rem',
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
								width={'100%'}
								type='number'
								disabled={disabled}
								min={0}
								{...register('rippeurs')}
							/>
						</div>

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
								Nombre d'heure
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
							<Select
								disabled={disabled}
								{...register('heure_jour')}
							>
								{Array.from(
									{ length: 12 },
									(v, i) => i + 1
								).map((i) => (
									<option key={String(i)} value={String(i)}>
										{i}h
									</option>
								))}
							</Select>
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
									'Transpalette électrique',
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
										type='checkbox'
										style={{
											marginRight: '1rem',
										}}
										disabled={disabled}
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
										disabled={disabled}
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

			{!hideSubmit && (
				<>
					<div
						style={{
							width: '100%',
							margin: '2rem 0',
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								//marginBottom: '1rem',
							}}
						>
							<input
								type='checkbox'
								style={{
									marginRight: '1rem',
								}}
								{...register('accept', {
									required: true,
								})}
								value={'accept'}
							/>

							<span>
								J'accepte les conditions de « La plateforme du
								transport » Lire les conditions générales
							</span>
						</div>
					</div>

					{user?.premium && (
						<div
							style={{
								width: '100%',
								textAlign: 'center',
								marginTop: '1rem',
							}}
						>
							<span
								style={{
									fontSize: 13,
								}}
							>
								Vous etes client{' '}
								<span
									style={{
										color: '#f1e5b0',
										fontWeight: 'bold',
									}}
								>
									Prémium
								</span>{' '}
								vous pouvez commandez vos transports et régler
								le total des transports mensuellement
							</span>
						</div>
					)}
					{!!user?.reduction && (
						<div style={{
							width: '100%',
							textAlign: 'center',
							marginTop: '1rem',
						}}>
							<span
								style={{
									width: '6rem',
									fontSize: 13,
									marginTop: '1rem',
								}}
							>
								En tant que client spécial nous vous appliquons une
								remise de {user.reduction}%.
							</span>
						</div>
					)}
					<SubmitButtonContainer>
						<SubmitButton type='submit' disabled={loading}>
							{loading ? 'Chargement' : submitButtonText}
						</SubmitButton>
					</SubmitButtonContainer>
				</>
			)}
		</StyledForm>
	)
}

export default React.memo(CommandeForm)
