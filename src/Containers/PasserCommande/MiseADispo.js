import 'flatpickr/dist/themes/material_blue.css'

import {
	FormContentSection,
	FormSectionCard,
	FormSectionTitle,
	Select,
	StyledInput,
	StyledTextArea,
} from './PasserCommande.styles'
import React, { useState } from 'react'

import { Controller } from 'react-hook-form'
import { CustomInput } from '../RegisterTransporter/style'
import File from '../../assets/img/file@2x.png'
import Flatpickr from 'react-flatpickr'
import { French } from 'flatpickr/dist/l10n/fr.js'
import GooglePlacesAutoComplete from '../../Components/GooglePlacesAutoComplete/google-places-auto-complete'
import { PUBLIC } from '../../api/base'
import TimeField from 'react-simple-timefield'
import UploadFileCommande from '../../Components/UploadFileCommande/UploadFileCommande'
import { getDistanceBetweenTwoPlaces } from '../../api/distance'
import moment from 'moment'
import { totalDistance } from '../../utils/price'
import { useAtom } from 'jotai'

function MiseADispo({
	register,
	watch,
	setValue,
	hideUpload = false,
	initialFiles = [],
	display = false,
	keepFilesAsObjects = false,
	control,
}) {
	const [numberOfCourses, setNumberOfCourses] = useState(1)
	const [collapsedItems, setCollapsedItems] = useState([])

	const [distance, setDistance] = useAtom(totalDistance)
	const [placesVector, setPlacesVector] = useState(new Map())

	const [origin, setOrigin] = useState(null)

	return (
		<FormContentSection>
			<FormSectionTitle>Informations transport</FormSectionTitle>

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
							marginBottom: '2.5rem',
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
								Date de début mise à disposition
							</span>
							{/* <StyledInput
								disabled={display}
								type='date'
								style={{
									fontFamily: 'Montserrat',
									color: '#838EAB',
								}}
								{...register(`debut`, {
									required: true,
									maxLength: 80,
								})}
							/> */}
							<Controller
								name='debut'
								rules={{ required: true }}
								control={control}
								render={({ field: { onChange, value } }) => (
									<Flatpickr
										disabled={display}
										onChange={([date]) => {
											onChange(date)
										}}
										className='date-input'
										options={{
											mode: 'single',
											locale: French,
											minDate: moment()
												.startOf('day')
												.toDate(),
											dateFormat: 'd/m/Y',
										}}
										value={value}
									/>
								)}
							/>
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
								Heure de début mise à disposition
							</span>

							<Controller
								name='heure_debut'
								rules={{ required: true }}
								control={control}
								render={({ field: { onChange, value } }) => (
									<TimeField
										value={value}
										onChange={(event, value) => {
											onChange(value)
										}}
										input={
											<input
												disabled={display}
												type='text'
												className='date-input'
												onFocus={(e) => {
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
							Adresse début mise à disposition
						</span>
						<Controller
							name={`adresse_debut`}
							rules={{ required: true }}
							control={control}
							render={({ field: { onChange, value } }) => (
								<GooglePlacesAutoComplete
									disabled={display}
									value={value}
									onChange={async (place) => {
										if (place) {
											onChange(place)

											setOrigin(place)

											setPlacesVector(
												new Map(
													placesVector.set(
														0,
														place.value.place_id
													)
												)
											)

											const origin = place.value.place_id

											const destination =
												placesVector.get(0)

											if (destination) {
												try {
													const distance =
														await getDistanceBetweenTwoPlaces(
															origin,
															destination
														)

													//setDistance(distance)
												} catch (error) {
													console.log(error)
												}
											}
										} else {
											onChange(place)

											setOrigin(null)

											setPlacesVector(
												new Map(
													placesVector.set(
														0,
														undefined
													)
												)
											)

											//setDistance(0)
										}
									}}
								/>
							)}
						/>
						{/* <StyledInput
							type='text'
							disabled={display}
							placeholder=''
							{...register(`adresse_debut`, {
								required: true,
								maxLength: 80,
							})}
						/> */}
					</div>

					{/* HERE */}

					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							marginBottom: '2.5rem',
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
								Date de Fin mise à disposition
							</span>
							{/* <StyledInput
								type='date'
								disabled={display}
								style={{
									fontFamily: 'Montserrat',
									color: '#838EAB',
								}}
								{...register(`fin`, {
									required: true,
									maxLength: 80,
								})}
							/> */}

							<Controller
								name='fin'
								rules={{ required: true }}
								control={control}
								render={({ field: { onChange, value } }) => (
									<Flatpickr
										disabled={display}
										onChange={([date]) => {
											onChange(date)
										}}
										className='date-input'
										options={{
											mode: 'single',
											locale: French,
											minDate: moment()
												.startOf('day')
												.toDate(),
											dateFormat: 'd/m/Y',
										}}
										value={value}
									/>
								)}
							/>
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
								Heure de fin mise à disposition
							</span>

							<Controller
								name='heure_fin'
								rules={{ required: true }}
								control={control}
								render={({ field: { onChange, value } }) => (
									<TimeField
										value={value}
										onChange={(event, value) => {
											onChange(value)
										}}
										input={
											<input
												disabled={display}
												type='text'
												className='date-input'
												onFocus={(e) => {
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

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginBottom: '2.5rem',
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
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
								Adresse de fin mise à disposition
							</span>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
								}}
							>
								<input
									type='checkbox'
									name='same-address-as-beginning'
									id='same-address-as-beginning'
									style={{
										marginRight: '1rem',
									}}
									disabled={display}
									{...register(
										'same-address-as-beginning',
										{}
									)}
									onChange={async (e) => {
										console.log(e.target.checked)

										const place = origin
										console.log(place)

										if (e.target.checked && place) {
											setValue('adresse_fin', place)

											setPlacesVector(
												new Map(
													placesVector.set(
														1,
														place.value.place_id
													)
												)
											)

											const origin = placesVector.get(0)

											const destination =
												place.value.place_id

											if (origin) {
												try {
													// const distance =
													// 	await getDistanceBetweenTwoPlaces(
													// 		origin,
													// 		destination
													// 	)
													// setDistance(0)
												} catch (error) {
													console.log(error)
												}
											}
										} else {
											setValue('adresse_fin', null)

											setPlacesVector(
												new Map(
													placesVector.set(
														1,
														undefined
													)
												)
											)

											// setDistance(0)
										}
									}}
								/>
								<span>Adresse de début</span>
							</div>
						</div>

						<Controller
							name={`adresse_fin`}
							rules={{ required: true }}
							control={control}
							render={({ field: { onChange, value } }) => (
								<GooglePlacesAutoComplete
									disabled={display}
									value={value}
									onChange={async (place) => {
										if (place) {
											onChange(place)

											setPlacesVector(
												new Map(
													placesVector.set(
														1,
														place.value.place_id
													)
												)
											)

											const origin = placesVector.get(0)

											const destination =
												place.value.place_id

											if (origin) {
												try {
													const distance =
														await getDistanceBetweenTwoPlaces(
															origin,
															destination
														)

													//setDistance(distance)
												} catch (error) {
													console.log(error)
												}
											}
										} else {
											onChange(place)

											setPlacesVector(
												new Map(
													placesVector.set(
														1,
														undefined
													)
												)
											)

											// setDistance(0)
										}
									}}
								/>
							)}
						/>
						{distance > 0 && (
							<span style={{ marginTop: '1rem' }}>
								Nombre de Km:{' '}
								<strong>{(distance || 0) / 1000}</strong>
							</span>
						)}
						{/* <StyledInput
							type='text'
							disabled={display}
							placeholder=''
							{...register(`adresse_fin`, {
								required: true,
								maxLength: 80,
							})}
						/> */}
					</div>

					{/* HERE 2 */}

					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							marginBottom: '2.5rem',
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
								Nombre d'heures pour chaque jours
							</span>
							<Select
								disabled={display}
								{...register('heure_jour')}
								onChange={(e) => {
									setValue('heure_jour', e.target.value)
								}}
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
								Nombre de kilomètre jour
							</span>

							<div
								style={{
									position: 'relative',
									width: '100%',
								}}
							>
								<CustomInput
									disabled={display}
									width={'100%'}
									type='number'
									min={0}
									{...register('kilo_jour')}
								/>
								<span
									style={{
										position: 'absolute',
										right: '3rem',
										top: '1rem',
									}}
								>
									KM
								</span>
							</div>
						</div>
					</div>

					{/* <div
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
							Nombre de jours
						</span>
						<StyledInput
							type='number'
							disabled={display}
							placeholder=''
							min={1}
							{...register('nb_jours')}
						/>
					</div> */}

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
							Référence interne client
						</span>
						<StyledInput
							type='text'
							disabled={display}
							placeholder=''
							{...register('ref_client')}
						/>
					</div>

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
							Notes Utiles
						</span>
						<StyledTextArea
							disabled={display}
							rows={4}
							placeholder=''
							{...register('notes')}
						/>
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginBottom: '2.5rem',
							width: '50%',
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
								Joindre Documents
							</span>
							{!display && (
								<span
									style={{
										marginBottom: '1rem',
										color: 'black',
										fontSize: 14,
									}}
								>
									(Facultatif)
								</span>
							)}
						</div>
						{!display && (
							<UploadFileCommande
								initialFiles={watch('files')}
								name='file'
								onChange={(files) => {
									if (keepFilesAsObjects) {
										setValue(
											'files',
											files.map((file) => file)
										)
									} else {
										setValue(
											'files',
											files.map((file) => file.id)
										)
									}
								}}
							/>
						)}

						{display &&
							(watch('files') || []).map((file, index) => (
								<div
									onClick={() => {
										window.open(`${PUBLIC}/${file?.name}`)
									}}
									key={String(index)}
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-start',
										marginBottom: 20,
										cursor: 'pointer',
									}}
								>
									<img
										src={File}
										style={{
											height: 20,
											marginRight: '1rem',
										}}
										alt=''
									/>
									<span
										style={{
											marginRight: '1rem',
											width: '10rem',
										}}
									>
										{file?.name}
									</span>
								</div>
							))}
					</div>
				</div>
			</FormSectionCard>
		</FormContentSection>
	)
}

export default MiseADispo
