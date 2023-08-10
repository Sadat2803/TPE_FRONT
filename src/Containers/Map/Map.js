import React, { useEffect, useRef, useState } from 'react'
import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { fullTextSearchChauffeurs, geoSearchChauffeurs } from '../../api/search'
import { getDatabase, off, onValue, ref } from 'firebase/database'

import { CustomInput } from '../RegisterTransporter/style'
import GooglePlacesAutoComplete from '../../Components/GooglePlacesAutoComplete/google-places-auto-complete'
import LayoutAdmin from '../../Components/LayoutAdmin/LayoutAdmin'
import _ from 'lodash'
import { createCustomEqual } from 'fast-equals'
import { initializeApp } from 'firebase/app'
import { isLatLngLiteral } from '@googlemaps/typescript-guards'
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService'

const firebaseConfig = {
	apiKey: 'AIzaSyCATBtqyaYddznWWpwUnOwM5hDuiPjF4kw',
	authDomain: 'tpe-tracking.firebaseapp.com',
	databaseURL:
		'https://tpe-tracking-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'tpe-tracking',
	storageBucket: 'tpe-tracking.appspot.com',
	messagingSenderId: '937200804094',
	appId: '1:937200804094:web:6b1f356d4d0ae75ac245af',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get a reference to the database service
const database = getDatabase(app)

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
	if (
		isLatLngLiteral(a) ||
		a instanceof window.google.maps.LatLng ||
		isLatLngLiteral(b) ||
		b instanceof window.google.maps.LatLng
	) {
		return new window.google.maps.LatLng(a).equals(
			new window.google.maps.LatLng(b)
		)
	}

	return deepEqual(a, b)
})

function useDeepCompareMemoize(value) {
	const ref = React.useRef()

	if (!deepCompareEqualsForMaps(value, ref.current)) {
		ref.current = value
	}

	return ref.current
}

function useDeepCompareEffectForMaps(callback, dependencies) {
	React.useEffect(callback, dependencies.map(useDeepCompareMemoize))
}

function GoogleMap({ center, zoom, children }) {
	const ref = useRef()
	const [map, setMap] = React.useState()

	useEffect(() => {
		if (ref.current && !map) {
			setMap(new window.google.maps.Map(ref.current, {}))
		}
	}, [ref, map])

	// because React does not do deep comparisons, a custom hook is used
	// see discussion in https://github.com/googlemaps/js-samples/issues/946
	useDeepCompareEffectForMaps(() => {
		if (map) {
			map.setOptions({ center, zoom })
		}
	}, [map, center, zoom])

	return (
		<div
			ref={ref}
			id='map'
			style={{
				width: '100%',
				height: '100%',
			}}
		>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					// set the map prop on the child component
					return React.cloneElement(child, { map })
				}
			})}
		</div>
	)
}

const Marker = (options) => {
	const [marker, setMarker] = useState()

	useEffect(() => {
		if (!marker) {
			setMarker(
				new window.google.maps.Marker({
					animation: window.google.maps.Animation.DROP,
				})
			)
		}

		// remove marker from map on unmount
		return () => {
			if (marker) {
				marker.setMap(null)
			}
		}
	}, [marker])

	useEffect(() => {
		if (marker) {
			marker.setOptions(options)
		}
	}, [marker, options])

	return null
}

