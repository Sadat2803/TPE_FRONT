import React, { useEffect, useState } from 'react'
import { deleteClient, getClients } from '../../../api/clients'
import {
	deleteCommande,
	getAllCommandesByClientId
} from '../../../api/commande'
import { getStats, getStatsForSingleClient } from '../../../api/stats'
import { useHistory, useParams } from 'react-router'

import DataTable from 'react-data-table-component'
import EditTransportStatus from '../../../Components/EditTransportStatus/EditTransportStatus'
import { GradientText } from '../../PasserCommande/PasserCommande.styles'
import LayoutAdmin from '../../../Components/LayoutAdmin/LayoutAdmin'
import Modal from 'react-modal'
import { PUBLIC } from '../../../api/base'
import { getInvoice } from '../../../api/invoice'
import moment from 'moment'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const PAYMENT_STATUS_OPTIONS = [
	{
		label: 'A facturer',
		value: 'a-facturer',
	},
	{
		label: 'En attente',
		value: 'en-attente',
	},
	{
		label: 'Payé',
		value: 'paye',
	},
	{
		label: 'Défault',
		value: 'default',
	},
]

function SingleClientFacturation(props) {
	const history = useHistory()

	const { id } = useParams()

	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [totalRows, setTotalRows] = useState(0)
	const [perPage, setPerPage] = useState(10)

	const [selected, setSelected] = useState([])

	const [totalFactures, setTotalFactures] = useState(null)
	const [montantTotal, setMontantTotal] = useState(null)

	const [loadingStats, setLoadingStats] = useState(false)

	const [modalIsOpen, setModalIsOpen] = useState(false)

	const [currentPage, setCurrentPage] = useState(1)

	const [pdfLoading, setPdfLoading] = useState(false)

	const [editModalIsOpen, setEditModalIsOpen] = useState(false)
	const [selectedTransport, setSelectedTransport] = useState(null)

	const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
	const [deleteCommandeLoading, setDeleteCommandeLoading] = useState(false)
	const [selectedCommandeToDelete, setSelectedCommandeToDelete] =
		useState(null)

	const getCommandeForClient = async (id) => {
		setLoading(true)

		const res = await getAllCommandesByClientId(id)

		setData(res.docs)
		setTotalRows(res.totalDocs)
		setLoading(false)
	}

	// const fetchClients = async (page) => {
	// 	setLoading(true)

	// 	const res = await getClients(page, perPage)

	// 	setData(res.docs)
	// 	setTotalRows(res.totalDocs)
	// 	setLoading(false)
	// }

	const handlePageChange = (page) => {
		setCurrentPage(page)
		getCommandeForClient(id)
	}

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true)

		const res = await getAllCommandesByClientId(id)

		setData(res.docs)
		setPerPage(newPerPage)
		setLoading(false)
	}

	const fetchStats = async () => {
		setLoadingStats(true)

		const res = await getStatsForSingleClient(id)

		setTotalFactures(res.totalFactures)
		setMontantTotal(res.montantTotal)

		setLoadingStats(false)
	}

	useEffect(() => {
		getCommandeForClient(id)

		fetchStats()
	}, [])

	const columns = [
		{
			name: 'ID',
			selector: (row) => row._id,
			sortable: false,
		},
		{
			name: 'Nom du client',
			selector: (row) => `${row.clientID.societe}`,
			sortable: false,
		},
		{
			name: 'Date de la commande',
			selector: (row) => `${moment(row.createdAt).format('DD/MM/YYYY')}`,
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
						{row.type_commande == 'course-a-course'
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
			name: 'Montant du transport',
			selector: (row) => row.prix,
			sortable: false,
		},
		{
			name: 'Type du compte',
			selector: (row) => (row.clientID.premium ? 'Premium' : 'Standard'),
			sortable: false,
		},
		{
			name: '% de réduction',
			selector: (row) =>
				row.clientID.reduction ? `${row.reduction}%` : '',
			sortable: false,
		},
		{
			name: 'Status',
			selector: (row) =>
				PAYMENT_STATUS_OPTIONS.find(
					(item) => item.value === row.paymentStatus
				)?.label ?? 'Défault',
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
							setSelectedTransport(row)
							setEditModalIsOpen(true)
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
						onClick={() => {
							setSelectedCommandeToDelete(row)
							setDeleteModalIsOpen(true)
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

					<button
						onClick={() => {
							setModalIsOpen(true)
						}}
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
						noDataComponent='pas de commandes à afficher'
						progressComponent='Chargement'
						selectableRows
						onSelectedRowsChange={(state) => {
							setSelected(state.selectedRows)
						}}
						paginationComponentOptions={{
							rowsPerPageText: 'Rangs par page',
							rangeSeparatorText: 'sur',
						}}
					/>
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
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<button
							onClick={async () => {
								if (selected.length === 0) {
									alert('Il faut séléctionner des commandes')
									return
								}

								setPdfLoading(true)

								const data = await getInvoice(
									'select',
									id,
									selected
								)

								window.open(`${PUBLIC}/${data.invoice}.pdf`)

								setPdfLoading(false)
							}}
							disabled={pdfLoading}
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
							{pdfLoading ? 'Chargement' : 'Un groupe de facture'}
						</button>
						<button
							onClick={async () => {
								// if (selected.length === 0) {
								// 	alert('Il faut séléctionner des commandes')
								// 	return
								// }

								setPdfLoading(true)

								const data = await getInvoice(
									'select',
									id,
									selected
								)

								window.open(`${PUBLIC}/${data.invoice}.pdf`)

								setPdfLoading(false)
							}}
							disabled={pdfLoading}
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
							{pdfLoading ? 'Chargement' : 'Facture du mois'}
						</button>
					</div>
				</Modal>

				<Modal
					isOpen={deleteModalIsOpen}
					onRequestClose={() => setDeleteModalIsOpen(false)}
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
					contentLabel=''
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<p style={{ fontFamily: 'Montserrat' }}>
							Êtes-vous sûr de vouloir supprimer ?
						</p>
						<button
							onClick={async () => {
								if (!selectedCommandeToDelete) {
									return
								}

								setDeleteCommandeLoading(true)

								await deleteCommande(
									selectedCommandeToDelete._id
								)

								await getCommandeForClient(id)

								await fetchStats()

								setDeleteCommandeLoading(false)
								setDeleteModalIsOpen(false)
							}}
							disabled={deleteCommandeLoading}
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
								width: '100%',
								marginBottom: '1rem',
							}}
						>
							{deleteCommandeLoading ? 'Chargement' : 'OK'}
						</button>
					</div>
				</Modal>

				{selectedTransport && (
					<EditTransportStatus
						modalIsOpen={editModalIsOpen}
						setModalIsOpen={setEditModalIsOpen}
						transport={selectedTransport}
						onSuccess={async () => {
							getCommandeForClient(id)

							fetchStats()
						}}
					/>
				)}
			</div>
		</LayoutAdmin>
	)
}

export default SingleClientFacturation
