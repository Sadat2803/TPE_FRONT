import React, { useEffect, useState } from 'react'
import { deleteClient, getClients } from '../../api/clients'

import DataTable from 'react-data-table-component'
import { GradientText } from '../PasserCommande/PasserCommande.styles'
import LayoutAdmin from '../../Components/LayoutAdmin/LayoutAdmin'
import Modal from 'react-modal'
import { fullTextSearchClients } from '../../api/search'
import moment from 'moment'
import { useHistory } from 'react-router'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function MesClients(props) {
	const history = useHistory()

	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [totalRows, setTotalRows] = useState(0)
	const [perPage, setPerPage] = useState(10)

	const [currentPage, setCurrentPage] = useState(1)

	const [searchQuery, setSearchQuery] = useState('')

	const fetchClients = async (page) => {
		setLoading(true)

		const res = await getClients(page, perPage)

		setData(res.docs)
		setTotalRows(res.totalDocs)
		setLoading(false)
	}

	const handlePageChange = (page) => {
		setCurrentPage(page)
		fetchClients(page)
	}

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true)

		const res = await getClients(page, newPerPage)

		setData(res.docs)
		setPerPage(newPerPage)
		setLoading(false)
	}

	useEffect(() => {
		fetchClients(1)
	}, [])

	const searchForClient = async (q) => {
		if (q.length === 0) {
			return
		}

		setLoading(true)

		const res = await fullTextSearchClients(q)
		setData(res.hits)
		setTotalRows(res.nbHits)
		setLoading(false)
	}

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
			name: 'Nom du client',
			selector: (row) => `${row.first_name} ${row.last_name}`,
			sortable: false,
		},
		{
			name: 'Type de compte',
			selector: (row) => (row.premium ? 'Premium' : ''),
			sortable: false,
		},
		{
			name: "Date d'inscription",
			selector: (row) => moment(row.createdAt).format('DD/MM/YYYY'),
			sortable: false,
		},
		{
			name: '% de réduction',
			selector: (row) => (row.reduction ? `${row.reduction}%` : ''),
			sortable: false,
		},
		{
			name: 'Status',
			selector: (row) => (row.suspendre ? 'Suspendu' : 'Activé'),
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
							history.push(`/admin/clients/${row._id}`)
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
					{'Mes clients'.toUpperCase()}
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
								searchForClient(searchQuery)
							}
						}}
						placeholder='Rechercher par nom client / societe'
						style={{
							padding: '1rem',
							borderRadius: 5,
							border: '1px solid #E4EAF0',
							width: '20rem',
							fontFamily: 'Montserrat',
						}}
					/>

					<button
						disabled={loading}
						onClick={() => searchForClient(searchQuery)}
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
							await fetchClients(currentPage)
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
						noDataComponent="Il n'y a pas des clients à afficher"
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

export default MesClients
