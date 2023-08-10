import {
	Header,
	Main,
	RootContainer,
	SideBar,
	SideBarContainer,
} from '../LayoutClient/container.styles'

import Logo from '../../../src/assets/img/logo-TPE.png'
import camion from '../../../src/assets/img/camion@2x.png'
import chauffeurs from '../../../src/assets/img/chauffeurs@2x.png'
import comptabilite from '../../../src/assets/img/comptabilite@2x.png'
import historique from '../../../src/assets/img/historique@2x.png'
import plateforme from '../../../src/assets/img/plateforme@2x.png'

import React from 'react'
import MenuItem from '../LayoutClient/menu-item.component'
import Footer from '../Footer/footer.component'
import { useHistory } from 'react-router'

import useLocalStorage from 'react-use-localstorage'
import { PUBLIC } from '../../api/base'
import { useDispatch, useSelector } from 'react-redux'

import { logoutAction } from '../../redux/auth'

function LayoutTransporter({ children }) {
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
							onClick={() => history.push('/transports')}
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
							title='Plate-forme'
							onClick={() => history.push('/plateforme')}
							icon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='18.159'
									height='18.16'
									viewBox='0 0 18.159 18.16'
								>
									<path
										id='Path_11680'
										data-name='Path 11680'
										d='M16.5,3.837a.152.152,0,0,0,0-.018c-.023-.032-.051-.06-.074-.092q-.254-.346-.538-.667c-.052-.058-.1-.116-.157-.173q-.293-.313-.614-.6c-.04-.035-.077-.071-.116-.106a9.093,9.093,0,0,0-1.722-1.163L13.2.984a9.022,9.022,0,0,0-.843-.376c-.065-.023-.124-.045-.186-.065Q11.786.406,11.39.3c-.078-.021-.156-.042-.235-.06C10.9.181,10.637.135,10.371.1c-.08-.012-.16-.027-.241-.037a8.529,8.529,0,0,0-2.058,0c-.081.01-.16.025-.241.037C7.567.135,7.3.181,7.048.242c-.079.018-.157.04-.235.06q-.4.1-.779.242L5.849.609a9.017,9.017,0,0,0-.843.376l-.076.037A9.1,9.1,0,0,0,3.2,2.184c-.04.034-.077.071-.116.106a8.438,8.438,0,0,0-.614.6c-.053.057-.105.115-.157.173q-.285.32-.538.667c-.023.032-.051.06-.074.092a.147.147,0,0,0-.008.018,9.024,9.024,0,0,0,0,10.483.141.141,0,0,0,.008.018c.023.032.051.06.074.092q.254.346.538.667c.052.058.1.116.157.173q.293.313.614.6c.04.035.077.071.116.106a9.093,9.093,0,0,0,1.722,1.163L5,17.172a9.022,9.022,0,0,0,.843.376c.065.023.124.045.186.065q.383.138.779.242c.078.021.156.042.235.06.26.06.519.106.784.144.08.012.16.027.241.037a8.529,8.529,0,0,0,2.058,0c.081-.01.16-.025.241-.037.265-.038.527-.084.784-.144.079-.018.157-.04.235-.06q.4-.1.779-.242l.186-.065a9.016,9.016,0,0,0,.843-.376l.076-.037a9.094,9.094,0,0,0,1.722-1.163c.04-.034.077-.071.116-.106a8.26,8.26,0,0,0,.614-.6c.053-.057.105-.115.157-.173q.285-.321.538-.667c.023-.032.051-.06.074-.092a.147.147,0,0,0,.008-.018A9.023,9.023,0,0,0,16.5,3.837Zm-.74,1.227A7.719,7.719,0,0,1,16.851,8.43H12.965A12.106,12.106,0,0,0,12.6,6.14,11.658,11.658,0,0,0,15.757,5.064ZM10.749,1.472c.036.008.071.02.108.029a6.982,6.982,0,0,1,.688.195c.034.012.068.025.1.038q.335.117.658.26l.112.055q.309.147.6.319l.13.078q.28.171.545.367c.045.033.091.065.136.1a5.919,5.919,0,0,1,.5.417c.042.038.084.075.125.114.166.158.324.324.477.5.019.023.04.043.06.065a10.882,10.882,0,0,1-2.767.889,16.5,16.5,0,0,0-1.746-3.466C10.568,1.444,10.661,1.453,10.749,1.472ZM6.527,8.43a10.825,10.825,0,0,1,.357-2.076,18.59,18.59,0,0,0,2.215.13,18.632,18.632,0,0,0,2.217-.133,10.8,10.8,0,0,1,.355,2.079Zm5.143,1.3a10.825,10.825,0,0,1-.357,2.076,18.987,18.987,0,0,0-4.432,0,10.808,10.808,0,0,1-.355-2.076ZM9.1,1.716A15.669,15.669,0,0,1,10.907,5.09a17.171,17.171,0,0,1-1.808.1,17.3,17.3,0,0,1-1.806-.1A15.793,15.793,0,0,1,9.1,1.716ZM3.267,3.939c.152-.173.311-.339.477-.5.041-.039.084-.076.125-.114q.24-.219.5-.417c.045-.034.09-.065.136-.1q.265-.195.545-.367l.13-.078q.3-.173.6-.319l.112-.055q.323-.146.658-.26c.034-.012.065-.026.1-.038.225-.075.454-.138.688-.195.036-.008.071-.02.108-.028.089-.019.181-.029.271-.045A16.5,16.5,0,0,0,5.974,4.894,10.882,10.882,0,0,1,3.207,4C3.227,3.982,3.247,3.962,3.267,3.939ZM2.442,5.064A11.656,11.656,0,0,0,5.6,6.14,12.106,12.106,0,0,0,5.233,8.43H1.347A7.72,7.72,0,0,1,2.442,5.064Zm0,8.028A7.719,7.719,0,0,1,1.347,9.727H5.233A12.106,12.106,0,0,0,5.6,12.016,11.655,11.655,0,0,0,2.442,13.092Zm5.007,3.592c-.036-.008-.071-.02-.108-.029a6.98,6.98,0,0,1-.688-.195c-.034-.012-.068-.025-.1-.038q-.335-.117-.658-.26l-.112-.055q-.309-.147-.6-.319l-.13-.078q-.28-.171-.545-.367c-.045-.033-.091-.065-.136-.1a5.919,5.919,0,0,1-.5-.417c-.042-.038-.084-.075-.125-.114-.166-.158-.324-.324-.477-.5-.019-.023-.04-.043-.06-.065a10.882,10.882,0,0,1,2.767-.889A16.5,16.5,0,0,0,7.72,16.729C7.63,16.713,7.538,16.7,7.449,16.684ZM9.1,16.44a15.669,15.669,0,0,1-1.808-3.374,16.889,16.889,0,0,1,3.615,0h0A15.789,15.789,0,0,1,9.1,16.44Zm5.832-2.223c-.152.173-.311.339-.477.5-.041.039-.084.076-.125.114q-.24.219-.5.417l-.136.1q-.265.195-.545.367l-.13.078q-.295.172-.6.319l-.112.055q-.323.146-.658.26c-.034.012-.065.026-.1.038-.225.075-.454.138-.688.195-.036.008-.071.02-.108.028-.089.019-.181.029-.271.045a16.494,16.494,0,0,0,1.746-3.466,10.882,10.882,0,0,1,2.767.889C14.972,14.174,14.951,14.2,14.931,14.218Zm.825-1.126A11.656,11.656,0,0,0,12.6,12.016a12.106,12.106,0,0,0,.363-2.289h3.886A7.721,7.721,0,0,1,15.757,13.092Z'
										transform='translate(-0.016 0.002)'
										fill='#f5f6f7'
									/>
								</svg>
							}
						/>

						<MenuItem
							onClick={() =>
								history.push('/historique/transporter')
							}
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
							onClick={() =>
								history.push('/comptabilite/transporter/day')
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
							onClick={() => history.push('/chauffeurs')}
							title='Mes chauffeurs'
							icon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='13.605'
									height='27.839'
									viewBox='0 0 13.605 27.839'
								>
									<g id='user' transform='translate(0.5 0.5)'>
										<path
											id='Path_11624'
											data-name='Path 11624'
											d='M31.488,8.816A3.412,3.412,0,1,1,34.9,5.4,3.412,3.412,0,0,1,31.488,8.816Zm0-6.054a2.645,2.645,0,1,0,2.645,2.645A2.645,2.645,0,0,0,31.488,2.762Z'
											transform='translate(-25.195 -1.992)'
											fill='#f5f6f7'
											stroke='#e4eaf0'
											strokeWidth='1'
										/>
										<path
											id='Path_11625'
											data-name='Path 11625'
											d='M30.917,33.11h-.752a.383.383,0,1,1,0-.767h.752A1.484,1.484,0,0,0,32.4,30.861V24.829a1.7,1.7,0,0,0-1.7-1.7H23.03a1.7,1.7,0,0,0-1.7,1.7v6.034a1.484,1.484,0,0,0,1.484,1.481h.725a.383.383,0,1,1,0,.767h-.725a2.252,2.252,0,0,1-2.249-2.249V24.829A2.472,2.472,0,0,1,23.03,22.36H30.7a2.472,2.472,0,0,1,2.469,2.469v6.034A2.252,2.252,0,0,1,30.917,33.11Z'
											transform='translate(-20.562 -14.551)'
											fill='#f5f6f7'
											stroke='#e4eaf0'
											strokeWidth='1'
										/>
										<path
											id='Path_11626'
											data-name='Path 11626'
											d='M38.027,48.646A2.029,2.029,0,0,1,36,46.619V40.231a.383.383,0,0,1,.767,0v6.388a1.26,1.26,0,0,0,2.52,0V34.509a.383.383,0,0,1,.767,0v12.11A2.029,2.029,0,0,1,38.027,48.646Z'
											transform='translate(-30.081 -21.807)'
											fill='#f5f6f7'
											stroke='#e4eaf0'
											strokeWidth='1'
										/>
										<path
											id='Path_11627'
											data-name='Path 11627'
											d='M29.453,48.646a2.029,2.029,0,0,1-2.027-2.027V34.509a.383.383,0,0,1,.767,0v12.11a1.26,1.26,0,0,0,2.52,0V40.231a.383.383,0,0,1,.767,0v6.388A2.029,2.029,0,0,1,29.453,48.646Z'
											transform='translate(-24.794 -21.807)'
											fill='#f5f6f7'
											stroke='#e4eaf0'
											strokeWidth='1'
										/>
									</g>
								</svg>
							}
						/>

						<MenuItem
							onClick={() => history.push('/transporter/account')}
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

export default LayoutTransporter
