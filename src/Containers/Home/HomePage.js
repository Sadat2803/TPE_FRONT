import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Footer from '../../Components/Footer/footer.component'
import Logo from '../../assets/img/logo-TPE@2x.png'
import { GradientText } from '../PasserCommande/PasserCommande.styles'
import choices from '../../assets/img/choices.svg'
import order from '../../assets/img/order.svg'
import truck from '../../assets/img/truck.svg'
import style from '../../Containers/RegisterTransporter/style'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
	card: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},

	span_serviceTitle: {
		color: '#51C7F2',
		fontSize: 20,
		fontFamily: 'Montserrat',
		textAlign: 'center',
		fontWeight: 'bold',
	},
	div_serviceDescription: {
		textAlign: 'center',
		paddingTop: '0 !important',
		padding: '1rem',
		marginTop: '20px',
		maxHeight: '300px',
		overflowY: 'scroll',
	},
	span_serviceDescription: {
		textAlign: 'center',
		paddingTop: '0 !important',
		padding: '1rem',
		marginTop: '20px',
		maxHeight: '300px',
		overflowY: 'scroll',
		fontFamily: 'Montserrat',
	},
	form_cmd: {
		background: '#E4EAF0',
		display: 'flex',
		flexDirection: 'column',
		padding: '2rem 3rem',
		borderRadius: 15,
		marginBottom: '500px',
	},
	div_formCmd: {
		padding: '1rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginLeft: '100px',
		fontFamily: 'Montserrat',
		width: '50%',
		marginTop: '40px',
	},
	span_subTitleCmd: {
		fontSize: 33,
		fontFamily: 'Montserrat',
		fontWeight: 'bold',
		color: '#FFFFFF',
		marginBottom: '20px',
	},
})

