import React, { useEffect, useState } from 'react'
import {
	deleteTransporter,
	getNewTransporters,
	getTransporteurs,
	updateTransporterStatus,
} from '../../../api/transporteurs'

import DataTable from 'react-data-table-component'
import { GradientText } from '../../PasserCommande/PasserCommande.styles'
import LayoutAdmin from '../../../Components/LayoutAdmin/LayoutAdmin'
import Modal from 'react-modal'
import { fullTextSearchNewTransporteurs } from '../../../api/search'
import moment from 'moment'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function NouveauxTransporteurs(props) {
	const history = useHistory()

	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [totalRows, setTotalRows] = useState(0)
	const [perPage, setPerPage] = useState(10)

	const [currentPage, setCurrentPage] = useState(1)

	const [loadingStatusUpdate, setLoadingStatusUpdate] = useState(false)

	const [searchQuery, setSearchQuery] = useState('')

	const fetchTransporteurs = async (page) => {
		setLoading(true)

		const res = await getNewTransporters(page, perPage)

		setData(res.docs)
		setTotalRows(res.totalDocs)
		setLoading(false)
	}

	const handlePageChange = (page) => {
		setCurrentPage(page)
		fetchTransporteurs(page)
	}

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true)

		const res = await getTransporteurs(page, newPerPage)

		setData(res.docs)
		setPerPage(newPerPage)
		setLoading(false)
	}

	const searchForNewTransporteurs = async (q) => {
		if (q.length === 0) {
			return
		}

		setLoading(true)

		const res = await fullTextSearchNewTransporteurs(q)
		setData(res.hits)
		setTotalRows(res.nbHits)
		setLoading(false)
	}

	useEffect(() => {
		fetchTransporteurs(1)
	}, [])

	const columns = [
		{
			name: 'ID',
			selector: (row) => row.__id.match(/.{1,3}/g).join(' '),
			sortable: false,
		},
		{
			name: 'Nom société',
			selector: (row) => `${row.societe}`,
			sortable: false,
		},
		{
			name: 'Nom du transporteur',
			selector: (row) => `${row.first_name} ${row.last_name}`,
			sortable: false,
		},
		{
			name: 'Status',
			selector: (row) => 'En attente',
			sortable: false,
		},
		{
			name: "Date d'inscription",
			selector: (row) => moment(row.createdAt).format('DD/MM/YYYY'),
			sortable: false,
		},
		{
			name: 'Ajouter aux transporteurs',
			button: true,
			width: '200px',
			cell: (row) => (
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<button
						disabled={loadingStatusUpdate}
						onClick={async () => {
							setLoadingStatusUpdate(true)

							await toast.promise(
								updateTransporterStatus(row._id, 'ok'),
								{
									loading: (
										<b style={{ fontFamily: 'Montserrat' }}>
											En cours
										</b>
									),
									success: (
										<b style={{ fontFamily: 'Montserrat' }}>
											Enregistré!
										</b>
									),
									error: (
										<b style={{ fontFamily: 'Montserrat' }}>
											Impossible d'enregistrer
										</b>
									),
								}
							)

							await fetchTransporteurs(currentPage)

							setLoadingStatusUpdate(false)
						}}
						style={{
							background: '#C9F7F5',
							color: '#1CC5BD',
							fontFamily: 'Montserrat',
							border: 'none',
							cursor: 'pointer',
							padding: '0.5rem 1rem',
							borderRadius: 5,
							fontWeight: 'bold',
							marginRight: 10,
						}}
					>
						Valider
					</button>
					<button
						disabled={loadingStatusUpdate}
						onClick={async () => {
							setLoadingStatusUpdate(true)

							await toast.promise(
								updateTransporterStatus(row._id, 'ko'),
								{
									loading: (
										<b style={{ fontFamily: 'Montserrat' }}>
											En cours
										</b>
									),
									success: (
										<b style={{ fontFamily: 'Montserrat' }}>
											Enregistré!
										</b>
									),
									error: (
										<b style={{ fontFamily: 'Montserrat' }}>
											Impossible d'enregistrer
										</b>
									),
								}
							)

							await fetchTransporteurs(currentPage)

							setLoadingStatusUpdate(false)
						}}
						style={{
							background: '#F7CDC9',
							color: '#C5431C',
							fontFamily: 'Montserrat',
							border: 'none',
							cursor: 'pointer',
							padding: '0.5rem 1rem',
							borderRadius: 5,
							fontWeight: 'bold',
							marginRight: 10,
						}}
					>
						Refuser
					</button>
				</div>
			),
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
							history.push(`/admin/transporters/${row._id}`)
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
					{'Nouveaux Transporteurs'.toUpperCase()}
				</GradientText>

				<div
					style={{
						width: '100%',
						fontFamily: 'Montserrat',
						paddingLeft: '1rem',
						paddingRight: '1rem',
						marginBottom: '2rem',
						marginTop: '1rem',
					}}
				>
					<input
						disabled={loading}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								searchForNewTransporteurs(searchQuery)
							}
						}}
						placeholder='Rechercher par nom transporteur / societe'
						style={{
							padding: '1rem',
							borderRadius: 5,
							border: '1px solid #E4EAF0',
							width: '22rem',
							fontFamily: 'Montserrat',
						}}
					/>
					<button
						disabled={loading}
						onClick={() => searchForNewTransporteurs(searchQuery)}
						style={{
							padding: '1rem 2rem',
							background: '#50F5A9',
							border: 'none',
							cursor: 'pointer',
							color: 'white',
							borderRadius: 7,
							marginTop: 20,
							marginLeft: 20,
							fontFamily: 'Montserrat',
							fontWeight: 'bold',
						}}
					>
						Rechercher
					</button>
					<button
						onClick={async () => {
							await fetchTransporteurs(currentPage)
							setSearchQuery('')
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
						noDataComponent="Il n'y a pas des transporteurs à afficher"
						progressComponent='Chargement'
						paginationComponentOptions={{
							rowsPerPageText: 'Rangs par page',
							rangeSeparatorText: 'sur',
						}}
					/>
				</div>
			</div>
		</LayoutAdmin>
	)
}

export default NouveauxTransporteurs
