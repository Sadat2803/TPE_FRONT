import {
	Header,
	RootContainer,
	SideBar,
	SideBarContainer,
} from '../LayoutClient/container.styles'
import { useDispatch, useSelector } from 'react-redux'

import Footer from '../Footer/footer.component'
import Logo from '../../../src/assets/img/logo-TPE.png'
import MenuItem from '../LayoutClient/menu-item.component'
import { PUBLIC } from '../../api/base'
import React from 'react'
import { logoutAction } from '../../redux/auth'
import { useHistory } from 'react-router'

function LayoutChauffeur({ children }) {
	const history = useHistory()
	const dispatch = useDispatch()
	const user = useSelector((state) => state.auth.user)

	return (
		<RootContainer>
			<Header>
				<img
					style={{
						width: '10rem',
					}}
					alt='logo'
					src={Logo}
				/>

				<div
					style={{
						background: '#50F5A9',
						paddingRight: '2rem',
						paddingLeft: '2rem',
						paddingTop: '0.5rem',
						paddingBottom: '0.5rem',
						borderRadius: '0.9rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-evenly',
						fontFamily: 'Montserrat',
						color: '#fff',
						fontWeight: 'bold',
					}}
				>
					<span>
						Bienvenue{' '}
						{user && (
							<>
								{user.first_name} {user.last_name}
							</>
						)}
					</span>

					<span style={{ width: '10px' }} />

					<img
						style={{
							width: '2rem',
							height: '2rem',
							borderRadius: '1rem',
						}}
						alt='user'
						src={
							user && user.logo
								? `${PUBLIC}/${user.logo.name}`
								: 'https://secure.gravatar.com/avatar/6ee7af2da22737fd49ce56adc226d2cb?size=200&d=mp'
						}
					/>
				</div>
			</Header>
			<div
				style={{
					background: 'red',
					height: 'calc(100vh - 7rem)',
					width: '100%',
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<SideBar>
					<SideBarContainer>
						<MenuItem
							title='Mes transports'
							onClick={() =>
								history.push('/chauffeur/transports')
							}
							icon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24.601'
									height='13.281'
									viewBox='0 0 24.601 13.281'
								>
									<g
										id='Group_10835'
										data-name='Group 10835'
										transform='translate(-1130.409 -1584.729)'
									>
										<g
											id='truck'
											transform='translate(1130.659 1584.979)'
										>
											<g
												id='Group_10633'
												data-name='Group 10633'
												transform='translate(4.153 10.565)'
											>
												<g
													id='Group_10632'
													data-name='Group 10632'
												>
													<path
														id='Path_49'
														data-name='Path 49'
														d='M88.573,344.692h0a.353.353,0,1,0,.357.353A.351.351,0,0,0,88.569,344.692Z'
														transform='translate(-88.218 -344.692)'
														fill='#fff'
														stroke='#e4eaf0'
														strokeWidth='0.5'
													/>
												</g>
											</g>
											<g
												id='Group_10635'
												data-name='Group 10635'
												transform='translate(7.171 10.565)'
											>
												<g
													id='Group_10634'
													data-name='Group 10634'
												>
													<path
														id='Path_50'
														data-name='Path 50'
														d='M152.7,344.692h0a.353.353,0,1,0,.357.353A.351.351,0,0,0,152.7,344.692Z'
														transform='translate(-152.347 -344.692)'
														fill='#fff'
														stroke='#e4eaf0'
														strokeWidth='0.5'
													/>
												</g>
											</g>
											<g
												id='Group_10637'
												data-name='Group 10637'
												transform='translate(19.624 10.565)'
											>
												<g
													id='Group_10636'
													data-name='Group 10636'
												>
													<path
														id='Path_51'
														data-name='Path 51'
														d='M417.234,344.692h0a.353.353,0,1,0,.357.353A.351.351,0,0,0,417.23,344.692Z'
														transform='translate(-416.879 -344.692)'
														fill='#fff'
														stroke='#e4eaf0'
														strokeWidth='0.5'
													/>
												</g>
												<g
													id='Group_10817'
													data-name='Group 10817'
												>
													<path
														id='Path_51-2'
														data-name='Path 51'
														d='M417.234,344.692h0a.353.353,0,1,0,.357.353A.351.351,0,0,0,417.23,344.692Z'
														transform='translate(-416.879 -344.692)'
														fill='#fff'
														stroke='#e4eaf0'
														strokeWidth='0.5'
													/>
												</g>
											</g>
											<g
												id='Group_10639'
												data-name='Group 10639'
												transform='translate(0 0)'
											>
												<g
													id='Group_10638'
													data-name='Group 10638'
												>
													<path
														id='Path_52'
														data-name='Path 52'
														d='M23.777,126.542l-.475-.475s-1.117-3.207-1.247-3.373a.784.784,0,0,0-.594-.186H18.819v-1.534a.731.731,0,0,0-.73-.73H.73a.731.731,0,0,0-.73.73v8.3a.731.731,0,0,0,.73.73h.4v.779a.731.731,0,0,0,.73.73h.813a1.861,1.861,0,0,0,3.338.736,1.861,1.861,0,0,0,3.338-.736h8.8a1.862,1.862,0,0,0,3.691-.353c0-.008,0-.016,0-.024h1.534a.731.731,0,0,0,.73-.73v-3.084A1.1,1.1,0,0,0,23.777,126.542Zm-21.1,4.268H1.862a.024.024,0,0,1-.024-.024v-.779H3.045A1.855,1.855,0,0,0,2.675,130.81ZM4.5,132.32a1.156,1.156,0,0,1-.007-2.312h.014A1.156,1.156,0,0,1,4.5,132.32Zm3.019,0a1.156,1.156,0,0,1-.007-2.312H7.53a1.156,1.156,0,0,1-.007,2.312Zm10.624-1.509h-8.8a1.855,1.855,0,0,0-.37-.8h8.981a.353.353,0,0,0,0-.706H.73a.024.024,0,0,1-.024-.024v-8.3a.024.024,0,0,1,.024-.024H18.088a.024.024,0,0,1,.024.024V129.3h-.779a.353.353,0,0,0,0,.706h1.183A1.855,1.855,0,0,0,18.146,130.81Zm4.483-4.528H20.352a.024.024,0,0,1-.024-.024v-1.534H22.11Zm-2.655,6.037a1.156,1.156,0,0,1-.007-2.312h.01a1.156,1.156,0,0,1,0,2.313Zm3.42-1.911a.024.024,0,0,1-.024.024H21.688a1.865,1.865,0,0,0-1.713-1.132H18.819v-6.062h0a.024.024,0,0,1,.024-.024h2.764l.268.8h-1.9a.353.353,0,0,0-.353.353v1.887a.731.731,0,0,0,.73.73h2.872l.053.053a.4.4,0,0,1,.118.284v.844h-.4a.353.353,0,1,0,0,.706h.4Z'
														transform='translate(0 -120.245)'
														fill='#fff'
														stroke='#e4eaf0'
														strokeWidth='0.5'
													/>
												</g>
											</g>
										</g>
									</g>
								</svg>
							}
						/>

						<MenuItem
							title='Historique'
							icon={
								<svg
									id='icon_calendar'
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									viewBox='0 0 16 16'
								>
									<rect
										id='Rectangle_557'
										data-name='Rectangle 557'
										width='16'
										height='16'
										fill='none'
									/>
									<path
										id='Path_149'
										data-name='Path 149'
										d='M2,5v9H14V5ZM13,2h2a.945.945,0,0,1,1,1V15a.945.945,0,0,1-1,1H1a.945.945,0,0,1-1-1V3A.945.945,0,0,1,1,2H3V1A.945.945,0,0,1,4,0,.945.945,0,0,1,5,1V2h6V1a1,1,0,0,1,2,0ZM12,12H10V10h2ZM9,12H7V10H9Zm3-3H10V7h2ZM9,9H7V7H9ZM6,12H4V10H6Z'
										fill='#f5f6f7'
										fillRule='evenodd'
									/>
								</svg>
							}
						/>

						<MenuItem
							onClick={() => history.push('/chauffeur/account')}
							title='Mon compte'
							icon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='14'
									height='16'
									viewBox='0 0 14 16'
								>
									<g
										id='icon_customers'
										transform='translate(0 0)'
									>
										<path
											id='Union_10'
											data-name='Union 10'
											d='M0,16a6.018,6.018,0,0,1,6-6H8a6.018,6.018,0,0,1,6,6Zm2.6-2h8.9A4.033,4.033,0,0,0,8,12H6.1A4.035,4.035,0,0,0,2.6,14ZM3,5V4a4,4,0,0,1,8,0V5A4,4,0,1,1,3,5ZM5,4V5A2,2,0,1,0,9,5V4A2,2,0,0,0,5,4Z'
											transform='translate(0 0)'
											fill='#f5f6f7'
										/>
									</g>
								</svg>
							}
						/>

						<MenuItem
							onClick={() => {
								dispatch(logoutAction())
								history.push('/login')
							}}
							title='Déconnexion'
							icon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='12'
									height='15'
									viewBox='0 0 12 15'
								>
									<g
										id='Group_11287'
										data-name='Group 11287'
										transform='translate(-27 -511)'
									>
										<g
											id='Ellipse_111'
											data-name='Ellipse 111'
											transform='translate(27 511)'
											fill='none'
											stroke='#e4eaf0'
											strokeWidth='2'
										>
											<circle
												cx='6'
												cy='6'
												r='6'
												stroke='none'
											/>
											<circle
												cx='6'
												cy='6'
												r='5'
												fill='none'
											/>
										</g>
										<g
											id='Rectangle_4256'
											data-name='Rectangle 4256'
											transform='translate(31 518)'
											fill='#e4eaf0'
											stroke='#413f4d'
											strokeWidth='1'
										>
											<rect
												width='4'
												height='8'
												stroke='none'
											/>
											<rect
												x='0.5'
												y='0.5'
												width='3'
												height='7'
												fill='none'
											/>
										</g>
									</g>
								</svg>
							}
						/>
					</SideBarContainer>
				</SideBar>

				<div
					style={{
						width: '100%',
						background: 'white',
						position: 'relative',
						overflowY: user.suspendre ? 'hidden' : 'auto',
					}}
				>
					{children}
					{user.suspendre && (
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								background: 'rgba(0, 0, 0, 0.5)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<div
								style={{
									width: '50%',
									// height: '50%',
									background: 'white',
									borderRadius: 5,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '2rem 2rem',
									textAlign: 'center',
								}}
							>
								<span
									style={{
										fontFamily: 'Montserrat',
										fontSize: 20,
										marginBottom: '2rem',
									}}
								>
									Compte suspendu
								</span>
								<span
									style={{
										fontFamily: 'Montserrat',
									}}
								>
									Votre accès à été limité.
								</span>
							</div>
						</div>
					)}
				</div>
			</div>

			<Footer />
		</RootContainer>
	)
}

export default LayoutChauffeur
