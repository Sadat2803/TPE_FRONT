import React, { useEffect, useState } from 'react'

import GooglePlacesAutoComplete from '../GooglePlacesAutoComplete/google-places-auto-complete'
import { Select } from '../../Containers/PasserCommande/PasserCommande.styles'
import _ from 'lodash'
import { getDistanceBetweenTwoPlaces } from '../../api/distance'
import { updateCommandeWayPoints } from '../../api/commande'
import { useSelector } from 'react-redux'

function TransportTracking({ commande, display = false, showFacture = false }) {
	const [place, setPlace] = useState(null)

	const [places, setPlaces] = useState([])

	const [allPlaces, setAllPlaces] = useState([])

	const [placesVector, setPlacesVector] = useState(new Map([]))

	const [distanceVector, setDistanceVector] = useState(new Map([]))

	const [totalDistance, setTotalDistance] = useState(0)

	const tarif = useSelector((state) => state.tarif.tarif)

	const [selectedDay, setSelectedDay] = useState(1)

	useEffect(() => {
		if (commande.waypoints) {
			setTotalDistance(_.sum(commande.waypoints.map((p) => p.distance)))

			setPlaces(
				commande.waypoints.filter((p) => p.day === Number(selectedDay))
			)

			setAllPlaces(commande.waypoints)

			setDistanceVector(
				new Map(
					commande.waypoints
						.filter((p) => p.day === Number(selectedDay))
						.map((p, index) => [index, p.distance * 1000])
				)
			)

			setPlacesVector(
				new Map(
					commande.waypoints
						.filter((p) => p.day === Number(selectedDay))
						.map((p, index) => [index, p.value.place_id])
				)
			)
		}
	}, [selectedDay])

	useEffect(() => {
		setTotalDistance(_.sum(Array.from(distanceVector.values())) / 1000)
	}, [distanceVector])

	useEffect(() => {
		async function $updateCommandeWayPoints() {
			await updateCommandeWayPoints(commande._id, {
				waypoints: allPlaces,
				waypoints_overage: totalDistance > commande.kilo_jour,
			})
		}

		$updateCommandeWayPoints()
	}, [totalDistance, allPlaces])

	const renderAmountToBill = () => {
		const depassementTotal = computeDepassementForAllDays()

		return `${depassementTotal} * ${
			tarif.FACTURATION_DEPASSEMENT_MISE_A_DISPO
		} = ${
			depassementTotal * tarif.FACTURATION_DEPASSEMENT_MISE_A_DISPO
		} euros`
	}

	const computeDepassementMissionForDay = (day) => {
		const wayPointsForDay = allPlaces.filter((p) => p.day === Number(day))

		const distanceForDay = _.sum(wayPointsForDay.map((w) => w.distance))

		if (distanceForDay > commande.kilo_jour) {
			return Number((distanceForDay - commande.kilo_jour).toFixed(3))
		} else {
			return 0
		}
	}

	const computeDepassementForAllDays = () => {
		const depassements = Array.from(
			{ length: commande.nb_jours },
			(v, i) => i + 1
		).map((day) => {
			return computeDepassementMissionForDay(day)
		})

		const totalDepassements = _.sum(depassements)

		return totalDepassements.toFixed(3)
	}

	return (
		<div>
			<p>
				<b>Forfait {commande.kilo_jour} km jours</b>
			</p>

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					background: 'linen',
					padding: '1rem .5rem',
				}}
			>
				<span
					style={{
						marginBottom: '1rem',
						color: 'black',
						fontSize: 14,
					}}
				>
					Jours
				</span>
				<Select
					value={selectedDay}
					onChange={(e) => setSelectedDay(e.target.value)}
				>
					{Array.from(
						{ length: commande.nb_jours },
						(v, i) => i + 1
					).map((i) => (
						<option key={String(i)} value={String(i)}>
							{i}
						</option>
					))}
				</Select>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					background: 'linen',
					//padding: '.5rem',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						flex: 1,
						padding: '.5rem',
						//borderRadius: '1rem',
					}}
				>
					{!display && (
						<>
							<GooglePlacesAutoComplete
								value={place}
								onChange={(place) => setPlace(place)}
								placeholder={"Saisissez l'adresse"}
							/>
							<button
								onClick={async () => {
									if (place) {
										setPlacesVector(
											new Map(
												placesVector.set(
													places.length,
													place.value.place_id
												)
											)
										)

										const origin = placesVector.get(
											places.length - 1
										)

										const destination = place.value.place_id

										if (origin) {
											try {
												const distance =
													await getDistanceBetweenTwoPlaces(
														origin,
														destination
													)

												setDistanceVector(
													new Map(
														distanceVector.set(
															places.length,
															distance
														)
													)
												)
											} catch (error) {
												console.log(error)
											}
										} else {
											setDistanceVector(
												new Map(
													distanceVector.set(
														places.length,
														0
													)
												)
											)
										}

										setPlaces([
											...places,
											{
												...place,
												day: Number(selectedDay),
												distance:
													distanceVector.get(
														places.length
													) / 1000,
											},
										])

										setAllPlaces([
											...allPlaces,
											{
												...place,
												day: Number(selectedDay),
												distance:
													distanceVector.get(
														places.length
													) / 1000,
											},
										])

										setPlace(null)
									}
								}}
								style={{
									marginTop: '1rem',
									background: '#50F5A9',
									padding: '1rem 2rem',
									color: 'white',
									borderRadius: 5,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									cursor: 'pointer',
									fontWeight: 'bold',
									border: 'none',
									width: '100%',
								}}
							>
								Ajouter une adresse +
							</button>
						</>
					)}

					<div
						style={{
							maxHeight: '15rem',
							overflow: 'auto',
						}}
					>
						{places.map((place, index) => (
							<div
								style={{
									background: 'ghostwhite',
									padding: '1rem',
									marginTop: '1rem',
									display: 'flex',
									flexDirection: 'column',
								}}
								key={place.value.place_id}
							>
								<span>{place.value.description}</span>
								{distanceVector.get(index) !== 0 && (
									<span
										style={{
											marginTop: '.5rem',
											//fontSize: 12,
										}}
									>
										{(distanceVector.get(index) || 0) /
											1000}{' '}
										km depuis derniere adresse
									</span>
								)}
							</div>
						))}
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						flex: 1,
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							flex: 1,
							padding: '.5rem',
							//background: 'crimson',
						}}
					>
						<p>
							<b>
								{totalDistance <= commande.kilo_jour ? (
									<span>
										Total Km parcouru: {totalDistance} km
									</span>
								) : (
									<>
										<span>Total Km parcouru: </span>
										<span style={{ color: 'crimson' }}>
											{commande.kilo_jour} km atteint
										</span>
									</>
								)}
							</b>
						</p>
						<p>
							<b>
								Dépassement:{' '}
								<span>
									{computeDepassementMissionForDay(
										selectedDay
									)}{' '}
									km
								</span>
							</b>
						</p>
						<p>
							<b>Total: {totalDistance.toFixed(3)} km</b>
						</p>

						<p>
							<b>
								Total depassement de la mission:{' '}
								{computeDepassementForAllDays()}
								km
							</b>
						</p>
					</div>

					{showFacture && (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								flex: 1,
								padding: '.5rem',
								//background: 'orange',
							}}
						>
							<span>A Facturer</span>
							<span>{renderAmountToBill()}</span>
							<button
								onClick={async () => {}}
								style={{
									marginTop: '1rem',
									background: '#50F5A9',
									padding: '1rem 2rem',
									color: 'white',
									borderRadius: 5,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									cursor: 'pointer',
									fontWeight: 'bold',
									border: 'none',
									width: '100%',
								}}
							>
								Envoyer la facture
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default TransportTracking
