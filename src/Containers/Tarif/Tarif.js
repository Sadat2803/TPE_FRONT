import * as XLSX from 'xlsx'

import React, { useEffect, useState } from 'react'

import LayoutAdmin from '../../Components/LayoutAdmin/LayoutAdmin'
import { createTarif } from '../../api/tarif'
import { setTarif } from '../../redux/tarif'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import { updateClient } from '../../api/clients'
import { updateProfile } from '../../redux/auth'

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time))
}

function Tarif(props) {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const user = useSelector((state) => state.auth.user)
	const [margin, setMargin] = useState(user?.margin ?? 0);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const readCell = (cellAddress, workBook) => {
		var first_sheet_name = workBook.SheetNames[0]
		var worksheet = workBook.Sheets[first_sheet_name]
		var desired_cell = worksheet[cellAddress]
		const value = desired_cell ? desired_cell.v : undefined

		return value
	}

	const loadFile = async (file, type) => {
		setLoading(true)

		const data = await file.arrayBuffer()
		const workBook = XLSX.read(data)

		let tarif = {
			TYPE: type
		}

		tarif.BREAK = {}

		tarif.BREAK.IMMEDIAT = Number(readCell('B2', workBook))
		tarif.BREAK.PLANIFIE = Number(readCell('C2', workBook))
		tarif.BREAK.TARIFS_PAR_ETAGE_ESCALIER = Number(readCell('D2', workBook))
		tarif.BREAK.TARIF_PAR_ETAGE_ASSENCEUR = Number(readCell('E2', workBook))
		tarif.BREAK.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS = Number(
			readCell('F2', workBook)
		)
		tarif.BREAK.FRIGORIFIQUE_EN_POURCENTAGE = Number(
			readCell('J2', workBook)
		)
		tarif.BREAK.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H = Number(
			readCell('H2', workBook)
		)
		tarif.BREAK.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM = Number(
			readCell('I2', workBook)
		)
		tarif.BREAK.TARIF_PAR_HEURE_DE_MISE_À_DISPO = Number(
			readCell('J2', workBook)
		)

		tarif.F12 = {}

		tarif.F12.IMMEDIAT = Number(readCell('B3', workBook))
		tarif.F12.PLANIFIE = Number(readCell('C3', workBook))
		tarif.F12.TARIFS_PAR_ETAGE_ESCALIER = Number(readCell('D3', workBook))
		tarif.F12.TARIF_PAR_ETAGE_ASSENCEUR = Number(readCell('E3', workBook))
		tarif.F12.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS = Number(
			readCell('F3', workBook)
		)
		tarif.F12.FRIGORIFIQUE_EN_POURCENTAGE = Number(readCell('J3', workBook))
		tarif.F12.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H = Number(
			readCell('H3', workBook)
		)
		tarif.F12.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM = Number(
			readCell('I3', workBook)
		)
		tarif.F12.TARIF_PAR_HEURE_DE_MISE_À_DISPO = Number(
			readCell('J3', workBook)
		)

		tarif.F14 = {}

		tarif.F14.IMMEDIAT = Number(readCell('B4', workBook))
		tarif.F14.PLANIFIE = Number(readCell('C4', workBook))
		tarif.F14.TARIFS_PAR_ETAGE_ESCALIER = Number(readCell('D4', workBook))
		tarif.F14.TARIF_PAR_ETAGE_ASSENCEUR = Number(readCell('E4', workBook))
		tarif.F14.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS = Number(
			readCell('F4', workBook)
		)
		tarif.F14.FRIGORIFIQUE_EN_POURCENTAGE = Number(readCell('J4', workBook))
		tarif.F14.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H = Number(
			readCell('H4', workBook)
		)
		tarif.F14.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM = Number(
			readCell('I4', workBook)
		)
		tarif.F14.TARIF_PAR_HEURE_DE_MISE_À_DISPO = Number(
			readCell('J4', workBook)
		)

		tarif.F20 = {}

		tarif.F20.IMMEDIAT = Number(readCell('B5', workBook))
		tarif.F20.PLANIFIE = Number(readCell('C5', workBook))
		tarif.F20.TARIFS_PAR_ETAGE_ESCALIER = Number(readCell('D5', workBook))
		tarif.F20.TARIF_PAR_ETAGE_ASSENCEUR = Number(readCell('E5', workBook))
		tarif.F20.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS = Number(
			readCell('F5', workBook)
		)
		tarif.F20.FRIGORIFIQUE_EN_POURCENTAGE = Number(readCell('J5', workBook))
		tarif.F20.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H = Number(
			readCell('H5', workBook)
		)
		tarif.F20.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM = Number(
			readCell('I5', workBook)
		)
		tarif.F20.TARIF_PAR_HEURE_DE_MISE_À_DISPO = Number(
			readCell('J5', workBook)
		)

		tarif.V7_5T = {}

		tarif.V7_5T.IMMEDIAT = Number(readCell('B6', workBook))
		tarif.V7_5T.PLANIFIE = Number(readCell('C6', workBook))
		tarif.V7_5T.TARIFS_PAR_ETAGE_ESCALIER = Number(readCell('D6', workBook))
		tarif.V7_5T.TARIF_PAR_ETAGE_ASSENCEUR = Number(readCell('E6', workBook))
		tarif.V7_5T.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS = Number(
			readCell('F6', workBook)
		)
		tarif.V7_5T.FRIGORIFIQUE_EN_POURCENTAGE = Number(
			readCell('J6', workBook)
		)
		tarif.V7_5T.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H = Number(
			readCell('H6', workBook)
		)
		tarif.V7_5T.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM = Number(
			readCell('I6', workBook)
		)
		tarif.V7_5T.TARIF_PAR_HEURE_DE_MISE_À_DISPO = Number(
			readCell('J6', workBook)
		)

		tarif.V12T = {}

		tarif.V12T.IMMEDIAT = Number(readCell('B7', workBook))
		tarif.V12T.PLANIFIE = Number(readCell('C7', workBook))
		tarif.V12T.TARIFS_PAR_ETAGE_ESCALIER = Number(readCell('D7', workBook))
		tarif.V12T.TARIF_PAR_ETAGE_ASSENCEUR = Number(readCell('E7', workBook))
		tarif.V12T.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS = Number(
			readCell('F7', workBook)
		)
		tarif.V12T.FRIGORIFIQUE_EN_POURCENTAGE = Number(
			readCell('J7', workBook)
		)
		tarif.V12T.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H = Number(
			readCell('H7', workBook)
		)
		tarif.V12T.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM = Number(
			readCell('I7', workBook)
		)
		tarif.V12T.TARIF_PAR_HEURE_DE_MISE_À_DISPO = Number(
			readCell('J7', workBook)
		)

		tarif.V19T = {}

		tarif.V19T.IMMEDIAT = Number(readCell('B8', workBook))
		tarif.V19T.PLANIFIE = Number(readCell('C8', workBook))
		tarif.V19T.TARIFS_PAR_ETAGE_ESCALIER = Number(readCell('D8', workBook))
		tarif.V19T.TARIF_PAR_ETAGE_ASSENCEUR = Number(readCell('E8', workBook))
		tarif.V19T.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS = Number(
			readCell('F8', workBook)
		)
		tarif.V19T.FRIGORIFIQUE_EN_POURCENTAGE = Number(
			readCell('J8', workBook)
		)
		tarif.V19T.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H = Number(
			readCell('H8', workBook)
		)
		tarif.V19T.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM = Number(
			readCell('I8', workBook)
		)
		tarif.V19T.TARIF_PAR_HEURE_DE_MISE_À_DISPO = Number(
			readCell('J8', workBook)
		)

		tarif.TRACTEUR = {}

		tarif.TRACTEUR.IMMEDIAT = Number(readCell('B9', workBook))
		tarif.TRACTEUR.PLANIFIE = Number(readCell('C9', workBook))
		tarif.TRACTEUR.TARIFS_PAR_ETAGE_ESCALIER = Number(
			readCell('D9', workBook)
		)
		tarif.TRACTEUR.TARIF_PAR_ETAGE_ASSENCEUR = Number(
			readCell('E9', workBook)
		)
		tarif.TRACTEUR.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS = Number(
			readCell('F9', workBook)
		)
		tarif.TRACTEUR.FRIGORIFIQUE_EN_POURCENTAGE = Number(
			readCell('J9', workBook)
		)
		tarif.TRACTEUR.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H = Number(
			readCell('H9', workBook)
		)
		tarif.TRACTEUR.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM = Number(
			readCell('I9', workBook)
		)
		tarif.TRACTEUR.TARIF_PAR_HEURE_DE_MISE_À_DISPO = Number(
			readCell('J9', workBook)
		)

		tarif.SEMI = {}

		tarif.SEMI.IMMEDIAT = Number(readCell('B10', workBook))
		tarif.SEMI.PLANIFIE = Number(readCell('C10', workBook))
		tarif.SEMI.TARIFS_PAR_ETAGE_ESCALIER = Number(readCell('D10', workBook))
		tarif.SEMI.TARIF_PAR_ETAGE_ASSENCEUR = Number(readCell('E10', workBook))
		tarif.SEMI.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS = Number(
			readCell('F10', workBook)
		)
		tarif.SEMI.FRIGORIFIQUE_EN_POURCENTAGE = Number(
			readCell('J10', workBook)
		)
		tarif.SEMI.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H = Number(
			readCell('H10', workBook)
		)
		tarif.SEMI.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM = Number(
			readCell('I10', workBook)
		)
		tarif.SEMI.TARIF_PAR_HEURE_DE_MISE_À_DISPO = Number(
			readCell('J10', workBook)
		)

		tarif.TRACTEUR_SEMI = {}

		tarif.TRACTEUR_SEMI.IMMEDIAT = Number(readCell('B11', workBook))
		tarif.TRACTEUR_SEMI.PLANIFIE = Number(readCell('C11', workBook))
		tarif.TRACTEUR_SEMI.TARIFS_PAR_ETAGE_ESCALIER = Number(
			readCell('D11', workBook)
		)
		tarif.TRACTEUR_SEMI.TARIF_PAR_ETAGE_ASSENCEUR = Number(
			readCell('E11', workBook)
		)
		tarif.TRACTEUR_SEMI.TARIFS_PAR_RIPPEUR_PAR_HEURE_EN_EUROS = Number(
			readCell('F11', workBook)
		)
		tarif.TRACTEUR_SEMI.FRIGORIFIQUE_EN_POURCENTAGE = Number(
			readCell('J11', workBook)
		)
		tarif.TRACTEUR_SEMI.TARIFS_EN_EUROS_POUR_200KM_JOURS_POUR_7H = Number(
			readCell('H11', workBook)
		)
		tarif.TRACTEUR_SEMI.TARIFS_EN_EUROS_DÉPACEMENT_AU_KM = Number(
			readCell('I11', workBook)
		)
		tarif.TRACTEUR_SEMI.TARIF_PAR_HEURE_DE_MISE_À_DISPO = Number(
			readCell('J11', workBook)
		)

		tarif.FACTURATION_HEURES_D_ATTENTE = Number(readCell('K2', workBook))

		tarif.FACTURATION_DEPASSEMENT_MISE_A_DISPO = Number(
			readCell('L2', workBook)
		)

		await sleep(3000)

		await createTarif(tarif)

		dispatch(setTarif(tarif))

		setLoading(false)

		return Promise.resolve()
	}

	return (
		<LayoutAdmin>
			<div
				style={{
					width: '100%',
					display: 'flex',
					//alignItems: 'center',
					//justifyContent: 'center',
					flexDirection: 'column',
					padding: '2rem',
					fontFamily: 'Montserrat',
				}}
			>
				<p>Charger fichier tarif</p>
				{loading && <progress />}
				<div>
					<label>
					pour courses à courses  
					 </label>{' '}
					<input
						id='fileSelect'
						type='file'
						disabled={loading}
						accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
						onChange={(e) => loadFile(e.target.files[0], 'MISEADISPO')}
					/>
				</div>
				<br/>
				<div>
					<label>
					pour mise à disposition 
					 </label>{' '}
					<input
						id='fileSelect'
						type='file'
						disabled={loading}
						accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
						onChange={(e) => loadFile(e.target.files[0], 'COURSEACOURSE')}
					/>
				</div>
				<br/>
				<div>
					<label>
					% de marge appliqué 
					 </label>{' '}
					<span style={{
							// background: '#50F5A9',
							border: '1px solid',
							borderBlockColor: 'grey',
							cursor: 'pointer',
							color: 'black',
							fontFamily: 'Montserrat',
							padding: '.5rem',
							borderRadius: 6,
					}} onClick={() => setModalIsOpen(true)}>{user.margin ?? 0}</span>
				</div>
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
						padding: '2rem',
					},
				}}
				contentLabel='Example Modal'
			>
				<div
					style={{
						width: '20rem',
						fontFamily: 'Montserrat',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 15,
						textAlign: 'center',
					}}
				>
					<div>Nouveau % de marge</div>

					<div
						style={{
							marginTop: 20,
							width: '100%',
						}}
					>
						<input
						id='marge'
						min="0"
						max="100"
						type='number'
						disabled={loading}
						value={margin}
						onChange={(e) => setMargin(e.target.value)}
					/>
					</div>

					<button
					    disabled={loading}

						onClick={async () => {
							// await attributionCommandesTransporter(
							// 	selected.map((c) => c._id),
							// 	selectedTransporter
							// )
							// history.push('/admin/plateforme/attribuer')
							setLoading(true);
							try {
								let res = await updateClient(user._id, {margin})
								dispatch(updateProfile(res))
							}catch(err) {
							} finally {
								setModalIsOpen(false)
								setLoading(false)
							}
						}}
						style={{
							padding: '1rem 1.5rem',
							background: '#50F5A9',
							border: 'none',
							cursor: 'pointer',
							color: 'white',
							borderRadius: 7,
							marginTop: 30,
							fontFamily: 'Montserrat',
						}}
					>
						{loading ? 'Loading' : 'Valider'}
					</button>
				</div>
			</Modal>


			</div>
			
		</LayoutAdmin>
	)
}

export default Tarif
