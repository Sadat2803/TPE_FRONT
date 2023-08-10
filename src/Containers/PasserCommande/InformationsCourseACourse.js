import 'flatpickr/dist/themes/material_blue.css'

import {
	FormContentSection,
	FormSectionCard,
	FormSectionTitle,
	Select,
	StyledTextArea,
} from './PasserCommande.styles'
import React, { useEffect, useRef, useState } from 'react'

import AddCourse from '../../assets/img/add_course@2x.png'
import Agrandir from '../../assets/img/agrandir@2x.png'
import { Controller } from 'react-hook-form'
import CourseStep from './CourseStep'
import File from '../../assets/img/file@2x.png'
import Flatpickr from 'react-flatpickr'
import { French } from 'flatpickr/dist/l10n/fr.js'
import GooglePlacesAutoComplete from '../../Components/GooglePlacesAutoComplete/google-places-auto-complete'
import { PUBLIC } from '../../api/base'
import Reduire from '../../assets/img/reduire@2x.png'
import TimeField from 'react-simple-timefield'
import UploadFileCommande from '../../Components/UploadFileCommande/UploadFileCommande'
import _ from 'lodash'
import { getDistanceBetweenTwoPlaces } from '../../api/distance'
import moment from 'moment'
import { totalDistance } from '../../utils/price'
import { useAtom } from 'jotai'
import SingleCourseStep from './SingleCourseStep'

