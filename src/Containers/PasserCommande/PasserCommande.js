import { GradientText, SubText, Wrapper } from './PasserCommande.styles'
import React, { useEffect, useState } from 'react'
import {
	computePrice,
	dispoHoursAtom,
	kiloJoursAtom,
	nbrJoursAtom,
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
import Container from '../../Components/LayoutClient/container.component'
import Modal from 'react-modal'
import Numbro from 'numbro'
import { createCommande } from '../../api/commande'
import { deleteCommande } from '../../redux/commande'
import { getInvoiceForOneCommande } from '../../api/invoice'
import moment from 'moment'
import toast from 'react-hot-toast'
import { useAtom } from 'jotai'
import { useHistory } from 'react-router'
import { useLocation } from 'react-router-dom'

Numbro.setLanguage('fr-FR')

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function PasserCommande() {
	const history = useHistory()
	const query = useQuery()
	const dispatch = useDispatch()
	const user = useSelector((state) => state.auth.user)
	const commande = useSelector((state) => state.commande.commande)
	const tarif = useSelector((state) => state.tarif.tarif)
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [price, setPrice] = useState(0)

	const [loading, setLoading] = useState(false)

	// Pricing Atoms
	const [typeCommande, setTypeCommande] = useAtom(typeCommandeAtom)
	const [distance, setDistance] = useAtom(totalDistance)
	const [prixAvecReduction, setPrixAvecReduction] = useState(null);

	const [nbrJours, seNbrJours] = useAtom(nbrJoursAtom)
	const [kiloJours, setKiloJours] = useAtom(kiloJoursAtom)

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

	const preloadForm = query.get('cid')

	console.log(tarif)
	//console.log(tarif.$12T.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H)

	useEffect(() => {
		if (preloadForm) {
			if (commande.distance) {
				setDistance(commande.distance)
			}

			if (commande.price) {
				setPrice(commande.price)
			}
		}
	}, [preloadForm])

	useEffect(() => {
		console.group()
		console.log(nbrJours)
		console.log(kiloJours)
		console.groupEnd()

		if (typeCommande === 'mise-a-disposition' && nbrJours && kiloJours) {
			setDistance(Number(nbrJours) * Number(kiloJours) * 1000)
		}

		if (!typeTransport) return

		if (!temporisation) return

		if (typeCommande === 'course-a-course' && !distance) {
			return
		}

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
			dispoHours,
			nbrJours,
			kiloJours
		)

		setPrice(_price.toFixed(2))
		if(user?.reduction) {
			let nouveauPrix = price - (price * performance.reduction)/100  
			setPrixAvecReduction(nouveauPrix)
		}

		console.groupEnd()
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
		nbrJours,
		kiloJours,
	])

	const IsValidCourseInterval = (course = {}) => {
		const [heure_debut, minute_debut] = course.heure_debut.split(':')
		const [heure_fin, minute_fin] = course.heure_fin.split(':')
		const [year_debut, month_debut, day_debut] = moment(course.date_debut).format('YYYY,MM,DD').split(',').map(Number)
		const [year_fin, month_fin, day_fin] = moment(course.date_fin).format('YYYY,MM,DD').split(',').map(Number)
		return new Date(year_fin,month_fin,day_fin,heure_fin,minute_fin,0)  >  new Date(year_debut,month_debut,day_debut,heure_debut,minute_debut,0)
	}
	const onSubmit = async (data) => {
		setLoading(true)
		try {
			delete data.accept

			if (data.type_commande === 'mise-a-disposition' && !IsValidCourseInterval({heure_debut: data.heure_debut, heure_fin: data.heure_fin, date_debut:data.debut, date_fin: data.fin}) ) { 
				    setLoading(false);
					setModalIsOpen(true)
					return;
			}

			let absolute_start_date
			if (data.type_commande === 'mise-a-disposition') {
				absolute_start_date = data.debut
				delete data.courses
			} else {
				const orderedCourses = data.courses.sort(
					(a, b) =>
						Date.parse(a.date_transport) -
						Date.parse(b.date_transport)
				)

				absolute_start_date = orderedCourses[0].date_transport
			}

			if (data.type_commande === 'mise-a-disposition') {
				const nb_jours = moment(data.fin).diff(
					moment(data.debut),
					'days'
				)

				data.nb_jours = nb_jours
			}

			const IsCoursesIntervalValid = data.courses?.every(IsValidCourseInterval)
			if (data.type_commande !== 'mise-a-disposition' &&  !IsCoursesIntervalValid) { 
				setLoading(false);
				setModalIsOpen(true);
				return;
			}


			if (preloadForm) {
				if (data.type_commande === 'mise-a-disposition') {
					if (data.files) {
						data.files = data.files.map((file) => file.id)
					}
				} else {
					for (const course of data.courses) {
						if (course.files) {
							course.files = course.files.map((file) => file.id)
						}
					}
				}
			}
			
			if (data.type_commande === 'mise-a-disposition') {
				data.debut = moment(data.debut).format('DD/MM/YYYY');
				data.fin = moment(data.fin).format('DD/MM/YYYY');
				data.heure_debut = moment(data.heure_debut).format('HH:mm');
				data.heure_fin = moment(data.heure_fin).format('HH:mm');
				
			 } else {
			   data.courses[0].date_debut = moment(data.courses[0].date_debut).format('DD/MM/YYYY');
			   data.courses[0].date_fin = moment(data.courses[0].date_fin).format('DD/MM/YYYY');
			   data.courses[0].heure_debut = moment(data.courses[0].heure_debut).format('HH:mm');
			   data.courses[0].heure_fin = moment(data.courses[0].heure_fin).format('HH:mm');
			   for (let i = 1; i < data.courses.length; i++) {
				 data.courses[i].date  = moment(data.courses[i].date).format('DD/MM/YYYY');
				 data.courses[i].heure = moment(data.courses[0].heure).format('HH:mm');
			   }
			 }

			const res = await createCommande({
				...data,
				prix: price,
				statut: 'init',
				clientID: user._id,
				absolute_start_date,
			})

			console.log(res)

			if (preloadForm) {
				dispatch(deleteCommande())
			}

			await getInvoiceForOneCommande(user._id, res._id)

			history.push(`/commandes/${res._id}/pay`)

			//setModalIsOpen(true)
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	const onError = (errors, e) => {
		console.log(errors)
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
		<Container>
			<Wrapper>
				<GradientText>PASSER COMMANDE</GradientText>
				<SubText>
					Ici vous pouvez commander un transport selon les critéres
					proposés, votre commande sera pris en charge
				</SubText>

				<div
					style={{
						position: 'fixed',
						top: 250,
						right: 50,
						zIndex: 999,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
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

							borderRadius: '0.5rem',
							fontSize: 20,
						}}
					>
						<span>Distance</span>
						<span
							style={{ fontWeight: 'bold', marginBottom: '1rem' }}
						>
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
						{!!user?.reduction && (
						<><span>Prix avec remise</span>
						<span style={{ fontWeight: 'bold' }}>
							{Numbro(prixAvecReduction ?? 0).formatCurrency({
								currencySymbol: '€',
								currencyPosition: 'postfix',
								mantissa: 2,
							})}{' '}
							ht
						</span></>) }
					</div>
				</div>

				<CommandeForm
					onSubmit={onSubmit}
					onError={onError}
					preloadForm={preloadForm}
					preloadData={commande}
					submitButtonText={user.premium ? 'Commander' : 'Commander et payer'}
					loading={loading}
				/>
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
					L'heure de livraison ne doit pas être egal ou inférieure à l'heure de chargement. La date de livraison ne doit pas être inférieure à la date de chargement!
					</div>

					<button
						onClick={() => setModalIsOpen(false)}
						style={{
							padding: '0.5rem 1rem',
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

export default PasserCommande
