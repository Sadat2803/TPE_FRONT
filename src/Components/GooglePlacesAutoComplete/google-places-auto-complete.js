import React from 'react'
import Select from 'react-select'
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService'

function GooglePlacesAutoComplete({
	disabled,
	value,
	onChange,
	placeholder = null,
}) {
	const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
		useGoogle({
			apiKey: 'AIzaSyB5Ah3pygC_FWu0WutJvOgPCL9rhk2Mrps',
			debounce: 1000,
			options: {
				componentRestrictions: {
					country: 'fr',
				},
			},
		})

	return (
		<Select
			name='_address'
			isLoading={isPlacePredictionsLoading}
			isClearable
			isSearchable
			value={value}
			placeholder={placeholder ?? ''}
			isDisabled={disabled}
			onChange={(place) => {
				onChange(place)
			}}
			onInputChange={(newValue) =>
				getPlacePredictions({ input: newValue })
			}
			loadingMessage={() => 'Chargement...'}
			noOptionsMessage={() => "Saisir l'adresse"}
			options={placePredictions.map((place) => {
				return {
					value: {
						place_id: place.place_id,
						description: place.description,
					},
					label: place.description,
				}
			})}
			styles={{
				control: (base) => ({
					...base,
					height: 50,
					minHeight: 50,
					border: 'none',
					borderRadius: '0.5rem',
					fontFamily: 'Montserrat',
				}),
			}}
		/>
	)
}

export default GooglePlacesAutoComplete
