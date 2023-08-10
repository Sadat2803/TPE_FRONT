import React, { useEffect, useState } from 'react'
import {
	attributionCommandesTransporter,
	deleteCommande,
	deleteManyCommandes,
	getCommandesPaginated,
	getCommandesWithAnomalies,
	getCommandesWithTransporter,
} from '../../../api/commande'
import { deleteClient, getClients } from '../../../api/clients'
import {
	searchCommandesByClientAndTransporter,
	searchCommandesByDate,
	searchCommandesByPrixMinMax,
} from '../../../api/search'

import DataTable from 'react-data-table-component'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { GradientText } from '../../PasserCommande/PasserCommande.styles'
import LayoutAdmin from '../../../Components/LayoutAdmin/LayoutAdmin'
import Modal from 'react-modal'
import { PUBLIC } from '../../../api/base'
import Select from 'react-select'
import { getTransporteurs } from '../../../api/transporteurs'
import moment from 'moment'
import { useHistory } from 'react-router'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function AnomalieTransport(props) {
	const history = useHistory()

	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [totalRows, setTotalRows] = useState(0)
	const [perPage, setPerPage] = useState(10)
	const [currentPage, setCurrentPage] = useState(1)
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [transporters, setTransporters] = useState([])
	const [selected, setSelected] = useState([])
	const [selectedTransporter, setSelectedTransporter] = useState(null)

	const [searchCriteria, setSearchCriteria] = useState('ct')
	const [range, setRange] = useState([new Date(), new Date()])
	const [searchQuery, setSearchQuery] = useState('')
	const [min, setMin] = useState(0)
	const [max, setMax] = useState(300)

	const fetchCommandes = async (page) => {
		setLoading(true)

		const res = await getCommandesWithAnomalies(page, perPage)

		setData(res.docs)
		setTotalRows(res.totalDocs)
		setLoading(false)
	}

	const handlePageChange = (page) => {
		setCurrentPage(page)
		fetchCommandes(page)
	}

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true)

		const res = await getCommandesWithAnomalies(page, newPerPage)

		setData(res.docs)
		setPerPage(newPerPage)
		setLoading(false)
	}

	const fetchTransporters = async () => {
		// TODO change this
		const res = await getCommandesWithAnomalies(1, 50)
		setTransporters(res.docs)
	}

	useEffect(() => {
		fetchCommandes(1)
		fetchTransporters()
	}, [])

	const columns = [
		{
			name: 'ID',
			selector: (row) => row.__id,
			width: '110px',
			sortable: false,
		},
		{
			name: 'Date du transport',
			selector: (row) => (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<span
						style={{
							fontWeight: 'bold',
							color: '#51C7F2',
							marginBottom: 3,
						}}
					>
						{row.type_commande === 'course-a-course'
							? 'Course à course'
							: 'Mise à disposition'}
					</span>
					<span>
						{moment(row.absolute_start_date).format('DD/MM/YYYY')}
					</span>
				</div>
			),
			width: '150px',
			sortable: false,
		},
		{
			name: 'Destination',
			selector: (row) => {
				if (row.type_commande === 'mise-a-disposition') {
					return row?.adresse_fin?.label
				}

				if (row.type_commande === 'course-a-course') {
					return [...row.courses].pop()?.adresse_fin?.label
				}
			},
			sortable: false,
		},
		{
			name: 'Heure',
			selector: (row) => {
				if (row.type_commande === 'mise-a-disposition') {
					return row.heure_debut
				}

				if (row.type_commande === 'course-a-course') {
					let $t = row.courses[0]
					return (<div
								style={{ display: 'flex', flexDirection: 'column', justifyContent:'space-evenly' }}
								>
								<span>{$t.heure_debut}</span>
								<span>{$t.heure_fin}</span>
							</div>)
				}
			},
			sortable: false,
		},
		{
			name: 'Statut',
			cell: (row) => (
				<div
					style={{
						//padding: '0.5rem 2rem',
						display: 'flex',
						flexDirection: 'column',
						color: '#838EAB',
						fontSize: 13,
						borderRadius: 5,
						margin: '1rem 0 1rem 0',
					}}
				>
					<span
						onClick={async () => {
							// await updateStatutCommande(commande._id, 'en-cours')
							// setStatut('en-cours')
						}}
						style={{
							padding: '0.3rem 0.7rem',
							background:
								row.statut === 'en-cours'
									? '#C752B6'
									: '#838EAB',
							color:
								row.statut === 'en-cours' ? 'white' : '#9EA8BF',
							borderRadius: 50,
							fontWeight: 'bold',
							marginBottom: 5,
							fontSize: 10,
							cursor: 'pointer',
						}}
					>
						En cours
					</span>

					<span
						onClick={() => {
							history.push(
								`/admin/transports/${row._id}/signaler`
							)
						}}
						style={{
							padding: '0.3rem 0.7rem',
							background: row?.signaler ? '#FCC200' : '#838EAB',
							color: row?.signaler ? 'white' : '#9EA8BF',
							cursor: 'pointer',
							borderRadius: 50,
							fontWeight: 'bold',
							marginBottom: 5,
							fontSize: 10,
						}}
					>
						Signaler {row?.signaler && `+${row.signalement_count}`}
					</span>

					<span
						onClick={async () => {
							// await updateStatutCommande(commande._id, 'terminer')
							// setStatut('terminer')
						}}
						style={{
							padding: '0.3rem 0.7rem',
							background:
								row.statut === 'terminer'
									? '#0FD39E'
									: '#838EAB',
							color:
								row.statut === 'terminer' ? 'white' : '#9EA8BF',
							borderRadius: 50,
							fontWeight: 'bold',
							fontSize: 10,
							cursor: 'pointer',
						}}
					>
						Terminer
					</span>
				</div>
			),
			sortable: false,
			width: '120px',
		},
		{
			name: 'Type de transport',
			selector: (row) => {
				if (row.type_commande === 'mise-a-disposition') {
					return 'Mise a disposition'
				}

				if (row.type_commande === 'course-a-course') {
					return [...row.courses].pop()?.type
				}
			},
			sortable: false,
		},
		{
			name: 'Montant',
			selector: (row) =>  (
				<div
					style={{ display: 'flex', flexDirection: 'column', justifyContent:'space-evenly' }}
				>
					<span>{row.prix}€</span>
					<span>{(row.prix - (row.prix * (row.margin ?? 0)) / 100).toFixed(2)}</span>
				</div>
			),
			sortable: false,
		},
		{
			name: 'Type de véhicule',
			selector: (row) => {
				return (
					<span
						style={{
							marginRight: 15,
							display: 'flex',
							flexDirection: 'column',
							width: 100,
							padding: '1rem 0 1rem 0',
						}}
					>
						{row.type_transport == 'Poids lourds' ? (
							<>
								<span
									style={{
										marginBottom: 10,
									}}
								>
									{row.type_transport}
								</span>
								{row.options_poids_lourds.map((item) => (
									<span key={item}>{item}</span>
								))}
							</>
						) : (
							<>
								<span>{row.type_transport}</span>
								<span
									style={{
										marginBottom: 10,
									}}
								>
									{row.type_transport_details}
								</span>

								{row.options_vehicule_leger.map((item) => (
									<span key={item}>{item}</span>
								))}
							</>
						)}
					</span>
				)
			},
			sortable: false,
			width: '150px',
		},
		{
			name: 'Transporteur',
			cell: (row) => (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
						}}
					>
						<img
							style={{
								width: '2rem',
								height: '2rem',
								borderRadius: '1rem',
								marginRight: 10,
							}}
							src={
								row.transporterID && row.transporterID.logo
									? `${PUBLIC}/${row.transporterID.logo.name}`
									: 'https://secure.gravatar.com/avatar/6ee7af2da22737fd49ce56adc226d2cb?size=200&d=mp'
							}
							alt=''
						/>
						<span>{row?.transporterID?.societe}</span>
					</div>
					<button
						style={{
							cursor: 'pointer',
							fontFamily: 'Montserrat',
							// background: '#ECC9F7',
							// color: '#AB1CC5',
							background: row?.recu ? '#FCC200' : '#838EAB',
							color: row?.recu ? 'white' : '#9EA8BF',
							border: 'none',
							fontWeight: 'bold',
							padding: '0.3rem 1rem',
							borderRadius: 4,
						}}
					>
						Reçu
					</button>
				</div>
			),
			sortable: false,
		},
		{
			name: 'Client',
			cell: (row) => (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<img
						style={{
							width: '2rem',
							height: '2rem',
							borderRadius: '1rem',
							marginRight: 10,
						}}
						src={
							row.clientID && row.clientID.logo
								? `${PUBLIC}/${row.clientID.logo.name}`
								: 'https://secure.gravatar.com/avatar/6ee7af2da22737fd49ce56adc226d2cb?size=200&d=mp'
						}
						alt=''
					/>
					<span>{row?.clientID?.societe}</span>
				</div>
			),
			sortable: false,
		},
		{
			name: 'Actions',
			button: true,
			cell: (row) => (
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<div
						onClick={() => {
							history.push(
								`/admin/plateforme/commandes/${row._id}`
							)
						}}
						style={{
							cursor: 'pointer',
						}}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='21.75'
							height='27.466'
							viewBox='0 0 21.75 27.466'
						>
							<g
								id='Group_11097'
								data-name='Group 11097'
								transform='translate(-10999.709 -6280)'
							>
								<path
									id='Path_11755'
									data-name='Path 11755'
									d='M11013.243,6280l8.216,8.216-12.913,12.914h-8.837v-8.244Z'
									fill='#b4b4c3'
								/>
								<path
									id='Path_11756'
									data-name='Path 11756'
									d='M10999.709,6306.466h20.784'
									fill='none'
									stroke='#e7e7eb'
									strokeWidth='2'
								/>
							</g>
						</svg>
					</div>

					<div style={{ width: 10 }} />

					<div
						onClick={async () => {
							//await deleteClient(row._id)
							await deleteCommande(row._id)
							await fetchCommandes(currentPage)
						}}
						style={{
							cursor: 'pointer',
						}}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='21.694'
							height='26.43'
							viewBox='0 0 21.694 26.43'
						>
							<g
								id='Group_11098'
								data-name='Group 11098'
								transform='translate(-11052.168 -6281.57)'
							>
								<path
									id='Rectangle_4434'
									data-name='Rectangle 4434'
									d='M0,0H17a1,1,0,0,1,1,1V17a3,3,0,0,1-3,3H3a3,3,0,0,1-3-3V0A0,0,0,0,1,0,0Z'
									transform='translate(11054 6288)'
									fill='#b4b4c3'
								/>
								<path
									id='Path_11757'
									data-name='Path 11757'
									d='M11081.736,6283.418h-7.568v2.032h21.694v-2.032h-7.8v-1.848h-6.324Z'
									transform='translate(-22)'
									fill='#e7e7eb'
								/>
							</g>
						</svg>
					</div>
				</div>
			),
		},
	]

	return (
		<LayoutAdmin>
			<div
				style={{
					//height: '80vh',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					paddingTop: '2rem',
					paddingBottom: '4rem',
					fontFamily: 'Montserrat',
				}}
			>
				<GradientText marginTop={'0'}>
					{'Anomalie Transports'.toUpperCase()}
				</GradientText>

				<div
					style={{
						width: '100%',
						fontFamily: 'Montserrat',
						paddingLeft: '1rem',
						paddingRight: '1rem',
						marginBottom: '2rem',
						marginTop: '1rem',
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<div
						style={{
							width: '350px',
							fontFamily: 'Montserrat',
							marginRight: '1rem',
						}}
					>
						<Select
							isSearchable={false}
							options={[
								{
									value: 'ct',
									label: 'Nom Client / Nom transporteur',
								},
								{ value: 'prix', label: 'Prix' },
								{ value: 'date', label: 'Date' },
							]}
							styles={{
								option: (provided, state) => ({
									...provided,
									fontFamily: 'Montserrat',
								}),
								control: (provided, state) => ({
									...provided,
									height: '3rem',
									minHeight: 'fit-content',
								}),
								valueContainer: (base) => ({
									...base,
									maxHeight: '3rem',
								}),
							}}
							defaultValue={{
								value: 'ct',
								label: 'Nom Client / Nom transporteur',
							}}
							onChange={(x) => setSearchCriteria(x.value)}
							menuPortalTarget={document.querySelector('body')}
						/>
					</div>

					{searchCriteria === 'ct' ? (
						<input
							style={{
								padding: '0.4rem',
								borderRadius: 5,
								border: '1px solid #E4EAF0',
								height: '3rem',
								width: '20rem',
								fontFamily: 'Montserrat',
							}}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder='Recherche'
						/>
					) : null}

					{searchCriteria === 'prix' ? (
						<>
							<input
								type='number'
								style={{
									padding: '0.4rem',
									borderRadius: 5,
									border: '1px solid #E4EAF0',
									height: '3rem',
									width: '20rem',
									fontFamily: 'Montserrat',
									marginRight: '1rem',
								}}
								value={min}
								onChange={(e) => {
									setMin(Number(e.target.value))
								}}
								placeholder='Prix min'
							/>
							<input
								type='number'
								style={{
									padding: '0.4rem',
									borderRadius: 5,
									border: '1px solid #E4EAF0',
									height: '3rem',
									width: '20rem',
									fontFamily: 'Montserrat',
								}}
								value={max}
								onChange={(e) => {
									setMax(Number(e.target.value))
								}}
								placeholder='Prix max'
							/>
						</>
					) : null}

					{searchCriteria === 'date' ? (
						<DateRangePicker onChange={setRange} value={range} />
					) : null}

					<button
						onClick={async () => {
							if (
								searchCriteria === 'ct' &&
								searchQuery.length === 0
							) {
								return
							}

							//await fetchCommandes(currentPage)

							let res

							if (searchCriteria === 'ct') {
								res =
									await searchCommandesByClientAndTransporter(
										searchQuery
									)
							}

							if (searchCriteria === 'prix') {
								res = await searchCommandesByPrixMinMax(
									min,
									max
								)
							}

							if (searchCriteria === 'date') {
								let minDate = moment(range[0]).unix()
								let maxDate = moment(range[1]).unix()

								res = await searchCommandesByDate(
									minDate,
									maxDate
								)
							}

							setData(res?.hits)
						}}
						style={{
							padding: '0.6rem 1rem',
							height: '3rem',
							background: '#C9D5F7',
							border: 'none',
							cursor: 'pointer',
							color: '#1C63C5',
							borderRadius: 7,
							//marginTop: 20,
							marginLeft: '1rem',
							fontFamily: 'Montserrat',
							fontWeight: 'bold',
						}}
					>
						Rechercher
					</button>

					<button
						onClick={async () => {
							await fetchCommandes(currentPage)
						}}
						style={{
							padding: '0.6rem 1rem',
							height: '3rem',
							background: '#C9D5F7',
							border: 'none',
							cursor: 'pointer',
							color: '#1C63C5',
							borderRadius: 7,
							//marginTop: 20,
							marginLeft: '1rem',
							fontFamily: 'Montserrat',
							fontWeight: 'bold',
						}}
					>
						Effacer
					</button>

					<button
						onClick={async () => {
							if (selected.length === 0) {
								alert('Il faut séléctionner des commandes')
								return
							}

							await deleteManyCommandes(
								selected.map((c) => c._id)
							)

							fetchCommandes(currentPage)
						}}
						style={{
							background: '#F7CDC9',
							color: '#C5431C',
							padding: '0.6rem 1rem',
							height: '3rem',
							border: 'none',
							cursor: 'pointer',
							borderRadius: 7,
							//marginTop: 20,
							marginLeft: '1rem',
							fontFamily: 'Montserrat',
							fontWeight: 'bold',
						}}
					>
						Supprimer
					</button>
				</div>
				<div
					style={{
						width: '100%',
						padding: '0 1rem',
					}}
				>
					<DataTable
						columns={columns}
						data={data}
						progressPending={loading}
						pagination
						paginationServer
						paginationTotalRows={totalRows}
						onChangeRowsPerPage={handlePerRowsChange}
						onChangePage={handlePageChange}
						selectableRows
						onSelectedRowsChange={(state) => {
							setSelected(state.selectedRows)
						}}
						noDataComponent="Il n'y a pas des commandes à afficher"
						progressComponent='Chargement'
						paginationComponentOptions={{
							rowsPerPageText: 'Rangs par page',
							rangeSeparatorText: 'sur',
						}}
					/>
				</div>
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
					<div>Attribuer le transport à un Transporteur</div>

					<div
						style={{
							marginTop: 20,
							width: '100%',
						}}
					>
						<Select
							options={transporters.map((t) => ({
								value: t._id,
								label: `${t.societe}`,
							}))}
							styles={{
								option: (provided, state) => ({
									...provided,
									fontFamily: 'Montserrat',
								}),
							}}
							onChange={(x) => setSelectedTransporter(x.value)}
							menuPortalTarget={document.querySelector('body')}
						/>
					</div>

					<button
						onClick={async () => {
							await attributionCommandesTransporter(
								selected.map((c) => c._id),
								selectedTransporter
							)
							history.push('/admin/plateforme/attribuer')
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
						Valider
					</button>
				</div>
			</Modal>
		</LayoutAdmin>
	)
}

export default AnomalieTransport
