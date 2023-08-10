import { GradientText, SubText } from '../PasserCommande/PasserCommande.styles'
import React, { useEffect, useRef, useState } from 'react'
import {
	computePrice,
	dispoHoursAtom,
	nombreEtagesAtom,
	optionsPoidsLourdsAtom,
	optionsVehiculeLegerAtom,
	rippeurHoursAtom,
	rippeursAtom,
	temporisationAtom,
	totalDistance,
	typeCommandeAtom,
	typeEtageAtom,
	typeTransportAtom,
} from '../../utils/price'
import { useDispatch, useSelector } from 'react-redux'

import CommandeForm from '../../Components/CommandeForm'
import CommonHeader from '../../Components/CommonHeader/common-header.component'
import Footer from '../../Components/Footer/footer.component'
import Numbro from 'numbro'
import { setCommande } from '../../redux/commande'
import toast from 'react-hot-toast'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useLocation } from 'react-router-dom'

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

function PublicPasserCommande(props) {
	const query = useQuery()
	const history = useHistory()
	const dispatch = useDispatch()
	const { watch, reset } = useForm()

	const type_transport = useRef()
	type_transport.current = watch('type_transport', '')

	useEffect(() => {
		reset({
			type_commande: query.get('type_commande'),
			temporisation: query.get('temporisation'),
		})

		setTypeCommande(query.get('type_commande'))
		setTemporisation(query.get('temporisation'))
	}, [])

	const [price, setPrice] = useState(0)
	const tarif = useSelector((state) => state.tarif.tarif)

	// Pricing Atoms
	const [typeCommande, setTypeCommande] = useAtom(typeCommandeAtom)
	const [distance, setDistance] = useAtom(totalDistance)
	const [typeTransport, setTypeTransport] = useAtom(typeTransportAtom)
	const [temporisation, setTemporisation] = useAtom(temporisationAtom)
	const [typeEtage, setTypeEtage] = useAtom(typeEtageAtom)
	const [nombreEtages, setNombreEtages] = useAtom(nombreEtagesAtom)
	const [rippeurHours, setRippeurHours] = useAtom(rippeurHoursAtom)
	const [rippeurs, setRippeurs] = useAtom(rippeursAtom)
	const [optionsPoidsLourds, setOptionsPoidsLourds] = useAtom(
		optionsPoidsLourdsAtom
	)
	const [optionsVehiculeLeger, setOptionsVehiculeLeger] = useAtom(
		optionsVehiculeLegerAtom
	)
	const [dispoHours, setDispoHours] = useAtom(dispoHoursAtom)

	useEffect(() => {
		if (!typeTransport) return
		if (!distance) return
		if (!temporisation) return

		let _price = computePrice(
			tarif,
			typeCommande,
			typeTransport,
			distance,
			temporisation,
			nombreEtages,
			typeEtage,
			rippeurs,
			rippeurHours,
			optionsVehiculeLeger,
			optionsPoidsLourds,
			dispoHours
		)

		setPrice(_price.toFixed(2))
	}, [
		typeCommande,
		distance,
		typeTransport,
		temporisation,
		typeEtage,
		nombreEtages,
		rippeurs,
		rippeurHours,
		optionsPoidsLourds,
		optionsVehiculeLeger,
		dispoHours,
		tarif,
	])

	const onSubmit = async (data) => {
		try {
			delete data.accept
			data.price = price
			data.distance = distance
			dispatch(setCommande({ ...data }))
			history.push(`/client/signup?cid=true`)
		} catch (error) {
			console.log(error)
		}
	}

	const onError = (errors, e) => {
		if (errors.accept) {
			toast(
				"Vous devez accepter les conditions d'utilisation de la Plateforme du Transport pour continuer !",
				{
					duration: 3000,
					style: {
						fontFamily: 'Montserrat',
					},
				}
			)
		}
	}

	return (
		<div>
			<CommonHeader />
			<div
				style={{
					//height: '80vh',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					fontFamily: 'Montserrat',
				}}
			>
				<GradientText>PASSER COMMANDE</GradientText>
				<SubText>
					Ici vous pouvez commander un transport selon les critéres
					proposés, votre commande sera pris en charge
				</SubText>

				<div
					style={{
						padding: '1rem 1rem',
						background: '#838EAB',
						color: 'white',
						fontFamily: 'Montserrat',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'fixed',
						top: 250,
						right: 50,
						borderRadius: '0.5rem',
						fontSize: 20,
						zIndex: 999,
					}}
				>
					<span>Distance</span>
					<span style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
						{distance / 1000} km
					</span>
					<span>Prix</span>
					<span style={{ fontWeight: 'bold' }}>
						{Numbro(price).formatCurrency({
							currencySymbol: '€',
							currencyPosition: 'postfix',
							mantissa: 2,
						})}{' '}
						ht
					</span>
				</div>

				<CommandeForm
					onSubmit={onSubmit}
					onError={onError}
					preloadForm
					preloadData={{
						type_commande: query.get('type_commande'),
						temporisation: query.get('temporisation'),
						courses: [],
					}}
					keepFilesAsObjects
					submitButtonText='Créer un compte client pour commander ce transport'
				/>
			</div>
			<Footer />
		</div>
	)
}

export default PublicPasserCommande
