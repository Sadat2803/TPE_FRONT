import React from 'react'
import Logo from '../../assets/img/logo-TPE@2x.png'

function CommonHeader(props) {
	return (
		<div
			style={{
				paddingLeft: 60,
				paddingRight: 60,
				width: '100%',
				background: '#72c5ed',
				fontFamily: 'Montserrat',
				paddingTop: '2rem',
				paddingBottom: '2rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					width: '30%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<img src={Logo} style={{ height: 50 }} />
			</div>

			<div
				style={{
					width: '40%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-around',
				}}
			>
				<a
					style={{
						color: 'white',
						textDecoration: 'none',
						fontWeight: 'bold',
					}}
					href='/'
				>
					Acceuil
				</a>

				<a
					style={{
						color: 'white',
						textDecoration: 'none',
						fontWeight: 'bold',
						borderBottom: '4px solid #50F5A9',
					}}
					href='/CreateAccount'
				>
					Créer un compte
				</a>

				<a
					style={{
						color: 'white',
						textDecoration: 'none',
						fontWeight: 'bold',
					}}
					href='/contact'
				>
					Nous contacter
				</a>
			</div>

			<div
				style={{
					width: '30%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-around',
				}}
			>
				<a
					style={{
						color: '#51C7F2',
						background: 'white',
						padding: '0.5rem 2rem',
						width: '10rem',
						textDecoration: 'none',
						borderRadius: '0.5rem',
						textAlign: 'center',
						fontWeight: 'bold',
					}}
					href='/login'
				>
					Espace <br /> Client
				</a>

				<a
					href='/login'
					style={{
						color: 'white',
						background: '#50F5A9',
						width: '10rem',
						padding: '0.5rem 2rem',
						textDecoration: 'none',
						borderRadius: '0.5rem',
						textAlign: 'center',
						fontWeight: 'bold',
					}}
				>
					Espace <br /> Transporteur
				</a>
			</div>
		</div>
	)
}

export default CommonHeader
