import {
	Header,
	Main,
	RootContainer,
	SideBar,
	SideBarContainer,
} from './container.styles'

import Logo from '../../../src/assets/img/logo-TPE.png'

import React from 'react'
import MenuItem from './menu-item.component'
import Footer from '../Footer/footer.component'
import { useHistory } from 'react-router'

import useLocalStorage from 'react-use-localstorage'
import { PUBLIC } from '../../api/base'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../../redux/auth'

function Container({ children }) {
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
						background: 'white',
						paddingRight: '2rem',
						paddingLeft: '2rem',
						paddingTop: '0.5rem',
						paddingBottom: '0.5rem',
						borderRadius: '0.9rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-evenly',
						fontFamily: 'Montserrat',
						color: '#72c5ed',
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
							title='Passer Commande'
							onClick={() => history.push('/commandes/new')}
							icon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									xmlnsXlink='http://www.w3.org/1999/xlink'
									width='19'
									height='21'
									viewBox='0 0 19 21'
								>
									<defs>
										<clipPath id='clipPath'>
											<rect
												width='14'
												height='16'
												fill='none'
											/>
										</clipPath>
									</defs>
									<g
										id='Group_10825'
										data-name='Group 10825'
										transform='translate(1818 -3022)'
									>
										<g
											id='icon_Invoices'
											transform='translate(-1818 3027)'
											clipPath='url(#clipPath)'
										>
											<path
												id='Path_102'
												data-name='Path 102'
												d='M14,0H2A.945.945,0,0,0,1,1V16l3-2,2,2,2-2,2,2,2-2,3,2V1A.945.945,0,0,0,14,0ZM12,10H4V8h8Zm0-4H4V4h8Z'
												transform='translate(-1)'
												fill='#f5f6f7'
											/>
										</g>
										<path
											id='Subtraction_12'
											data-name='Subtraction 12'
											d='M4,8A4,4,0,1,1,8,4,4,4,0,0,1,4,8ZM1.6,3.2V4.8H3.2V6.4H4.8V4.8H6.4V3.2H4.8V1.6H3.2V3.2Z'
											transform='translate(-1807 3022)'
											fill='#f5f6f7'
										/>
									</g>
								</svg>
							}
						/>

						<MenuItem
							title='Commandes'
							onClick={() => history.push('/commandes/list')}
							icon={
								<svg
									id='Icon_Invoices'
									xmlns='http://www.w3.org/2000/svg'
									width='14'
									height='16'
									viewBox='0 0 14 16'
								>
									<path
										id='Path_102'
										data-name='Path 102'
										d='M14,0H2A.945.945,0,0,0,1,1V16l3-2,2,2,2-2,2,2,2-2,3,2V1A.945.945,0,0,0,14,0ZM12,10H4V8h8Zm0-4H4V4h8Z'
										transform='translate(-1)'
										fill='#fff'
									/>
								</svg>
							}
						/>

						<MenuItem
							title='Historique'
							onClick={() => history.push('/historique/client')}
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
							onClick={() =>
								history.push('/comptabilite/client/day')
							}
							title='Comptabilité'
							icon={
								<svg
									id='icon_dashboard'
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									viewBox='0 0 16 16'
								>
									<path
										id='Union_8'
										data-name='Union 8'
										d='M13,16a.945.945,0,0,1-1-1V6a.945.945,0,0,1,1-1h2a.945.945,0,0,1,1,1v9a.945.945,0,0,1-1,1ZM7,16a.944.944,0,0,1-1-1V1A.945.945,0,0,1,7,0H9a.945.945,0,0,1,1,1V15a.944.944,0,0,1-1,1ZM1,16a.945.945,0,0,1-1-1V11a.945.945,0,0,1,1-1H3a.946.946,0,0,1,1,1v4a.945.945,0,0,1-1,1Z'
										transform='translate(0 0)'
										fill='#f5f6f7'
									/>
								</svg>
							}
						/>

						<MenuItem
							title='Mon compte'
							onClick={() => history.push('/client/account')}
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
						overflowY: user.suspendre ? 'hidden' : 'auto',
						position: 'relative',
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
									Votre compte est suspendu jusqu'à nouvelle
									ordre, veuillez contacter la Plateforme du
									Transport. Merci
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

export default Container
