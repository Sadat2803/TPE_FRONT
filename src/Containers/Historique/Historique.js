import {
	GradientText,
	SubText,
	Wrapper,
} from '../PasserCommande/PasserCommande.styles'
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

function Historique(props) {
	const history = useHistory()
	const [commandes, setCommandes] = useState([])
	const clientID = useSelector((state) => state.auth.user._id)

	const [searchCriteria, setSearchCriteria] = useState('prix')
	const [range, setRange] = useState([new Date(), new Date()])
	const [min, setMin] = useState(0)
	const [max, setMax] = useState(300)

	async function fetchCommandes(clientID) {
		const commandes = await getAllCommandesByClientId(clientID)
		setCommandes(commandes.docs)
	}

	useEffect(() => {
		fetchCommandes(clientID)
	}, [clientID])

	return (
		<Container>
			<Wrapper>
				<GradientText>{'historique'.toUpperCase()}</GradientText>
				<SubText>
					Ici retrouver la totalité des transports effectués
				</SubText>

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
					{commandes.map((commande) => {
						if (commande.type_commande === 'course-a-course') {
							return (
								<CourseACourseHorizontal
									key={commande._id}
									commande={commande}
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
		</Container>
	)
}

export default Historique
