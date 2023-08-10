import React, { useEffect, useState } from 'react'
import {
	deleteSignalement,
	getAllSignalementsByCommandeID,
} from '../../../api/signalements'
import { useHistory, useParams } from 'react-router-dom'

import { GradientText } from '../../PasserCommande/PasserCommande.styles'
import LayoutTransporter from '../../../Components/LayoutTransporter/LayoutTransporter'
import ModalImage from 'react-modal-image'
import { PUBLIC } from '../../../api/base'

function SignalerTransporterAll(props) {
	const { id } = useParams()
	const history = useHistory()
	const [signalements, setSignalements] = useState([])

	const fetchData = async () => {
		const res = await getAllSignalementsByCommandeID(id)
		setSignalements(res.docs)
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<LayoutTransporter>
			<div
				style={{
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
				<div
					style={{
						width: '100%',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginBottom: '1rem',
							marginTop: '2rem',
						}}
					>
						<GradientText marginTop={'unset'}>
							{'signalement'.toUpperCase()}
						</GradientText>
						{/* <div
							style={{
								width: '1rem',
							}}
						/>
						<div
							onClick={() =>
								history.push(
									`/chauffeur/transports/${id}/signaler/new`
								)
							}
							style={{
								background: '#51C7F2',
								width: '3rem',
								height: '3rem',
								borderRadius: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								cursor: 'pointer',
							}}
						>
							<span style={{ color: 'white', fontSize: '3rem' }}>
								+
							</span>
						</div> */}
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{signalements.map((s) => {
							return (
								<div
									key={s._id}
									style={{
										display: 'flex',
										flexDirection: 'column',
										background: '#E4EAF0',
										borderRadius: '1rem',
										marginBottom: '1rem',
										padding: '1rem',
										position: 'relative',
										width: '50%',
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
										}}
									>
										<span
											style={{
												marginBottom: '1rem',
												color: '#838EAB',
												fontWeight: 'bold',
												marginRight: '1rem',
											}}
										>
											Signalement
										</span>
										{s.type && (
											<div>
												<span
													style={{
														marginBottom: '1rem',
														color: 'red',
														fontWeight: 'bold',
														marginRight: '.5rem',
													}}
												>
													Anomalie heure{' '}
													{s.current === 'chargement'
														? 'chargement'
														: 'de livraison'}
												</span>

												<span
													style={{
														marginBottom: '1rem',
														marginRight: '.5rem',
														color: 'red',
														fontWeight: 'bold',
													}}
												>
													{s.duration}
												</span>

												<span
													style={{
														marginBottom: '1rem',
														color: 'red',
														fontWeight: 'bold',
													}}
												>
													minutes de retard
												</span>
											</div>
										)}
									</div>
									<span
										style={{
											color: '#838EAB',
											marginBottom: '1rem',
										}}
									>
										{s.note}
									</span>
									<div
										style={{
											maxWidth: '500px',
											// overflowX: 'auto',
											display: 'flex',
											flexDirection: 'row',
											flexWrap: 'wrap',
										}}
									>
										{s.files &&
											s.files.map((file) => (
												<ModalImage
													className='preview-signalement-image'
													small={`${PUBLIC}/${file?.name}`}
													large={`${PUBLIC}/${file?.name}`}
													alt={file?.name}
												/>
											))}
									</div>

									{/* <div
										onClick={async () => {
											await deleteSignalement(s._id)
											await fetchData()
										}}
										style={{
											cursor: 'pointer',
											padding: '1rem',
											position: 'absolute',
											right: 0,
											top: 0,
										}}
									>
										<div
											style={{
												height: 30,
												width: 30,
												color: '#838EAB',
											}}
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-6 w-6'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
												/>
											</svg>
										</div>
									</div> */}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</LayoutTransporter>
	)
}

export default SignalerTransporterAll
