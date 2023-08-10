import React, { useEffect, useState } from 'react'

import { GradientText } from '../PasserCommande/PasserCommande.styles'
import LayoutTransporter from '../../Components/LayoutTransporter/LayoutTransporter'
import Modal from 'react-modal'
import UltimatePaginationBasic from '../../Components/Pagination/Pagination'
import { getChauffeursByTransporter } from '../../api/chauffeurs'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const SIZE = 4

function ListChauffeurs(props) {
	const history = useHistory()
	const [chauffeurs, setChauffeurs] = useState([])
	const [page, setPage] = useState(1)
	const [total, setTotal] = useState(1)

	const transporter = useSelector((state) => state.auth.user)

	useEffect(() => {
		async function fetchChauffeurs() {
			const res = await getChauffeursByTransporter(
				transporter._id,
				page,
				SIZE
			)
			setChauffeurs(res.docs)
			setTotal(res.totalPages)
		}

		fetchChauffeurs()
	}, [page])

	return (
		<LayoutTransporter>
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
				}}
			>
				<GradientText>MES CHAUFFEURS</GradientText>
				<div
					style={{
						width: '90%',
						fontFamily: 'Montserrat',
						height: '60vh',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						marginTop: '1rem',
					}}
				>
					<div
						onClick={() => history.push('/chauffeurs/new')}
						style={{
							padding: '1rem 2rem',
							background: '#50F5A9',
							color: 'white',
							borderRadius: 7,
							cursor: 'pointer',
							marginBottom: '2rem',
						}}
					>
						Ajouter un chauffeur
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							flexWrap: 'wrap',
							width: '100%',
							height: '100%',
							alignItems: 'flex-start',
						}}
					>
						{chauffeurs.map((item, index) => (
							<div
								key={String(index)}
								style={{
									width: '25%',
									background: '#E4EAF0',
									borderRadius: 15,
									marginRight: '1rem',
									padding: '1rem 2rem',
									flexGrow: 0,
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<span
										style={{
											color: '#838EAB',
											fontSize: 18,
											fontWeight: 'bold',
										}}
									>
										{`${item.first_name} ${item.last_name}`}
									</span>
									<div
										onClick={() =>
											history.push(
												`/chauffeurs/${item._id}`
											)
										}
										style={{
											cursor: 'pointer',
										}}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='24.005'
											height='23.885'
											viewBox='0 0 24.005 23.885'
										>
											<g
												id='edit'
												transform='translate(0 -0.261)'
											>
												<path
													id='Path_11678'
													data-name='Path 11678'
													d='M22.156,51.835a.6.6,0,0,0-.6.6v5.308a1.8,1.8,0,0,1-1.794,1.794H2.989A1.8,1.8,0,0,1,1.2,57.741V42.161a1.8,1.8,0,0,1,1.794-1.794H8.3a.6.6,0,1,0,0-1.2H2.989A2.993,2.993,0,0,0,0,42.161v15.58A2.993,2.993,0,0,0,2.989,60.73H19.765a2.993,2.993,0,0,0,2.989-2.989V52.432A.6.6,0,0,0,22.156,51.835Zm0,0'
													transform='translate(0 -36.585)'
													fill='#838eab'
												/>
												<path
													id='Path_11679'
													data-name='Path 11679'
													d='M124.239,1.049a2.69,2.69,0,0,0-3.8,0L109.768,11.715a.6.6,0,0,0-.153.263l-1.4,5.064a.6.6,0,0,0,.736.736l5.064-1.4a.6.6,0,0,0,.263-.153L124.94,5.555a2.693,2.693,0,0,0,0-3.8ZM111.07,12.1l8.729-8.73,2.815,2.815-8.73,8.73Zm-.562,1.128,2.249,2.249-3.111.862ZM124.095,4.71l-.634.634-2.816-2.816.634-.634a1.5,1.5,0,0,1,2.114,0l.7.7A1.5,1.5,0,0,1,124.095,4.71Zm0,0'
													transform='translate(-101.722)'
													fill='#838eab'
												/>
											</g>
										</svg>
									</div>
								</div>
								<div
									style={{
										marginTop: '0.5rem',
										marginBottom: '0.5rem',
										width: '100%',
										height: 1,
										background: '#D4DBE6',
									}}
								/>

								{/* <div
									style={{
										display: 'flex',
										flexDirection: 'column',
										color: '#838EAB',
										fontSize: 12,
									}}
								>
									<span>Fourgon 12m³</span>
									<span>Fourgon 20m³</span>
								</div> */}
							</div>
						))}
					</div>

					<div
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<UltimatePaginationBasic
							currentPage={page}
							totalPages={total}
							onChange={(newPage) => setPage(newPage)}
						/>
					</div>
				</div>
			</div>
		</LayoutTransporter>
	)
}

export default ListChauffeurs
