import {
	FormContentSection,
	FormSectionCard,
	FormSectionTitle,
	Select,
	Seperator,
} from '../../Containers/PasserCommande/PasserCommande.styles'
import React, { useEffect } from 'react'
import { useRef, useState } from 'react'

import { CustomInput } from '../../Containers/RegisterTransporter/style'
import Modal from 'react-modal'
import PoidsLours from '../../assets/img/poid_lourd@2x.png'
import VehiculeLeger from '../../assets/img/vehicule_leger@2x.png'
import { useForm } from 'react-hook-form'

Modal.setAppElement('#root')

function AddVehicleRegister({
	onChange,
	initialVehicles = [],
	disableAdd = false,
}) {
	const [vehicles, setVehicles] = useState([])
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const { register, handleSubmit, watch, setValue, reset } = useForm()

	useEffect(() => {
		setVehicles(initialVehicles)
	}, [initialVehicles.length])

	const type = useRef()
	type.current = watch('type', '')

	const vehicule_leger = useRef()
	vehicule_leger.current = watch('vehicule_leger', '')

	const onSubmit = async (data) => {
		console.log(data)

		if (!data.count) return

		setVehicles([...vehicles, data])
		onChange([...vehicles, data])
		setModalIsOpen(false)
		reset()
	}

	const getOptionsVehiuleLeger = () => {
		if (
			['Break', 'Fourgon 12m³', 'Fourgon 14m³'].includes(
				vehicule_leger.current
			)
		) {
			return ['Tall', 'Hayon']
		}

		return ['Frigorifique', 'Bachée', 'Tall', 'Hayon']
	}

	return (
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
						flexDirection: 'column',
					}}
				>
					<FormSectionTitle>Véhicules</FormSectionTitle>
					<span>
						Veuillez indiquer le type et la quantité de véhicules
						que vous exploiter
					</span>
				</div>
				{!disableAdd && (
					<button
						type='button'
						onClick={(e) => {
							setModalIsOpen(true)
							e.stopPropagation()
						}}
						style={{
							background: '#50F5A9',
							border: 'none',
							cursor: 'pointer',
							color: 'white',
							fontFamily: 'Montserrat',
							padding: '0 2rem',
							borderRadius: 6,
						}}
					>
						Ajouter véhicule
					</button>
				)}
			</div>
			<FormSectionCard>
				<table
					cellPadding={0}
					cellSpacing={0}
					style={{
						width: '100%',
						textAlign: 'left',
						borderRadius: 20,
						overflow: 'hidden',
						border: 'none',
					}}
				>
					<thead>
						<tr
							style={{
								paddingBottom: 10,
							}}
						>
							<th
								style={{
									fontWeight: 'normal',
									color: '#262626',
									padding: '1rem',
								}}
							>
								Détails
							</th>
							<th
								style={{
									fontWeight: 'normal',
									color: '#262626',
									padding: '1rem',
								}}
							>
								Options
							</th>
							<th
								style={{
									fontWeight: 'normal',
									color: '#262626',
									padding: '1rem',
								}}
							>
								Nombre
							</th>
						</tr>
					</thead>

					<tbody>
						{vehicles.map((v, index) => (
							<tr
								key={String(index)}
								style={{
									background: 'white',
								}}
							>
								<td
									style={{
										padding: '1rem',
									}}
								>
									{v?.type == 'Poids lourds' &&
										Array.isArray(v?.vehicule_poids_lourds) ?  v?.vehicule_poids_lourds?.join(', ') : v?.vehicule_poids_lourds}
									{v?.type == 'Véhicule léger' &&
										v?.vehicule_leger}
								</td>
								<td
									style={{
										padding: '1rem',
									}}
								>
									{v?.type == 'Poids lourds' &&
										Array.isArray(v?.options_poids_lourds) ? v?.options_poids_lourds?.join(', ') : v?.options_poids_lourds}
									{v?.type == 'Véhicule léger' &&
										Array.isArray(v?.options_vehicule_leger) ? v?.options_vehicule_leger?.join(', ') : v?.options_vehicule_leger}
								</td>
								<td
									style={{
										padding: '1rem',
									}}
								>
									{v.count}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</FormSectionCard>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => {
					setModalIsOpen(false)
					reset()
				}}
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
						paddin: '4rem',
					},
				}}
				contentLabel='Example Modal'
			>
				<div
					style={{
						width: '100%',
						fontFamily: 'Montserrat',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 15,
						textAlign: 'left',
						color: '#838EAB',
					}}
				>
					<div
						style={{
							color: '#51C7F2',
							fontSize: 30,
							marginBottom: '1rem',
						}}
					>
						Ajouter un véhicule
					</div>

					<form onSubmit={handleSubmit(onSubmit)}>
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
								Type de véhicules
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
										//marginBottom: '1rem',
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
											style={{
												marginRight: '1rem',
											}}
											{...register('type', {
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
											type='radio'
											{...register('type', {
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
										/>
									</div>
								</div>
							</div>
						</div>

						{type.current && (
							<>
								<div
									style={{
										width: '100%',
										height: 1,
										background: 'red',
										borderTop: '1px solid #707070',
										opacity: '0.3',
										marginBottom: '1rem',
									}}
								/>

								{type.current !== 'Poids lourds' && (
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											marginBottom: '1rem',
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
													width: '15rem',
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
													{...register(
														'vehicule_leger'
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

								{type.current !== 'Poids lourds' && (
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
												{getOptionsVehiuleLeger().map(
													(item, index) => (
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
																{...register(
																	'options_vehicule_leger'
																)}
																value={item}
															/>

															<span
																style={{
																	marginRight:
																		'0.5rem',
																}}
															>
																{item}
															</span>
														</div>
													)
												)}
											</div>
											{type.current == null && (
												<Seperator />
											)}
										</div>
									</div>
								)}

								{type.current !== 'Véhicule léger' && (
									<div
										style={{
											width: '100%',
											//background: 'red',
										}}
									>
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
														type='checkbox'
														style={{
															marginRight: '1rem',
														}}
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
															alignItems:
																'center',
															justifyContent:
																'flex-start',
															marginBottom:
																'1rem',
														}}
													>
														<input
															type='checkbox'
															style={{
																marginRight:
																	'1rem',
															}}
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
									</div>
								)}

								{type.current !== 'Véhicule léger' && (
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
								)}
							</>
						)}

						<div
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								marginTop: '2rem',
							}}
						>
							<span
								style={{
									marginBottom: '1rem',
									color: 'black',
									fontSize: 14,
								}}
							>
								Nombre de véhicules tels que celui-ci
							</span>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									width: '100%',
								}}
							>
								<CustomInput
									width={'50%'}
									type='number'
									placeholder='1'
									min={0}
									{...register('count')}
								/>
							</div>
						</div>

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: '1rem',
							}}
						>
							<button
								type='button'
								onClick={handleSubmit((data) => {
									console.log(data)

									if (!data.count) return

									setVehicles([...vehicles, data])
									onChange([...vehicles, data])
									setModalIsOpen(false)
									reset()
								})}
								style={{
									background: '#50F5A9',
									border: 'none',
									cursor: 'pointer',
									color: 'white',
									fontFamily: 'Montserrat',
									padding: '1rem 2rem',
									borderRadius: 6,
								}}
							>
								Ajouter
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</FormContentSection>
	)
}

export default AddVehicleRegister