function InformationCourseACourse({
	unregister,
	register,
	watch,
	setValue,
	initialNumberOfCourses = 1,
	display = false,
	keepFilesAsObjects = false,
	control,
	getValues,
}) {
	const [distance, setDistance] = useAtom(totalDistance)

	const [numberOfCourses, setNumberOfCourses] = useState(
		initialNumberOfCourses
	)
	const [collapsedItems, setCollapsedItems] = useState([])

	const _courses = useRef([])
	_courses.current = watch('courses')

	useEffect(() => {
		setNumberOfCourses(initialNumberOfCourses)
	}, [initialNumberOfCourses])

	const [placesVector, setPlacesVector] = useState(new Map())
	const [distanceVector, setDistanceVector] = useState(new Map())

	useEffect(() => {
		setDistance(_.sum(Array.from(distanceVector.values())))
	}, [distanceVector])

	return (
		<FormContentSection>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<FormSectionTitle>Informations transport</FormSectionTitle>

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

			{[...Array(parseInt(numberOfCourses || 1)).keys()].map((i) => (
				<FormSectionCard key={String(i)}>
					<div
						onClick={() =>
							setCollapsedItems(
								collapsedItems.filter((x) => x != i)
							)
						}
						style={{
							position: 'absolute',
							top: 10,
							right: 10,
							cursor: 'pointer',
							display: !collapsedItems.includes(i)
								? 'none'
								: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<span>Agrandir</span>

						<img
							src={Agrandir}
							style={{ height: 30, marginLeft: '0.5rem' }}
							alt=''
						/>
					</div>

					<div
						onClick={() =>
							setCollapsedItems([...collapsedItems, i])
						}
						style={{
							position: 'absolute',
							bottom: 10,
							right: 10,
							cursor: 'pointer',
							display: collapsedItems.includes(i) || numberOfCourses <= 1
								? 'none'
								: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<span>Réduire</span>
						<img
							src={Reduire}
							style={{ height: 30, marginLeft: '0.5rem' }}
							alt=''
						/>
					</div>

					{!display && (
						<div
							onClick={async () => {
								_courses.current.splice(i, 1)
								setNumberOfCourses(numberOfCourses - 1)
								setValue('courses', _courses.current)
								unregister(`courses.${i}.date_transport`)
								unregister(`courses.${i}.type`)
								unregister(`courses.${i}.adresse`)
								unregister(`courses.${i}.time`)
								unregister(`courses.${i}.notes`)

								const origin = placesVector.get(i - 1)
								const destination = placesVector.get(i + 1)

								// console.log(origin)
								// console.log(destination)

								if (origin && destination) {
									try {
										const distance =
											await getDistanceBetweenTwoPlaces(
												origin,
												destination
											)

										//console.log(distance)

										setDistanceVector(
											new Map(
												distanceVector.set(i, distance)
											)
										)

										setDistanceVector(
											new Map(
												distanceVector.set(
													i + 1,
													undefined
												)
											)
										)

										setPlacesVector(
											new Map(
												placesVector.set(i, destination)
											)
										)

										setPlacesVector(
											new Map(
												placesVector.set(
													i + 1,
													undefined
												)
											)
										)
									} catch (error) {
										console.log(error)
									}
								}
							}}
							style={{
								position: 'absolute',
								bottom: collapsedItems.includes(i)
									? 'unset'
									: 10,
								top: collapsedItems.includes(i) ? 10 : 'unset',
								right: 120,
								cursor: 'pointer',
								display: i > 0 ? 'flex' : 'none',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<div
								style={{
									height: 30,
									width: 30,
								}}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
									/>
								</svg>
							</div>
						</div>
					)}

					<div
						style={{
							display: collapsedItems.includes(i)
								? 'flex'
								: 'none',
							flexDirection: 'row',
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								//marginBottom: '2.5rem',
								width: '100%',
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									width: '50%',
								}}
							>
								<span
									style={{
										marginBottom: '1rem',
										color: 'black',
										fontSize: 14,
									}}
								>
									Date et type
								</span>

								<div
									style={{
										background: 'white',
										width: '100%',
										display: 'flex',
										flex: 1,
										borderRadius: '0.5rem',
										border: 'none',
										padding: '1rem',
										fontFamily: 'Montserrat',
										color: '#858ea8',
										alignItems: 'center',
										justifyContent: 'space-around',
									}}
								>
									<span>
										{watch(
											`courses[${i}].date_transport`
										) &&
											moment(
												watch(
													`courses[${i}].date_transport`
												)
											).format('DD/MM/YYYY')}
									</span>
									<span>
										{getValues(`courses[${i}].time`) &&
											watch(`courses[${i}].time`)}
									</span>
									<span>-</span>
									<span>{watch(`courses[${i}].type`)}</span>
								</div>
							</div>

							<div
								style={{
									width: '1rem',
								}}
							/>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									width: '50%',
								}}
							>
								<span
									style={{
										marginBottom: '1rem',
										color: 'black',
										fontSize: 14,
									}}
								>
									Adresse
								</span>

								<div
									style={{
										background: 'white',
										width: '100%',
										display: 'flex',
										flex: 1,
										borderRadius: '0.5rem',
										border: 'none',
										padding: '1rem',
										fontFamily: 'Montserrat',
										color: '#858ea8',
										alignItems: 'center',
									}}
								>
									<span>
										{
											watch(`courses[${i}].adresse`)
												?.value?.description
										}
									</span>
								</div>
							</div>
						</div>
					</div>

					{
						i === 0 ? (
							<CourseStep
								collapsedItems={collapsedItems}
								keepFilesAsObjects={keepFilesAsObjects}
								i={i}
								watch={watch}
								register={register}
								getValues={getValues}
								setValue={setValue}
								control={control}
								display={display}
								placesVector={placesVector}
								setPlacesVector={setPlacesVector}
								distanceVector={distanceVector}
								setDistanceVector={setDistanceVector}
							/>
						) : (
							<SingleCourseStep
								collapsedItems={collapsedItems}
								keepFilesAsObjects={keepFilesAsObjects}
								i={i}
								watch={watch}
								register={register}
								getValues={getValues}
								setValue={setValue}
								control={control}
								display={display}
								placesVector={placesVector}
								setPlacesVector={setPlacesVector}
								distanceVector={distanceVector}
								setDistanceVector={setDistanceVector}
							/>
						)
					}

				</FormSectionCard>
			))}

			{!display && (
				<div
					onClick={() => setNumberOfCourses(numberOfCourses + 1)}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-start',
						cursor: 'pointer',
						marginTop: '2rem',
					}}
				>
					<img
						style={{ height: 40, marginRight: '1rem' }}
						src={AddCourse}
						alt=''
					/>
					<span>Ajouter une étapes</span>
				</div>
			)}
		</FormContentSection>
	)
}

export default InformationCourseACourse
