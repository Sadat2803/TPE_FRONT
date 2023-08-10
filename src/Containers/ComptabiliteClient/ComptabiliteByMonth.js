import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getCommandesByClientIDByMonth } from '../../api/commande'
import Container from '../../Components/LayoutClient/container.component'
import {
	GradientText,
	SubText,
	Wrapper,
} from '../PasserCommande/PasserCommande.styles'

var months = {
	1: 'Jan',
	2: 'Fév',
	3: 'Mar',
	4: 'Avr',
	5: 'May',
	6: 'Juin',
	7: 'Juill',
	8: 'Aout',
	9: 'Sep',
	10: 'Oct',
	11: 'Nov',
	12: 'Déc',
}

function ComptabiliteByMonth(props) {
	const [data, setData] = useState([])
	const history = useHistory()
	const clientID = useSelector((state) => state.auth.user._id)
	const [total, setTotal] = useState(0)

	useEffect(() => {
		async function getData(clientID) {
			const res = await getCommandesByClientIDByMonth(clientID)
			setTotal(res.total_all)
			console.log(Object.entries(_.groupBy(res.data, (e) => e.year)))
			setData(_.groupBy(res.data, (e) => e.year))
		}

		getData(clientID)
	}, [clientID])

	return (
		<Container>
			<Wrapper>
				<GradientText>{'comptabilité'.toUpperCase()}</GradientText>
				<SubText>
					Ici retrouver la totalité des transports facturer
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
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<div>
						<input
							style={{
								padding: '1rem',
								borderRadius: 5,
								border: '1px solid #E4EAF0',
								width: '25rem',
								fontFamily: 'Montserrat',
							}}
							placeholder='Rechercher par : Ville, Date, Tarif, Département'
						/>
					</div>

					<div
						style={{
							background: '#838EAB',
							padding: '1rem 2rem',
							display: 'flex',
							alignItems: 'center',
							color: 'white',
							borderRadius: 10,
						}}
					>
						<span>Total:</span>
						<span style={{ width: '2rem' }} />
						<span style={{ fontWeight: 'bold' }}>{total}€</span>
					</div>
				</div>

				<div
					style={{
						width: '100%',
						padding: '1rem',
						marginBottom: '1rem',
					}}
				>
					<span
						onClick={() =>
							history.push('/comptabilite/client/month')
						}
						style={{
							padding: '1rem 2rem',
							borderRadius: 5,
							cursor: 'pointer',
							marginRight: '1rem',
							fontWeight: 'bold',
							color: 'white',
							background: '#50F5A9',
						}}
					>
						Mois
					</span>
					<span
						onClick={() => history.push('/comptabilite/client/day')}
						style={{
							padding: '1rem 2rem',
							borderRadius: 5,
							cursor: 'pointer',
							fontWeight: 'bold',
							color: 'white',
							marginRight: '1rem',
							background: '#E4EAF0',
						}}
					>
						Jours
					</span>
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
					{Object.entries(data).map((element, index) => {
						return (
							<div
								key={String(index)}
								style={{
									width: '100%',
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										width: '100%',
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
										{element[0]}
									</span>

									<div
										style={{
											width: '100%',
											height: 1,
											background: '#F2F2F2',
										}}
									/>
								</div>

								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										flexWrap: 'wrap',
										width: '100%',
										height: '100%',
										alignItems: 'flex-start',
									}}
								>
									{element[1].map((item, index) => (
										<div
											key={String(index)}
											style={{
												width: '25%',
												background: '#E4EAF0',
												borderRadius: 15,
												marginRight: '1rem',
												padding: '1rem 2rem',
												flexGrow: 0,
											}}
										>
											<div
												style={{
													display: 'flex',
													flexDirection: 'row',
													justifyContent:
														'space-between',
													marginBottom: '.5rem',
												}}
											>
												<span
													style={{
														color: '#838EAB',
														//fontSize: 18,
													}}
												>
													{months[`${item.month}`]}
												</span>
											</div>

											<span
												style={{
													color: '#51C7F2',
													fontWeight: 'bold',
													marginTop: '1rem',
													//fontSize: 18,
												}}
											>
												Total: {`${item.totalAmount}€`}
											</span>
										</div>
									))}
								</div>
							</div>
						)
					})}
				</div>
			</Wrapper>
		</Container>
	)
}

export default ComptabiliteByMonth
