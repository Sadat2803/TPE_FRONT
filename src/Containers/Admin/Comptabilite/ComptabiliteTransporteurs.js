import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Modal from 'react-modal'
import { useHistory } from 'react-router'
import {
	deleteTransporter,
	getTransporteurs,
	getComptabiliteTransporteurs,
} from '../../../api/transporteurs'
import LayoutAdmin from '../../../Components/LayoutAdmin/LayoutAdmin'
import { GradientText } from '../../PasserCommande/PasserCommande.styles'

Modal.setAppElement('#root')

function ComptabiliteTransporteurs(props) {
	const history = useHistory()

	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [totalRows, setTotalRows] = useState(0)
	const [perPage, setPerPage] = useState(8)

	const [currentPage, setCurrentPage] = useState(0)

	const [totalPrix, setTotalPrix] = useState(0)

	const fetchTransporteurs = async (page) => {
		setLoading(true)

		const res = await getComptabiliteTransporteurs(page, perPage)

		setData(res.docs)
		setTotalRows(res.totalDocs)
		setTotalPrix(res.totalPrix)
		setLoading(false)
	}

	const handlePageChange = (page) => {
		setCurrentPage(page)
		fetchTransporteurs(page)
	}

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true)

		const res = await getComptabiliteTransporteurs(page, newPerPage)

		setData(res.docs)
		setPerPage(newPerPage)
		setLoading(false)
	}

	useEffect(() => {
		fetchTransporteurs(1)
	}, [])

	const columns = [
		{
			name: 'ID',
			selector: (row) => row._id,
			sortable: false,
		},
		{
			name: 'Nom du Transporteur',
			selector: (row) => `${row.first_name} ${row.last_name}`,
			sortable: false,
		},
		{
			name: 'Montant total',
			selector: (row) => `${row.totalSpent}€`,
			sortable: false,
		},
		{
			name: "Date d'inscription",
			selector: (row) => moment(row.createdAt).format('DD/MM/YYYY'),
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

					<div style={{ width: 10 }} />

					<div
						onClick={async () => {
							await deleteTransporter(row._id)
							await fetchTransporteurs(currentPage)
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
					{'Comptabilité transporteurs '.toUpperCase()}
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
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<div>
						<input
							style={{
								padding: '1rem',
								borderRadius: 5,
								border: '1px solid #E4EAF0',
								width: '15rem',
								fontFamily: 'Montserrat',
							}}
							placeholder='Rechercher par nom'
						/>
						<button
							onClick={() => {}}
							style={{
								padding: '1rem 2rem',
								background: '#50F5A9',
								border: 'none',
								cursor: 'pointer',
								color: 'white',
								borderRadius: 7,
								//marginTop: 20,
								marginLeft: 20,
								fontFamily: 'Montserrat',
								fontWeight: 'bold',
							}}
						>
							Rechercher
						</button>
					</div>

					<div
						style={{
							background: '#838EAB',
							padding: '1rem 2rem',
							display: 'flex',
							alignItems: 'center',
							color: 'white',
							borderRadius: 10,
						}}
					>
						<span>Total:</span>
						<span style={{ width: '2rem' }} />
						<span style={{ fontWeight: 'bold' }}>{totalPrix}€</span>
					</div>
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

export default ComptabiliteTransporteurs
