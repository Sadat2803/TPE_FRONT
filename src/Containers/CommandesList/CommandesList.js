import { GradientText, Wrapper } from '../PasserCommande/PasserCommande.styles'
import React, { useEffect, useState } from 'react'
import {
	searchCommandesByDateForClient,
	searchCommandesByPrixMinMaxForClient,
} from '../../api/clients'

import Container from '../../Components/LayoutClient/container.component'
import CourseACourseHorizontal from '../../Components/SingleCommandeHorizontal/CourseACourseHorizontal'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import MiseADispoHorizontal from '../../Components/SingleCommandeHorizontal/MiseADispoHorizontal'
import Select from 'react-select'
import SingleCommandeHorizontal from '../../Components/SingleCommandeHorizontal/SingleCommandeHorizontal'
import { getAllCommandesByClientId } from '../../api/commande'
import moment from 'moment'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'
import Logo from '../../assets/img/logo-TPE.png'
function CommandesList(props) {
	const history = useHistory()
	const [commandes, setCommandes] = useState([])
	const clientID = useSelector((state) => state.auth.user._id)

	const [searchCriteria, setSearchCriteria] = useState('prix')
	const [range, setRange] = useState([new Date(), new Date()])
	const [min, setMin] = useState(0)
	const [max, setMax] = useState(300)
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [isOrderCanceled, setIsOrderCanceled ] = useState(false)

	async function fetchCommandes(clientID) {
		const commandes = await getAllCommandesByClientId(clientID)
		console.log(commandes)
		setCommandes(commandes.docs)
	}

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const success = params.get('success');
		console.log({document})
		if (success === 'true') {
			setModalIsOpen(true)
			setIsOrderCanceled(false)
		}
		if (success === 'false') {
			setModalIsOpen(true)
			setIsOrderCanceled(true)
		}
	},[])

	useEffect(() => {
		fetchCommandes(clientID)
	}, [clientID])

	return (
		<Container>
			<Wrapper>
				<GradientText>{'commandes'.toUpperCase()}</GradientText>

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
							menuPortalTarget={document.querySelector('body')}
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
						<DateRangePicker onChange={setRange} value={range} />
					) : null}

					<button
						onClick={async () => {
							let res

							if (searchCriteria === 'prix') {
								res =
									await searchCommandesByPrixMinMaxForClient(
										min,
										max,
										clientID
									)
							}

							if (searchCriteria === 'date') {
								let minDate = moment(range[0]).unix()
								let maxDate = moment(range[1]).unix()

								res = await searchCommandesByDateForClient(
									minDate,
									maxDate,
									clientID
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
				</div>

				<div
					style={{
						width: '100%',
						fontFamily: 'Montserrat',
						paddingLeft: '1rem',
						paddingRight: '1rem',
						marginBottom: 5,
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							//justifyContent: 'center',
						}}
					>
						<span
							style={{
								color: '#51C7F2',
								fontWeight: 'bold',
								marginRight: 10,
								marginBottom: 10,
							}}
						>
							Aujourd’hui
						</span>

						<div
							style={{
								width: '10rem',
								height: 1,
								background: '#F2F2F2',
							}}
						/>
					</div>

					{commandes.map((commande) => {
						if (commande.type_commande === 'course-a-course') {
							return (
								<CourseACourseHorizontal
									key={commande._id}
									commande={commande}
									hideRecu
									hideAttribuer
									onClickDetails={() => {
										history.push(
											`/commandes/${commande._id}`
										)
									}}
									onClickSignaler={() => {
										history.push(
											`/client/transports/${commande._id}/signaler`
										)
									}}
								/>
							)
						} else {
							return (
								<MiseADispoHorizontal
									key={commande._id}
									commande={commande}
									hideRecu
									hideAttribuer
									onClickDetails={() => {
										history.push(
											`/commandes/${commande._id}`
										)
									}}
									onClickSignaler={() => {
										history.push(
											`/client/transports/${commande._id}/signaler`
										)
									}}
								/>
							)
						}
					})}
				</div>
			</Wrapper>
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
					<div>
					<img
					style={{
						width: '10rem',
						backgroundColor: 'grey',
						padding: '2px'
					}}
					alt='logo'
					src={Logo}
				/>
						<h1>{isOrderCanceled ? "Erreur de paiement": "paiement effectué avec succès"}</h1>
					</div>

					<button
						onClick={() => setModalIsOpen(false)}
						style={{
							padding: '1rem 2rem',
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
		</Container>
	)
}

export default CommandesList
