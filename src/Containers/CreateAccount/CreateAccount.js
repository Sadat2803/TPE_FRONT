import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Footer from '../../Components/Footer/footer.component'
import CommonHeader from '../../Components/CommonHeader/common-header.component'
import { GradientText } from '../PasserCommande/PasserCommande.styles'
import { useHistory } from 'react-router'

export default function CreateAccount() {
	const counter = useSelector((state) => state.counter)
	const history = useHistory()

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
				}}
			>
				<GradientText>CRÉER UN COMPTE</GradientText>

				<div style={{ height: 50 }} />

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<div
						style={{
							//width: 200,
							maxWidth: 400,
							padding: '3rem 3rem',
							background: '#E4EAF0',
							borderRadius: 30,
							display: 'flex',
							flexDirection: 'column',
							fontFamily: 'Montserrat',
						}}
					>
						<span
							style={{
								marginBottom: '2rem',
								fontSize: 12,
								textAlign: 'center',
							}}
						>
							Vous êtes clients et vous souhaitez commander un ou
							plusieurs transports
						</span>

						<button
							onClick={() => history.push('/client/signup')}
							style={{
								color: 'white',
								border: 'none',
								background: '#51C7F2',
								padding: '1rem 2rem',
								borderRadius: 10,
								cursor: 'pointer',
								fontFamily: 'Montserrat',
								fontWeight: 'bold',
							}}
						>
							Créer un compte Client
						</button>
					</div>

					<div style={{ width: 50 }} />

					<div
						style={{
							//width: 200,
							maxWidth: 400,
							padding: '3rem 3rem',
							background: '#E4EAF0',
							borderRadius: 30,
							display: 'flex',
							flexDirection: 'column',
							fontFamily: 'Montserrat',
						}}
					>
						<span
							style={{
								marginBottom: '2rem',
								fontSize: 12,
								textAlign: 'center',
							}}
						>
							Vous êtes un transporteur et vous souhaitez vous
							inscrire pour effectuer des transports
						</span>

						<button
							onClick={() => history.push('/transporter/signup')}
							style={{
								color: 'white',
								border: 'none',
								background: '#50F5A9',
								padding: '1rem 2rem',
								borderRadius: 10,
								cursor: 'pointer',
								fontFamily: 'Montserrat',
								fontWeight: 'bold',
							}}
						>
							Créer un compte Transporteur
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
