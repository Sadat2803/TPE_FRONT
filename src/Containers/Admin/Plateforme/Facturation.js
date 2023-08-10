import React, { useEffect, useState } from 'react'
import { deleteClient, getClients } from '../../../api/clients'

import DataTable from 'react-data-table-component'
import { GradientText } from '../../PasserCommande/PasserCommande.styles'
import LayoutAdmin from '../../../Components/LayoutAdmin/LayoutAdmin'
import Modal from 'react-modal'
import { getStats } from '../../../api/stats'
import moment from 'moment'
import { useHistory } from 'react-router'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function Facturation(props) {
	const history = useHistory()

	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [totalRows, setTotalRows] = useState(0)
	const [perPage, setPerPage] = useState(10)

	const [totalFactures, setTotalFactures] = useState(null)
	const [montantTotal, setMontantTotal] = useState(null)

	const [loadingStats, setLoadingStats] = useState(false)

	const [currentPage, setCurrentPage] = useState(1)

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

	const fetchStats = async () => {
		setLoadingStats(true)

		const res = await getStats()

		setTotalFactures(res.totalFactures)
		setMontantTotal(res.montantTotal)

		setLoadingStats(false)
	}

	useEffect(() => {
		fetchClients(1)

		fetchStats()
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
							history.push(
								`/admin/plateforme/facturation/${row._id}`
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
					{'Facturation'.toUpperCase()}
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
						justifyContent: 'center',
						alignItems: 'center',
						//background: 'blue',
					}}
				>
					<input
						style={{
							padding: '1rem',
							borderRadius: 5,
							border: '1px solid #E4EAF0',
							width: '35rem',
							//height: '4rem',
							marginRight: '1rem',
							fontFamily: 'Montserrat',
						}}
						placeholder='Rechercher par identifiant, date, montant'
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
							// marginTop: 20,
							// marginLeft: 20,
							fontFamily: 'Montserrat',
							fontWeight: 'bold',
							marginRight: '1rem',
						}}
					>
						Rechercher
					</button>

					<div
						style={{
							//background: 'red',
							width: '100%',
							padding: '1rem',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							border: 'solid .1rem black',
							borderRadius: '1rem',
							marginRight: '1rem',
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<span>Nombre de factures</span>
							<span
								style={{
									fontWeight: 'bold',
									fontSize: 20,
								}}
							>
								{totalFactures}
							</span>
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<span>Montant total</span>
							<span
								style={{
									fontWeight: 'bold',
									fontSize: 20,
								}}
							>
								{montantTotal}
							</span>
						</div>
					</div>

					{/* <button
						onClick={() => {}}
						style={{
							padding: '1rem 2rem',
							background: '#60d2f8',
							border: 'none',
							cursor: 'pointer',
							color: 'white',
							borderRadius: 7,
							fontFamily: 'Montserrat',
							fontWeight: 'bold',
							marginRight: '1rem',
						}}
					>
						Facturer
					</button>

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<button
							onClick={() => {}}
							style={{
								padding: '1rem 2rem',
								background: '#60d2f8',
								border: 'none',
								cursor: 'pointer',
								color: 'white',
								borderRadius: 7,
								fontFamily: 'Montserrat',
								fontWeight: 'bold',
								marginRight: '1rem',
								width: '14rem',
								marginBottom: '1rem',
							}}
						>
							Un groupe de facture
						</button>
						<button
							onClick={() => {}}
							style={{
								padding: '1rem 2rem',
								background: '#60d2f8',
								border: 'none',
								cursor: 'pointer',
								color: 'white',
								borderRadius: 7,
								fontFamily: 'Montserrat',
								fontWeight: 'bold',
								marginRight: '1rem',
								width: '14rem',
							}}
						>
							Facture du mois
						</button>
					</div> */}
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

export default Facturation
