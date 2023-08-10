import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Footer from '../../Components/Footer/footer.component'
import CommonHeader from '../../Components/CommonHeader/common-header.component'
import { GradientText } from '../PasserCommande/PasserCommande.styles'
import { useHistory, useLocation } from 'react-router'

export default function Felicitation() {
	const history = useHistory()
	const location = useLocation()

	console.log(location)

	return (
		<div>
			<CommonHeader />
			<div
				style={{
					height: '80vh',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					fontFamily: 'Montserrat',
				}}
			>
				<GradientText>{'Félicitation'.toUpperCase()}</GradientText>

				<div style={{ height: 25 }} />

				{location.pathname === '/felicitation/client' ? (
					<span>
						La création de votre compte a bien été enregistré 😃{' '}
					</span>
				) : (
					<div
						style={{
							textAlign: 'center',
						}}
					>
						La création de votre compte a bien été enregistré 😃
						<br />
						la plate-forme du transport doit maintenant validé votre
						compte.
						<br />
						<div style={{ height: 20 }} />
						<span>
							Vous recevrez un mail avec les informations
							nécessaires. À très vite 👍
						</span>
					</div>
				)}

				<div style={{ height: 25 }} />

				<button
					onClick={() => history.push('/CreateAccount')}
					style={{
						color: 'white',
						border: 'none',
						background: '#50F5A9',
						padding: '1rem 4rem',
						borderRadius: 10,
						cursor: 'pointer',
						fontFamily: 'Montserrat',
						fontWeight: 'bold',
					}}
				>
					Retours au site
				</button>
			</div>
			<Footer />
		</div>
	)
}
