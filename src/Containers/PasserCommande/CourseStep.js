import React, { useRef } from 'react'
import { Select, StyledTextArea } from './PasserCommande.styles'

import { Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import { French } from 'flatpickr/dist/l10n/fr.js'
import GooglePlacesAutoComplete from '../../Components/GooglePlacesAutoComplete/google-places-auto-complete'
import { PUBLIC } from '../../api/base'
import TimeField from 'react-simple-timefield'
import UploadFileCommande from '../../Components/UploadFileCommande/UploadFileCommande'
import { getDistanceBetweenTwoPlaces } from '../../api/distance'
import moment from 'moment'

function CourseStep({
	collapsedItems,
	keepFilesAsObjects,
	i,
	watch,
	register,
	getValues,
	setValue,
	control,
	display,
	placesVector,
	setPlacesVector,
	distanceVector,
	setDistanceVector,
}) {
	return (
		<>
			<div
				style={{
					display: collapsedItems.includes(i) ? 'none' : 'flex',
					flexDirection: 'column',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '50%',
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
						Début du transport
					</span>

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
								id='type_debut-chargement'
								type='radio'
								disabled={display}
								value='Chargement'
								{...register(`courses[${i}].type_debut`, {
									required: true,
								})}
							/>

							<label htmlFor='type_debut-chargement'>
								Chargement
							</label>
						</div>

						<div
							className='radio'
							style={{
								marginRight: '1rem',
							}}
						>
							<input
								id='type_debut-dechargement'
								type='radio'
								disabled={display}
								value='Déchargement'
								{...register(`courses[${i}].type_debut`, {
									required: true,
								})}
							/>

							<label htmlFor='type_debut-dechargement'>
								Déchargement
							</label>
						</div>
					</div>

					{/* <Controller
						name={`courses[${i}].type_debut`}
						rules={{ required: true }}
						control={control}
						defaultValue='Chargement'
						render={({ field: { onChange, value } }) => (
							<Select
								disabled={display}
								value={value}
								onChange={onChange}
							>
								<option value='Chargement'>Chargement</option>
								<option value='Déchargement'>
									Déchargement
								</option>
							</Select>
						)}
					/> */}
				</div>

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
							fontFamily: 'Montserrat',
						}}
					>
						<span
							style={{
								marginBottom: '1rem',
								color: 'black',
								fontSize: 14,
							}}
						>
							Date du transport
						</span>

						<Controller
							name={`courses[${i}].date_debut`}
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
							//marginBottom: '2.5rem',
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
							Heure
						</span>

						<Controller
							name={`courses[${i}].heure_debut`}
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
						Lieux
					</span>
					<Controller
						name={`courses[${i}].adresse_debut`}
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
													`${i}-debut`,
													place.value.place_id
												)
											)
										)

										const origin = placesVector.get(
											`${i - 1}-fin`
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
															`${i}-debut`,
															distance
														)
													)
												)
											} catch (error) {
												console.log(error)
											}
										}
									} else {
										onChange(place)

										setPlacesVector(
											new Map(
												placesVector.set(
													`${i}-debut`,
													undefined
												)
											)
										)

										setDistanceVector(
											new Map(
												distanceVector.set(
													`${i}-debut`,
													undefined
												)
											)
										)
									}
								}}
							/>
						)}
					/>
					{distanceVector.get(`${i}-debut`) !== undefined && (
						<span style={{ marginTop: '1rem' }}>
							Nombre de Km depuis la derniere étapes:{' '}
							<strong>
								{(distanceVector.get(`${i}-debut`) || 0) / 1000}
							</strong>
						</span>
					)}
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
						type='text'
						rows={4}
						placeholder=''
						{...register(`courses[${i}].notes_debut`)}
					/>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						//marginBottom: '2.5rem',
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
							initialFiles={watch(`courses[${i}].files_debut`)}
							name={`file_debut_${i}`}
							onChange={(files) => {
								if (keepFilesAsObjects) {
									setValue(
										`courses[${i}].files_debut`,
										files.map((file) => file)
									)
								} else {
									setValue(
										`courses[${i}].files_debut`,
										files.map((file) => file.id)
									)
								}
							}}
						/>
					)}

					{display &&
						(watch(`courses[${i}].files_debut`) || []).map(
							(file, index) => (
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
										alt=''
										src={File || 'https://secure.gravatar.com/favicon.ico'}
										style={{
											height: 20,
											marginRight: '1rem',
										}}
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
							)
						)}
				</div>
			</div>

			{/* ################################################## */}
			<p
				style={{
					marginTop: '2rem',
					marginBottom: '2rem',
				}}
			>
				<b>Suite du transport</b>
			</p>
			{/* ################################################## */}

			<div
				style={{
					display: collapsedItems.includes(i) ? 'none' : 'flex',
					flexDirection: 'column',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '50%',
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
						Type de course
					</span>

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
								id='type_fin-chargement'
								type='radio'
								disabled={display}
								value='Chargement'
								{...register(`courses[${i}].type_fin`, {
									required: true,
								})}
							/>

							<label htmlFor='type_fin-chargement'>
								Chargement
							</label>
						</div>

						<div
							className='radio'
							style={{
								marginRight: '1rem',
							}}
						>
							<input
								id='type_fin-dechargement'
								type='radio'
								disabled={display}
								value='Déchargement'
								{...register(`courses[${i}].type_fin`, {
									required: true,
								})}
							/>

							<label htmlFor='type_fin-dechargement'>
								Déchargement
							</label>
						</div>
					</div>

					{/* <Controller
						name={`courses[${i}].type_fin`}
						rules={{ required: true }}
						control={control}
						defaultValue='Chargement'
						render={({ field: { onChange, value } }) => (
							<Select
								disabled={display}
								value={value}
								onChange={onChange}
							>
								<option value='Chargement'>Chargement</option>
								<option value='Déchargement'>
									Déchargement
								</option>
							</Select>
						)}
					/> */}
				</div>

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
							fontFamily: 'Montserrat',
						}}
					>
						<span
							style={{
								marginBottom: '1rem',
								color: 'black',
								fontSize: 14,
							}}
						>
							Date du transport
						</span>

						<Controller
							name={`courses[${i}].date_fin`}
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
							//marginBottom: '2.5rem',
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
							Heure
						</span>

						<Controller
							name={`courses[${i}].heure_fin`}
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
						Lieux
					</span>
					<Controller
						name={`courses[${i}].adresse_fin`}
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
													`${i}-fin`,
													place.value.place_id
												)
											)
										)

										const origin = placesVector.get(
											`${i}-debut`
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
															`${i}-fin`,
															distance
														)
													)
												)
											} catch (error) {
												console.log(error)
											}
										}
									} else {
										onChange(place)

										setPlacesVector(
											new Map(
												placesVector.set(
													`${i}-fin`,
													undefined
												)
											)
										)

										setDistanceVector(
											new Map(
												distanceVector.set(
													`${i}-fin`,
													undefined
												)
											)
										)
									}
								}}
							/>
						)}
					/>
					{distanceVector.get(`${i}-fin`) !== undefined && (
						<span style={{ marginTop: '1rem' }}>
							Nombre de Km depuis la derniere étapes:{' '}
							<strong>
								{(distanceVector.get(`${i}-fin`) || 0) / 1000}
							</strong>
						</span>
					)}
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
						type='text'
						rows={4}
						placeholder=''
						{...register(`courses[${i}].notes_fin`)}
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
							initialFiles={watch(`courses[${i}].files_fin`)}
							name={`file_fin_${i}`}
							onChange={(files) => {
								if (keepFilesAsObjects) {
									setValue(
										`courses[${i}].files_fin`,
										files.map((file) => file)
									)
								} else {
									setValue(
										`courses[${i}].files_fin`,
										files.map((file) => file.id)
									)
								}
							}}
						/>
					)}

					{display &&
						(watch(`courses[${i}].files_fin`) || []).map(
							(file, index) => (
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
										alt=''
										src={File}
										style={{
											height: 20,
											marginRight: '1rem',
										}}
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
							)
						)}
				</div>
			</div>
		</>
	)
}

export default CourseStep