export default function HomePage() {
	const classes = useStyles()

	const [homeHover, setHomeHover] = useState(false)
	const [createAccountHover, setCreateAccountHover] = useState(false)
	const [contactHover, setContactHover] = useState(false)

	const [typeCommande, setTypeCommande] = useState()
	const [temporisation, setTemporisation] = useState()

	const history = useHistory()

	return (
		<div>
			<div
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					background:
						'url("http://141.94.27.46:3000/media/bg@2x.png")',
					backgroundSize: 'auto',
					backgroundRepeat: 'no-repeat',
					fontFamily: 'Montserrat',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<div
						style={{
							width: '30%',
							display: 'flex',
							alignItems: 'center',
							marginTop: 50,
							marginLeft: '60px',
						}}
					>
						<img alt='logo' src={Logo} style={{ height: 80 }} />
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								paddingTop: '15px',
							}}
						>
							<div style={{ padding: '1rem' }}>
								<span
									onMouseEnter={() => {
										setHomeHover(true)
									}}
									onMouseLeave={() => {
										setHomeHover(false)
									}}
									style={{
										color: 'white',
										...(homeHover ? style.hover : null),
									}}
								>
									Accueil
								</span>
							</div>
							<div style={{ padding: '1rem' }}>
								<span
									onClick={() =>
										history.push('/CreateAccount')
									}
									onMouseEnter={() => {
										setCreateAccountHover(true)
									}}
									onMouseLeave={() => {
										setCreateAccountHover(false)
									}}
									style={{
										color: 'white',
										...(createAccountHover
											? style.hover
											: null),
									}}
								>
									Créer un compte
								</span>
							</div>
							<div style={{ padding: '1rem' }}>
								<span
									onMouseEnter={() => {
										setContactHover(true)
									}}
									onMouseLeave={() => {
										setContactHover(false)
									}}
									style={{
										color: 'white',
										...(contactHover ? style.hover : null),
									}}
								>
									Nous contacter
								</span>
							</div>
						</div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							{' '}
							<button
								onClick={() => {
									history.push('/login')
								}}
								style={{
									padding: '1rem 2rem',
									background: '#FFFFFF',
									border: 'none',
									cursor: 'pointer',
									color: '#51C7F2',
									borderRadius: 7,
									marginTop: 20,
									marginLeft: 20,
									fontFamily: 'Montserrat',
									fontWeight: 'bold',
								}}
							>
								Espace Client
							</button>
							<button
								onClick={() => {
									history.push('/login')
								}}
								style={{
									padding: '1rem 2rem',
									background: '#50F5A9',
									border: 'none',
									cursor: 'pointer',
									color: 'white',
									borderRadius: 7,
									marginTop: 20,
									marginLeft: 20,
									fontFamily: 'Montserrat',
									fontWeight: 'bold',
								}}
							>
								Espace transporteur
							</button>
						</div>
					</div>
				</div>

				<div className={classes.div_formCmd}>
					<span className={classes.span_subTitleCmd}>
						Commander votre transporteur avec chauffeur en quelques
						clics !
					</span>
					<form className={classes.form_cmd}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								paddingBottom: '2rem',
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									paddingRight: '2rem',
								}}
							>
								<div style={{ paddingBottom: '2rem' }}>
									<input
										type='radio'
										id='course-a-course'
										checked={
											typeCommande === 'course-a-course'
										}
										onChange={(e) => {
											if (e.target.checked) {
												setTypeCommande(
													'course-a-course'
												)
											}
										}}
										name='type_commande'
									/>{' '}
									Course à course
								</div>
								<div>
									<input
										type='radio'
										id='immediat'
										checked={temporisation === 'immediat'}
										onChange={(e) => {
											if (e.target.checked) {
												setTemporisation('immediat')
											}
										}}
										name='temporisation'
									/>{' '}
									Immédiat
								</div>
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<div style={{ paddingBottom: '2rem' }}>
									<input
										type='radio'
										id='mise-a-disposition'
										checked={
											typeCommande ===
											'mise-a-disposition'
										}
										onChange={(e) => {
											if (e.target.checked) {
												setTypeCommande(
													'mise-a-disposition'
												)
											}
										}}
										name='type_commande'
									/>{' '}
									Mise à disposition
								</div>
								<div>
									<input
										type='radio'
										id='planifie'
										checked={temporisation === 'planifie'}
										onChange={(e) => {
											if (e.target.checked) {
												setTemporisation('planifie')
											}
										}}
										name='temporisation'
									/>{' '}
									Plannifié
								</div>
							</div>
						</div>

						<button
							onClick={() => {
								history.push(
									`/passer-commande?type_commande=${typeCommande}&temporisation=${temporisation}`
								)
							}}
							style={{
								color: 'white',
								fontFamily: 'Montserrat',
								background: '#51C7F2',
								border: 'none',
								padding: '1rem',
								cursor: 'pointer',
								fontWeight: 'bold',
								borderRadius: 6,
							}}
							//type='submit'
						>
							Commander
						</button>
					</form>
				</div>
				<div
					style={{
						width: '0',
						width: '100vw',
						height: '0',
						borderBottom: '60px solid white',
						borderLeft: '100vw solid transparent',
					}}
				></div>
			</div>

			<div style={{ padding: '1rem' }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<GradientText
						marginTop={'0'}
						size={'50px'}
						textAlign={'center'}
					>
						{'NOS SERVICES'.toUpperCase()}
					</GradientText>
					<span
						style={{
							fontSize: 20,
							fontFamily: 'Montserrat',
							textAlign: 'center',
						}}
					>
						La plate-forme du transport expliqué en 3 grandes
						étapes.
					</span>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						padding: '5rem',
					}}
				>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div style={{ textAlign: 'center', height: '120px' }}>
							<img
								alt='choices'
								style={{ placeSelf: 'center' }}
								src={choices}
							/>
						</div>
						<div style={{ textAlign: 'center' }}>
							<span className={classes.span_serviceTitle}>
								Passez commande en ligne
							</span>
						</div>
						<div className={classes.div_serviceDescription}>
							<span className={classes.span_serviceDescription}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est laborum.
							</span>
						</div>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div style={{ textAlign: 'center', height: '120px' }}>
							<img
								alt='truck'
								style={{ placeSelf: 'center' }}
								src={truck}
							/>
						</div>
						<div style={{ textAlign: 'center' }}>
							<span className={classes.span_serviceTitle}>
								Un transporteur est affecté a votre commande
							</span>
						</div>
						<div className={classes.div_serviceDescription}>
							<span className={classes.span_serviceDescription}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est laborum.
							</span>
						</div>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div style={{ textAlign: 'center', height: '120px' }}>
							<img
								alt='order'
								style={{ placeSelf: 'center' }}
								src={order}
							/>
						</div>
						<div style={{ textAlign: 'center' }}>
							<span className={classes.span_serviceTitle}>
								Suivez vos commandes en temps réel
							</span>
						</div>
						<div className={classes.div_serviceDescription}>
							<span className={classes.span_serviceDescription}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est laborum.
							</span>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
