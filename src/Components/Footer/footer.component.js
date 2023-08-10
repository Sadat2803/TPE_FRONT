import React from 'react'

import Logo2 from '../../assets/img/Logo2@2x.png'

function Footer(props) {
	return (
		<div
			style={{
				paddingLeft: 60,
				paddingRight: 60,
				width: '100%',
				background: '#72c5ed',
				fontFamily: 'Montserrat',
				paddingTop: 20,
			}}
		>
			<div
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '30%',
						alignItems: 'start',
					}}
				>
					<div
						style={{
							width: '80%',
						}}
					>
						<img
							style={{
								height: 80,

								objectFit: 'contain',
							}}
							src={Logo2}
							alt='logo'
						/>
					</div>
					<p
						style={{
							color: 'white',
							fontSize: 12,
							marginTop: 0,
							textAlign: 'start',
							width: '80%',
						}}
					>
						74 avenue Gambetta
					</p>
					<p
						style={{
							color: 'white',
							fontSize: 12,
							marginTop: 0,
							textAlign: 'start',
							width: '80%',
						}}
					>
						75020 Paris
					</p>
					<p
						style={{
							color: 'white',
							fontSize: 12,
							marginTop: 0,
							textAlign: 'start',
							width: '80%',
						}}
					>
						France
					</p>
					<p
						style={{
							color: 'white',
							fontSize: 12,
							marginTop: 0,
							textAlign: 'start',
							width: '80%',
						}}
					>
						+33 01 45 67 43 22
					</p>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '20%',
					}}
				>
					<p
						style={{
							color: 'white',
							fontSize: 14,
							marginTop: 35,
							marginBottom: 12,
							fontWeight: 'bold',
						}}
					>
						Informations
					</p>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<a
							style={{
								color: 'white',
								marginBottom: 10,
								fontSize: 12,
								textDecoration: 'none',
							}}
							href='/'
						>
							Accueil
						</a>
						<a
							style={{
								color: 'white',
								marginBottom: 10,
								fontSize: 12,
								textDecoration: 'none',
							}}
							href='/transporter/signup'
						>
							Devenir Transporteur
						</a>
						<a
							href='test'
							style={{
								color: 'white',
								marginBottom: 10,
								fontSize: 12,
								textDecoration: 'none',
							}}
						>
							Devenir Chauffeur
						</a>
						<a
							href='/client/signup'
							style={{
								color: 'white',
								marginBottom: 10,
								fontSize: 12,
								textDecoration: 'none',
							}}
						>
							Inscription Client
						</a>
						<a
							href='test'
							style={{
								color: 'white',
								marginBottom: 10,
								fontSize: 12,
								textDecoration: 'none',
							}}
						>
							Contact
						</a>
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '20%',
					}}
				>
					<p
						style={{
							color: 'white',
							fontSize: 14,
							marginTop: 35,
							marginBottom: 12,
							fontWeight: 'bold',
						}}
					>
						Support
					</p>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<a
							style={{
								color: 'white',
								marginBottom: 10,
								fontSize: 12,
								textDecoration: 'none',
							}}
							href='test'
						>
							Privacy policy
						</a>

						<a
							style={{
								color: 'white',
								marginBottom: 10,
								fontSize: 12,
								textDecoration: 'none',
							}}
							href='test'
						>
							Terms & conditions
						</a>
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '20%',
					}}
				>
					<p
						style={{
							color: 'white',
							fontSize: 14,
							marginTop: 35,
							marginBottom: 12,
							fontWeight: 'bold',
						}}
					>
						Mon Compte
					</p>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<a
							style={{
								color: 'white',
								marginBottom: 10,
								fontSize: 12,
								textDecoration: 'none',
							}}
							href='test'
						>
							Accès Client
						</a>

						<a
							style={{
								color: 'white',
								marginBottom: 10,
								fontSize: 12,
								textDecoration: 'none',
							}}
							href='test'
						>
							Accès Chauffeur
						</a>

						<a
							style={{
								color: 'white',
								marginBottom: 10,
								fontSize: 12,
								textDecoration: 'none',
							}}
							href='test'
						>
							Accès Professionel
						</a>
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '20%',
					}}
				>
					<p
						style={{
							color: 'white',
							fontSize: 14,
							marginTop: 35,
							marginBottom: 12,
							fontWeight: 'bold',
						}}
					>
						Lettre d'information
					</p>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<div
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'row',
							}}
						>
							<input
								style={{
									width: '100%',
									background: 'white',
									border: 'none',
									marginRight: 10,
									padding: 10,
									fontFamily: 'Montserrat',
									borderRadius: 5,
								}}
								placeholder='Adresse email'
							/>

							<button
								style={{
									background: '#50F5A9',
									border: 'none',
									color: 'white',
									paddingLeft: 10,
									paddingRight: 10,
									borderRadius: 5,
									fontFamily: 'Montserrat',
								}}
							>
								S'abonner
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				style={{
					paddingTop: 10,
					paddingBottom: 10,
					borderTop: '1px solid rgba(255, 255, 255, 0.3)',
					marginTop: 50,
					fontSize: 12,
					color: 'white',
				}}
			>
				© 2020 app.tpe.com
			</div>
		</div>
	)
}

export default Footer
