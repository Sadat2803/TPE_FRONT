import React, { useEffect, useState } from 'react'
import {
	acceptCommande,
	attributionCommandes,
	getCommandesByTransporter,
	getCommandesForTransporter,
	updateRecuCommande,
} from '../../api/commande'
import { getChauffeurs, getChauffeursByTransporter } from '../../api/chauffeurs'
import {
	searchCommandesByClientAndTransporter,
	searchCommandesByDate,
	searchCommandesByPrixMinMax,
} from '../../api/search'
import {
	searchCommandesByDateForTransporter,
	searchCommandesByPrixMinMaxForTransporter,
} from '../../api/transporteurs'

import CourseACourseHorizontal from '../../Components/SingleCommandeHorizontal/CourseACourseHorizontal'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { GradientText } from '../PasserCommande/PasserCommande.styles'
import LayoutTransporter from '../../Components/LayoutTransporter/LayoutTransporter'
import MiseADispoHorizontal from '../../Components/SingleCommandeHorizontal/MiseADispoHorizontal'
import Modal from 'react-modal'
import Select from 'react-select'
import moment from 'moment'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

const SIZE = 4

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function MesTransports(props) {
	const history = useHistory()
	const [commandes, setCommandes] = useState([])
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const [chauffeurs, setChauffeurs] = useState([])
	const [page, setPage] = useState(1)
	const [total, setTotal] = useState(1)

	const [selectedCommandes, setSelectedCommandes] = useState([])
	const [selectedChauffeur, setSelectedChauffeur] = useState()

	const transporter = useSelector((state) => state.auth.user)

	const [searchCriteria, setSearchCriteria] = useState('prix')
	const [range, setRange] = useState([new Date(), new Date()])
	const [min, setMin] = useState(0)
	const [max, setMax] = useState(300)

	useEffect(() => {
		async function fetchChauffeurs() {
			const res = await getChauffeursByTransporter(user._id, page, SIZE)
			setChauffeurs(res.docs)
			setTotal(res.totalPages)
		}

		fetchChauffeurs()
	}, [page])

	const user = useSelector((state) => state.auth.user)

	async function fetchCommandes() {
		const res = await getCommandesForTransporter(user._id)
		setCommandes(res.docs)
	}

	useEffect(() => {
		fetchCommandes()
	}, [])

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
				<GradientText>MES TRANSPORTS</GradientText>
				<span
					style={{
						fontFamily: 'Montserrat',
						color: '#262626',
						marginTop: '0.5rem',
						textAlign: 'center',
					}}
				>
					Ici retrouver tous les transports qui vous ont été affecté
					par la plate-forme,
					<br /> aussi vous trouverez les transports que vous avez
					accepté sur la plate-forme
				</span>

				<div
					style={{
						width: '100%',
						fontFamily: 'Montserrat',
						minHeight: '60vh',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						marginTop: '1rem',
						paddingLeft: '.5rem',
						paddingRight: '.5rem',
					}}
				>
					<div
						style={{
							width: '100%',
							fontFamily: 'Montserrat',
							paddingLeft: '1rem',
							paddingRight: '1rem',
							marginBottom: '2rem',
							marginTop: '1rem',
							display: 'flex',
							flexDirection: 'row',
						}}
					>
						<div
							style={{
								width: '350px',
								fontFamily: 'Montserrat',
								marginRight: '1rem',
							}}
						>
							<Select
								isSearchable={false}
								options={[
									{ value: 'prix', label: 'Prix' },
									{ value: 'date', label: 'Date' },
								]}
								styles={{
									option: (provided, state) => ({
										...provided,
										fontFamily: 'Montserrat',
									}),
									control: (provided, state) => ({
										...provided,
										height: '3rem',
										minHeight: 'fit-content',
									}),
									valueContainer: (base) => ({
										...base,
										maxHeight: '3rem',
									}),
								}}
								defaultValue={{
									value: 'prix',
									label: 'Prix',
								}}
								onChange={(x) => setSearchCriteria(x.value)}
								menuPortalTarget={document.querySelector(
									'body'
								)}
							/>
						</div>

						{searchCriteria === 'prix' ? (
							<>
								<input
									type='number'
									style={{
										padding: '0.4rem',
										borderRadius: 5,
										border: '1px solid #E4EAF0',
										height: '3rem',
										width: '20rem',
										fontFamily: 'Montserrat',
										marginRight: '1rem',
									}}
									value={min}
									onChange={(e) => {
										setMin(Number(e.target.value))
									}}
									placeholder='Prix min'
								/>
								<input
									type='number'
									style={{
										padding: '0.4rem',
										borderRadius: 5,
										border: '1px solid #E4EAF0',
										height: '3rem',
										width: '20rem',
										fontFamily: 'Montserrat',
									}}
									value={max}
									onChange={(e) => {
										setMax(Number(e.target.value))
									}}
									placeholder='Prix max'
								/>
							</>
						) : null}

						{searchCriteria === 'date' ? (
							<DateRangePicker
								onChange={setRange}
								value={range}
							/>
						) : null}

						<button
							onClick={async () => {
								let res

								if (searchCriteria === 'prix') {
									res =
										await searchCommandesByPrixMinMaxForTransporter(
											min,
											max,
											transporter._id
										)
								}

								if (searchCriteria === 'date') {
									let minDate = moment(range[0]).unix()
									let maxDate = moment(range[1]).unix()

									res =
										await searchCommandesByDateForTransporter(
											minDate,
											maxDate,
											transporter._id
										)
								}

								setCommandes(res?.hits)
							}}
							style={{
								padding: '0.6rem 1rem',
								height: '3rem',
								background: '#C9D5F7',
								border: 'none',
								cursor: 'pointer',
								color: '#1C63C5',
								borderRadius: 7,
								//marginTop: 20,
								marginLeft: '1rem',
								fontFamily: 'Montserrat',
								fontWeight: 'bold',
							}}
						>
							Rechercher
						</button>

						<button
							onClick={async () => {
								await fetchCommandes(0)
							}}
							style={{
								padding: '0.6rem 1rem',
								height: '3rem',
								background: '#C9D5F7',
								border: 'none',
								cursor: 'pointer',
								color: '#1C63C5',
								borderRadius: 7,
								marginRight: '1rem',
								marginLeft: '1rem',
								fontFamily: 'Montserrat',
								fontWeight: 'bold',
							}}
						>
							Effacer
						</button>

						<button
							onClick={async () => {
								if (selectedCommandes.length === 0) {
									toast.error(
										'Il faut séléctionner des commandes',
										{
											style: {
												fontFamily: 'Montserrat',
											},
											id: 'MesTransports',
										}
									)

									return
								}

								setModalIsOpen(true)
							}}
							style={{
								padding: '1rem 1rem',
								background: '#50F5A9',
								border: 'none',
								cursor: 'pointer',
								color: 'white',
								borderRadius: 7,
								fontFamily: 'Montserrat',
								fontWeight: 'bold',
							}}
						>
							Attribuer
						</button>
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							flexWrap: 'wrap',
							width: '100%',
							height: '100%',
							alignItems: 'flex-start',
							marginBottom: '2rem',
						}}
					>
						{commandes.map((commande) => {
							if (commande.type_commande === 'course-a-course') {
								return (
									<div
										key={commande._id}
										style={{
											display: 'flex',
											flexDirection: 'row',
											width: '100%',
										}}
									>
										<input
											type='checkbox'
											style={{
												marginRight: '1rem',
											}}
											checked={selectedCommandes.includes(
												commande._id
											)}
											onChange={(event) => {
												const target = event.target
												if (target.checked) {
													setSelectedCommandes([
														...selectedCommandes,
														commande._id,
													])
												} else {
													setSelectedCommandes(
														selectedCommandes.filter(
															(c) =>
																c !==
																commande._id
														)
													)
												}
											}}
										/>

										<CourseACourseHorizontal
											commande={commande}
											onClickDetails={() => {
												history.push(
													`/transports/${commande._id}`
												)
											}}
											onClickSignaler={() => {
												history.push(
													`/client/transports/${commande._id}/signaler`
												)
											}}
											onClickRecu={async () => {
												if (!commande.recu) {
													await updateRecuCommande(
														commande._id
													)
													await fetchCommandes()
													setSelectedCommandes([])
													setSelectedChauffeur(null)
												}
											}}
											onClickAttribuer={async () => {
												setModalIsOpen(true)
												setSelectedCommandes([
													commande._id,
												])
											}}
										/>
									</div>
								)
							} else {
								return (
									<div
										key={commande._id}
										style={{
											display: 'flex',
											flexDirection: 'row',
											width: '100%',
										}}
									>
										<input
											type='checkbox'
											style={{
												marginRight: '1rem',
											}}
											checked={selectedCommandes.includes(
												commande._id
											)}
											onChange={(event) => {
												const target = event.target
												console.log(target.checked)
												if (target.checked) {
													setSelectedCommandes([
														...selectedCommandes,
														commande._id,
													])
												} else {
													setSelectedCommandes([])
													setSelectedCommandes(
														selectedCommandes.filter(
															(c) =>
																c !==
																commande._id
														)
													)
												}
											}}
										/>
										<MiseADispoHorizontal
											commande={commande}
											onClickDetails={() => {
												history.push(
													`/transports/${commande._id}`
												)
											}}
											onClickSignaler={() => {
												history.push(
													`/client/transports/${commande._id}/signaler`
												)
											}}
											onClickRecu={async () => {
												if (!commande.recu) {
													await updateRecuCommande(
														commande._id
													)
													await fetchCommandes()
													setSelectedCommandes([])
													setSelectedChauffeur(null)
												}
											}}
											onClickAttribuer={async () => {
												setModalIsOpen(true)
												setSelectedCommandes([
													commande._id,
												])
											}}
										/>
									</div>
								)
							}
						})}
					</div>
				</div>
			</div>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
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
				contentLabel='Example Modal'
			>
				<div
					style={{
						width: '25rem',
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
							fontWeight: 'bold',
							fontSize: 30,
							marginBottom: '2rem',
						}}
					>
						Attribuer un transport
					</span>
					<div
						style={{
							marginBottom: '2rem',
						}}
					>
						Veuillez sélectionner le chauffeur <br /> que vous
						voulez affecter à ce transport
					</div>

					<div
						style={{
							width: '50%',
						}}
					>
						<Select
							options={chauffeurs.map((c) => ({
								value: c._id,
								label: `${c.first_name} ${c.last_name}`,
							}))}
							styles={{
								option: (provided, state) => ({
									...provided,
									fontFamily: 'Montserrat',
								}),
							}}
							menuPortalTarget={document.querySelector('body')}
							onChange={(x) => setSelectedChauffeur(x.value)}
						/>
					</div>

					<button
						onClick={async () => {
							await attributionCommandes(
								selectedCommandes,
								selectedChauffeur
							)
							await fetchCommandes()
							setSelectedCommandes([])
							setSelectedChauffeur(null)
							setModalIsOpen(false)
						}}
						style={{
							padding: '0.5rem 2rem',
							background: '#50F5A9',
							border: 'none',
							cursor: 'pointer',
							color: 'white',
							borderRadius: 7,
							marginTop: 30,
							fontSize: 15,
							fontFamily: 'Montserrat',
							fontWeight: 'bold',
						}}
					>
						Attribuer
					</button>
				</div>
			</Modal>
		</LayoutTransporter>
	)
}

export default MesTransports
