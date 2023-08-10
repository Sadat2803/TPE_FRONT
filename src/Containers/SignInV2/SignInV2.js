import Footer from '../../Components/Footer/footer.component'
import Logo from '../../assets/img/logo-TPE@2x.png'
import React from 'react'
import { login } from '../../api/auth'
import { loginAction } from '../../redux/auth'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useSnackbar } from 'react-simple-snackbar'

function SignInV2() {
	const history = useHistory()
	const dispatch = useDispatch()
	const { register, handleSubmit } = useForm()
	const [openSnackbar] = useSnackbar({
		position: 'top-center',
		style: {
			color: 'black',
			background: 'white',
			fontFamily: 'Montserrat',
		},
		closeStyle: {
			fontSize: '2rem',
			color: '#51C7F2',
		},
	})

	const onSubmit = async (data) => {
		try {
			const res = await login(data.email, data.password)
			dispatch(loginAction(res.user, res.token))

			if (res.user.role === 'chauffeur') {
				history.push('/chauffeur/transports')
			}

			if (res.user.role === 'client') {
				history.push('/commandes/new')
			}

			if (res.user.role === 'transporter') {
				if (res.user.status !== 'ok') {
					openSnackbar(
						"Votre demande de création d'un compte transporteur sur notre plate-forme est en cours de traitement, vous recevrez prochainement un mail avec nos indications. À très vite 😉",
						15000
					)
					// toast(
					// 	"Votre demande de création d'un compte transporteur sur notre plate-forme est en cours de traitement, vous recevrez prochainement un mail avec nos indications. À très vite 😉",
					// 	{
					// 		style: {
					// 			fontFamily: 'Montserrat',
					// 			borderRadius: 0,
					// 			//width: '50rem',
					// 		},
					// 		duration: 15000,
					// 	}
					// )

					return
				}
				history.push('/transports')
			}

			if (res.user.role === 'admin') {
				history.push('/admin/clients')
			}
		} catch (error) {
			console.log(error)

			toast.error(
				'Erreur de connexion, veuillez vérifier votre email et votre mot de passe.',
				{
					style: {
						fontFamily: 'Montserrat',
					},
				}
			)
		}
	}

	return (
		<div>
			<div
				style={{
					height: '95vh',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					background:
						'url("http://141.94.27.46:3000/media/bg@2x.png")',
					backgroundSize: 'auto',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<div
					style={{
						width: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: 50,
					}}
				>
					<img src={Logo} style={{ height: 80 }} alt='' />
				</div>

				<div
					style={{
						padding: '1rem',
						height: '80%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						//background: 'red',
						fontFamily: 'Montserrat',
					}}
				>
					<form
						onSubmit={handleSubmit(onSubmit)}
						style={{
							background: '#E4EAF0',
							// width: '25rem',
							// height: '20rem',
							display: 'flex',
							flexDirection: 'column',
							padding: '3rem 4rem',
							borderRadius: 30,
						}}
					>
						<label
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginBottom: '1rem',
							}}
						>
							<span
								style={{
									marginBottom: 7,
									fontSize: 14,
								}}
							>
								Adresse email
							</span>
							<input
								{...register('email', {
									required: true,
									pattern: /^\S+@\S+$/i,
								})}
								style={{
									padding: '1rem',
									fontFamily: 'Montserrat',
									color: '#95989A',
									borderRadius: 5,
									border: 'none',
									background: 'white',
								}}
								name='email'
								placeholder='Email'
								type='text'
							/>
						</label>

						<label
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginBottom: '1rem',
							}}
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<span
									style={{
										marginBottom: 7,
										fontSize: 14,
									}}
								>
									Mot de passe
								</span>
								<span
									style={{
										//marginBottom: 7,
										fontSize: 12,
									}}
								>
									Mot de passe oublié ?
								</span>
							</div>
							<input
								{...register('password', {
									required: true,
									minLength: 8,
								})}
								style={{
									padding: '1rem',
									fontFamily: 'Montserrat',
									color: '#95989A',
									borderRadius: 5,
									border: 'none',
									background: 'white',
								}}
								name='password'
								placeholder='Mot de passe'
								type='password'
							/>
						</label>

						<button
							style={{
								color: 'white',
								fontFamily: 'Montserrat',
								background: '#51C7F2',
								border: 'none',
								padding: '1rem',
								cursor: 'pointer',
								fontWeight: 'bold',
								borderRadius: 6,
								marginBottom: '1rem',
							}}
							type='submit'
						>
							Connexion
						</button>

						<span
							onClick={() => {
								history.push('/CreateAccount')
							}}
							style={{
								fontSize: 14,
								cursor: 'pointer',
							}}
						>
							Vous n'avez pas de compte ? Inscrivez-vous
						</span>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default SignInV2