function Map(props) {
	const zoom = 12

	const [center, setCenter] = useState({ lat: 48.864, lng: 2.318 })

	const [chauffeurs, setChauffeurs] = useState([])

	const [place, setPlace] = useState(null)

	const [radius, setRadius] = useState(1000)

	const [q, setQ] = useState('')

	const [loading, setLoading] = useState(false)

	const [locationFilter, setLocationFilter] = useState(null)

	const { placesService } = useGoogle({
		apiKey: 'AIzaSyB5Ah3pygC_FWu0WutJvOgPCL9rhk2Mrps',
		debounce: 1000,
		options: {
			componentRestrictions: {
				country: 'fr',
			},
		},
	})

	useEffect(() => {
		const unsub = onValue(ref(database, '/chauffeurs'), (snapshot) => {
			setChauffeurs(_.toArray(snapshot.val()))
		})

		return () => unsub()
	}, [])

	const render = (status) => {
		if (status === Status.LOADING) return <h3>{status} ..</h3>
		if (status === Status.FAILURE) return <h3>{status} ...</h3>
		return null
	}

	const getLatLngFromPlaceId = async (place_id) => {
		return new Promise((resolve, reject) => {
			placesService.getDetails(
				{
					placeId: place_id,
					fields: ['geometry.location'],
				},
				(place) => {
					resolve({
						lat: place.geometry.location.lat(),
						lng: place.geometry.location.lng(),
					})
				}
			)
		})
	}

	const search = async () => {
		setLoading(true)

		const place_id = place.value.place_id
		const location = await getLatLngFromPlaceId(place_id)

		const users = await geoSearchChauffeurs(
			location.lat,
			location.lng,
			radius
		)

		setCenter({
			lat: location.lat,
			lng: location.lng,
		})

		setLocationFilter(users.hits.map((u) => u.id))

		setLoading(false)
	}

	const searchWithQ = async () => {
		if (q.length === 0) {
			return
		}

		setLoading(true)

		const users = await fullTextSearchChauffeurs(q)

		if (users.hits.length > 0) {
			setCenter({
				lat: users.hits[0]._geo.lat,
				lng: users.hits[0]._geo.lng,
			})

			setLocationFilter(users.hits.map((u) => u.id))
		}

		setLoading(false)
	}

	return (
		<LayoutAdmin>
			<Wrapper
				apiKey='AIzaSyB5Ah3pygC_FWu0WutJvOgPCL9rhk2Mrps'
				render={render}
				libraries={['places']}
			>
				<div
					style={{
						width: '100%',
						background: 'whitesmoke',
						padding: '1rem',
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<div
						style={{
							width: '50%',
							fontFamily: 'Montserrat',
						}}
					>
						<GooglePlacesAutoComplete
							value={place}
							onChange={(place) => setPlace(place)}
							placeholder={"Saisissez l'adresse"}
						/>
					</div>

					<div style={{ width: '1rem' }} />

					<CustomInput
						width={'50%'}
						type='number'
						min={0}
						value={radius}
						onChange={(e) => setRadius(parseFloat(e.target.value))}
					/>

					<div style={{ width: '1rem' }} />

					<button
						disabled={loading}
						onClick={search}
						style={{
							background: '#50F5A9',
							border: 'none',
							cursor: loading ? 'wait' : 'pointer',
							color: 'white',
							fontFamily: 'Montserrat',
							padding: '1rem 2rem',
							borderRadius: 6,
						}}
					>
						Rechercher
					</button>
				</div>

				<div
					style={{
						width: '100%',
						background: 'whitesmoke',
						padding: '1rem',
						paddingTop: 0,
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<CustomInput
						width={'100%'}
						type='text'
						placeholder='Nom, prenom, societe'
						value={q}
						onChange={(e) => setQ(e.target.value)}
					/>

					<div style={{ width: '1rem' }} />

					<button
						disabled={loading}
						onClick={searchWithQ}
						style={{
							background: '#50F5A9',
							border: 'none',
							cursor: loading ? 'wait' : 'pointer',
							color: 'white',
							fontFamily: 'Montserrat',
							padding: '1rem 2rem',
							borderRadius: 6,
						}}
					>
						Rechercher
					</button>
				</div>
				<GoogleMap center={center} zoom={zoom}>
					{chauffeurs
						.filter((ch) => {
							if (locationFilter) {
								return locationFilter.includes(ch._id)
							} else {
								return true
							}
						})
						.map((ch) => (
							<Marker
								key={ch._id}
								position={{
									lat: ch.lat,
									lng: ch.lng,
								}}
							/>
						))}
				</GoogleMap>
			</Wrapper>
		</LayoutAdmin>
	)
}

export default Map
