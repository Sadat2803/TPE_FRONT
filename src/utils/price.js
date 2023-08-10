import { atom } from 'jotai'

export const typeCommandeAtom = atom('course-a-course')
export const nbrJoursAtom = atom(0)
export const kiloJoursAtom = atom(0)
export const totalDistance = atom(0)
export const typeTransportAtom = atom(null)
export const temporisationAtom = atom(null)
export const typeEtageAtom = atom(null)
export const nombreEtagesAtom = atom(null)
export const rippeursAtom = atom(null)
export const rippeurHoursAtom = atom(null)
export const optionsPoidsLourdsAtom = atom(null)
export const optionsVehiculeLegerAtom = atom(null)
export const dispoHoursAtom = atom(1)

export function computePrice(
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
) {
	let _price = 0

	console.log('typeCommande', typeCommande)

	if (typeCommande === 'course-a-course') {
		switch (typeTransport) {
			case 'Break': {
				const distanceKM = distance / 1000
				const perKM =
					temporisation === 'planifie'
						? tarif.BREAK.PLANIFIE
						: tarif.BREAK.IMMEDIAT

				_price += distanceKM * perKM

				if (nombreEtages && nombreEtages > 0) {
					if (typeEtage === 'Escalier') {
						_price +=
							nombreEtages * tarif.BREAK.TARIFS_PAR_ETAGE_ESCALIER
					}

					if (typeEtage === 'Assenceur') {
						_price +=
							nombreEtages * tarif.BREAK.TARIF_PAR_ETAGE_ASSENCEUR
					}
				}

				if (rippeurs && rippeurHours) {
					_price +=
						Number(rippeurHours) *
						Number(rippeurs) *
						tarif.BREAK.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS
				}

				if (
					optionsVehiculeLeger &&
					optionsVehiculeLeger.includes('Frigorifique')
				) {
					_price +=
						distanceKM *
						perKM *
						(tarif.BREAK.FRIGORIFIQUE_EN_POURCENTAGE / 100)
				}

				break
			}

			case 'Fourgon 12m³': {
				const distanceKM = distance / 1000
				const perKM =
					temporisation === 'planifie'
						? tarif.F12.PLANIFIE
						: tarif.F12.IMMEDIAT

				_price += distanceKM * perKM

				if (nombreEtages && nombreEtages > 0) {
					if (typeEtage === 'Escalier') {
						_price +=
							nombreEtages * tarif.F12.TARIFS_PAR_ETAGE_ESCALIER
					}

					if (typeEtage === 'Assenceur') {
						_price +=
							nombreEtages * tarif.F12.TARIF_PAR_ETAGE_ASSENCEUR
					}
				}

				if (rippeurs && rippeurHours) {
					_price +=
						Number(rippeurHours) *
						Number(rippeurs) *
						tarif.F12.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS
				}

				if (
					optionsVehiculeLeger &&
					optionsVehiculeLeger.includes('Frigorifique')
				) {
					_price +=
						distanceKM *
						perKM *
						(tarif.F12.FRIGORIFIQUE_EN_POURCENTAGE / 100)
				}

				break
			}

			case 'Fourgon 14m³': {
				const distanceKM = distance / 1000
				const perKM =
					temporisation === 'planifie'
						? tarif.F14.PLANIFIE
						: tarif.F14.IMMEDIAT

				_price += distanceKM * perKM

				if (nombreEtages && nombreEtages > 0) {
					if (typeEtage === 'Escalier') {
						_price +=
							nombreEtages * tarif.F14.TARIFS_PAR_ETAGE_ESCALIER
					}

					if (typeEtage === 'Assenceur') {
						_price +=
							nombreEtages * tarif.F14.TARIF_PAR_ETAGE_ASSENCEUR
					}
				}

				if (rippeurs && rippeurHours) {
					_price +=
						Number(rippeurHours) *
						Number(rippeurs) *
						tarif.F14.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS
				}

				if (
					optionsVehiculeLeger &&
					optionsVehiculeLeger.includes('Frigorifique')
				) {
					_price +=
						distanceKM *
						perKM *
						(tarif.F14.FRIGORIFIQUE_EN_POURCENTAGE / 100)
				}

				break
			}

			case 'Camion 20m³': {
				const distanceKM = distance / 1000
				const perKM =
					temporisation === 'planifie'
						? tarif.F20.PLANIFIE
						: tarif.F20.IMMEDIAT

				_price += distanceKM * perKM

				if (nombreEtages && nombreEtages > 0) {
					if (typeEtage === 'Escalier') {
						_price +=
							nombreEtages * tarif.F20.TARIFS_PAR_ETAGE_ESCALIER
					}

					if (typeEtage === 'Assenceur') {
						_price +=
							nombreEtages * tarif.F20.TARIF_PAR_ETAGE_ASSENCEUR
					}
				}

				if (rippeurs && rippeurHours) {
					_price +=
						Number(rippeurHours) *
						Number(rippeurs) *
						tarif.F20.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS
				}

				if (
					optionsVehiculeLeger &&
					optionsVehiculeLeger.includes('Frigorifique')
				) {
					_price +=
						distanceKM *
						perKM *
						(tarif.F20.FRIGORIFIQUE_EN_POURCENTAGE / 100)
				}

				break
			}

			case '7,5 Tonnes': {
				const distanceKM = distance / 1000
				const perKM =
					temporisation === 'planifie'
						? tarif.V7_5T.PLANIFIE
						: tarif.V7_5T.IMMEDIAT

				_price += distanceKM * perKM

				if (nombreEtages && nombreEtages > 0) {
					if (typeEtage === 'Escalier') {
						_price +=
							nombreEtages * tarif.V7_5T.TARIFS_PAR_ETAGE_ESCALIER
					}

					if (typeEtage === 'Assenceur') {
						_price +=
							nombreEtages * tarif.V7_5T.TARIF_PAR_ETAGE_ASSENCEUR
					}
				}

				if (rippeurs && rippeurHours) {
					_price +=
						Number(rippeurHours) *
						Number(rippeurs) *
						tarif.V7_5T.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS
				}

				if (
					optionsPoidsLourds &&
					optionsPoidsLourds.includes('Frigorifique')
				) {
					_price +=
						distanceKM *
						perKM *
						(tarif.V7_5T.FRIGORIFIQUE_EN_POURCENTAGE / 100)
				}

				break
			}

			case '12 Tonnes': {
				const distanceKM = distance / 1000
				const perKM =
					temporisation === 'planifie'
						? tarif.V12T.PLANIFIE
						: tarif.V12T.IMMEDIAT

				_price += distanceKM * perKM

				if (nombreEtages && nombreEtages > 0) {
					if (typeEtage === 'Escalier') {
						_price +=
							nombreEtages * tarif.V12T.TARIFS_PAR_ETAGE_ESCALIER
					}

					if (typeEtage === 'Assenceur') {
						_price +=
							nombreEtages * tarif.V12T.TARIF_PAR_ETAGE_ASSENCEUR
					}
				}

				if (rippeurs && rippeurHours) {
					_price +=
						Number(rippeurHours) *
						Number(rippeurs) *
						tarif.V12T.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS
				}

				if (
					optionsPoidsLourds &&
					optionsPoidsLourds.includes('Frigorifique')
				) {
					_price +=
						distanceKM *
						perKM *
						(tarif.V12T.FRIGORIFIQUE_EN_POURCENTAGE / 100)
				}

				break
			}

			case '19 Tonnes': {
				const distanceKM = distance / 1000
				const perKM =
					temporisation === 'planifie'
						? tarif.V19T.PLANIFIE
						: tarif.V19T.IMMEDIAT

				_price += distanceKM * perKM

				if (nombreEtages && nombreEtages > 0) {
					if (typeEtage === 'Escalier') {
						_price +=
							nombreEtages * tarif.V19T.TARIFS_PAR_ETAGE_ESCALIER
					}

					if (typeEtage === 'Assenceur') {
						_price +=
							nombreEtages * tarif.V19T.TARIF_PAR_ETAGE_ASSENCEUR
					}
				}

				if (rippeurs && rippeurHours) {
					_price +=
						Number(rippeurHours) *
						Number(rippeurs) *
						tarif.V19T.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS
				}

				if (
					optionsPoidsLourds &&
					optionsPoidsLourds.includes('Frigorifique')
				) {
					_price +=
						distanceKM *
						perKM *
						(tarif.V19T.FRIGORIFIQUE_EN_POURCENTAGE / 100)
				}

				break
			}

			case 'Tracteur': {
				const distanceKM = distance / 1000
				const perKM =
					temporisation === 'planifie'
						? tarif.TRACTEUR.PLANIFIE
						: tarif.TRACTEUR.IMMEDIAT

				_price += distanceKM * perKM

				if (nombreEtages && nombreEtages > 0) {
					if (typeEtage === 'Escalier') {
						_price +=
							nombreEtages *
							tarif.TRACTEUR.TARIFS_PAR_ETAGE_ESCALIER
					}

					if (typeEtage === 'Assenceur') {
						_price +=
							nombreEtages *
							tarif.TRACTEUR.TARIF_PAR_ETAGE_ASSENCEUR
					}
				}

				if (rippeurs && rippeurHours) {
					_price +=
						Number(rippeurHours) *
						Number(rippeurs) *
						tarif.TRACTEUR.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS
				}

				if (
					optionsPoidsLourds &&
					optionsPoidsLourds.includes('Frigorifique')
				) {
					_price +=
						distanceKM *
						perKM *
						(tarif.TRACTEUR.FRIGORIFIQUE_EN_POURCENTAGE / 100)
				}

				break
			}

			case 'Semi': {
				const distanceKM = distance / 1000
				const perKM =
					temporisation === 'planifie'
						? tarif.SEMI.PLANIFIE
						: tarif.SEMI.IMMEDIAT

				_price += distanceKM * perKM

				if (nombreEtages && nombreEtages > 0) {
					if (typeEtage === 'Escalier') {
						_price +=
							nombreEtages * tarif.SEMI.TARIFS_PAR_ETAGE_ESCALIER
					}

					if (typeEtage === 'Assenceur') {
						_price +=
							nombreEtages * tarif.SEMI.TARIF_PAR_ETAGE_ASSENCEUR
					}
				}

				if (rippeurs && rippeurHours) {
					_price +=
						Number(rippeurHours) *
						Number(rippeurs) *
						tarif.SEMI.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS
				}

				if (
					optionsPoidsLourds &&
					optionsPoidsLourds.includes('Frigorifique')
				) {
					_price +=
						distanceKM *
						perKM *
						(tarif.SEMI.FRIGORIFIQUE_EN_POURCENTAGE / 100)
				}

				break
			}

			case 'Tracteur+semi': {
				const distanceKM = distance / 1000
				const perKM =
					temporisation === 'planifie'
						? tarif.TRACTEUR_SEMI.PLANIFIE
						: tarif.TRACTEUR_SEMI.IMMEDIAT

				_price += distanceKM * perKM

				if (nombreEtages && nombreEtages > 0) {
					if (typeEtage === 'Escalier') {
						_price +=
							nombreEtages *
							tarif.TRACTEUR_SEMI.TARIFS_PAR_ETAGE_ESCALIER
					}

					if (typeEtage === 'Assenceur') {
						_price +=
							nombreEtages *
							tarif.TRACTEUR_SEMI.TARIF_PAR_ETAGE_ASSENCEUR
					}
				}

				if (rippeurs && rippeurHours) {
					_price +=
						Number(rippeurHours) *
						Number(rippeurs) *
						tarif.TRACTEUR_SEMI
							.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS
				}

				if (
					optionsPoidsLourds &&
					optionsPoidsLourds.includes('Frigorifique')
				) {
					_price +=
						distanceKM *
						perKM *
						(tarif.TRACTEUR_SEMI.FRIGORIFIQUE_EN_POURCENTAGE / 100)
				}

				break
			}

			default:
				break
		}
	} else {
		console.log('nbrJours', nbrJours)
		console.log('kiloJours', kiloJours)

		const distanceKM = Number(nbrJours) * Number(kiloJours)

		switch (typeTransport) {
			case 'Break': {
				if (distanceKM <= 200) {
					_price =
						tarif.BREAK.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H
				} else {
					_price =
						tarif.BREAK.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H +
						(distance % 200) *
							tarif.BREAK.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM
				}

				console.log(_price)

				if (dispoHours && dispoHours > 0) {
					_price = _price +=
						dispoHours * tarif.BREAK.TARIF_PAR_HEURE_DE_MISE_À_DISPO
					console.log(_price)
				}

				break
			}

			case 'Fourgon 12m³': {
				if (distanceKM <= 200) {
					_price = tarif.F12.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H
				} else {
					_price =
						tarif.F12.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H +
						(distance % 200) *
							tarif.F12.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM
				}

				if (dispoHours && dispoHours > 0) {
					_price = _price +=
						dispoHours * tarif.F12.TARIF_PAR_HEURE_DE_MISE_À_DISPO
				}

				break
			}

			case 'Fourgon 14m³': {
				if (distanceKM <= 200) {
					_price = tarif.F14.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H
				} else {
					_price =
						tarif.F14.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H +
						(distance % 200) *
							tarif.F14.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM
				}

				if (dispoHours && dispoHours > 0) {
					_price = _price +=
						dispoHours * tarif.F14.TARIF_PAR_HEURE_DE_MISE_À_DISPO
				}

				break
			}

			case 'Camion 20m³': {
				if (distanceKM <= 200) {
					_price = tarif.F20.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H
				} else {
					_price =
						tarif.F20.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H +
						(distance % 200) *
							tarif.F20.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM
				}

				if (dispoHours && dispoHours > 0) {
					_price = _price +=
						dispoHours * tarif.F20.TARIF_PAR_HEURE_DE_MISE_À_DISPO
				}

				break
			}

			case '7,5 Tonnes': {
				if (distanceKM <= 200) {
					_price =
						tarif.V7_5T.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H
				} else {
					_price =
						tarif.V7_5T.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H +
						(distance % 200) *
							tarif.V7_5T.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM
				}

				if (dispoHours && dispoHours > 0) {
					_price = _price +=
						dispoHours * tarif.V7_5T.TARIF_PAR_HEURE_DE_MISE_À_DISPO
				}

				break
			}

			case '12 Tonnes': {
				if (distanceKM <= 200) {
					_price = tarif.V12T.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H
				} else {
					_price =
						tarif.V12T.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H +
						(distance % 200) *
							tarif.V12T.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM
				}

				if (dispoHours && dispoHours > 0) {
					_price = _price +=
						dispoHours * tarif.V12T.TARIF_PAR_HEURE_DE_MISE_À_DISPO
				}

				break
			}

			case '19 Tonnes': {
				if (distanceKM <= 200) {
					_price = tarif.V19T.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H
				} else {
					_price =
						tarif.V19T.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H +
						(distance % 200) *
							tarif.V19T.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM
				}

				if (dispoHours && dispoHours > 0) {
					_price = _price +=
						dispoHours * tarif.V19T.TARIF_PAR_HEURE_DE_MISE_À_DISPO
				}

				break
			}

			case 'Tracteur': {
				if (distanceKM <= 200) {
					_price =
						tarif.TRACTEUR.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H
				} else {
					_price =
						tarif.TRACTEUR
							.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H +
						(distance % 200) *
							tarif.TRACTEUR.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM
				}

				if (dispoHours && dispoHours > 0) {
					_price = _price +=
						dispoHours *
						tarif.TRACTEUR.TARIF_PAR_HEURE_DE_MISE_À_DISPO
				}

				break
			}

			case 'Semi': {
				if (distanceKM <= 200) {
					_price = tarif.SEMI.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H
				} else {
					_price =
						tarif.SEMI.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H +
						(distance % 200) *
							tarif.SEMI.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM
				}

				if (dispoHours && dispoHours > 0) {
					_price = _price +=
						dispoHours * tarif.SEMI.TARIF_PAR_HEURE_DE_MISE_À_DISPO
				}

				break
			}

			case 'Tracteur+semi': {
				if (distanceKM <= 200) {
					_price =
						tarif.TRACTEUR_SEMI
							.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H
				} else {
					_price =
						tarif.TRACTEUR_SEMI
							.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H +
						(distance % 200) *
							tarif.TRACTEUR_SEMI.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM
				}

				if (dispoHours && dispoHours > 0) {
					_price = _price +=
						dispoHours *
						tarif.TRACTEUR_SEMI.TARIF_PAR_HEURE_DE_MISE_À_DISPO
				}

				break
			}

			default:
				break
		}
	}

	return _price
}
