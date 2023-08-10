import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { GradientText } from '../../PasserCommande/PasserCommande.styles'
import LayoutAdmin from '../../../Components/LayoutAdmin/LayoutAdmin'
import ModalImage from 'react-modal-image'
import { PUBLIC } from '../../../api/base'
import { getAllSignalementsByCommandeID } from '../../../api/signalements'

function SignalerAdminAll(props) {
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
		<LayoutAdmin>
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
									<div>
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
									<div
										onClick={async () => {
											history.push(
												`/admin/transports/${id}/signaler/${s._id}/edit`
											)
										}}
										style={{
											cursor: 'pointer',
											padding: '1rem',
											position: 'absolute',
											right: 0,
											top: 0,
											//background: 'red',
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
												viewBox='0 0 20 20'
												fill='currentColor'
											>
												<path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
												<path
													fillRule='evenodd'
													d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
													clipRule='evenodd'
												/>
											</svg>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</LayoutAdmin>
	)
}

export default SignalerAdminAll
