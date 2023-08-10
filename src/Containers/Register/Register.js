import {
	GradientText,
	SubmitButton,
	SubmitButtonContainer,
} from '../PasserCommande/PasserCommande.styles'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import CommonHeader from '../../Components/CommonHeader/common-header.component'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Footer from '../../Components/Footer/footer.component'
import Modal from 'react-modal'
import { PUBLIC } from '../../api/base'
import UploadFile from '../../Components/UploadSingleFile/upload.component'
import { actions } from '../../redux/user'
import { loginAction } from '../../redux/auth'
import { makeStyles } from '@material-ui/core/styles'
import { signup } from '../../api/auth'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

Modal.setAppElement('#root')

const Styles = styled.div`
	.Typography {
		font-size: 30px;
		font-weight: 600;
		background: transparent
			linear-gradient(86deg, #03d5fc 0%, #29e5d3 55%, #50f5a9 100%) 0% 0%
			no-repeat padding-box;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin: 0;
	}
	.form {
		background: gainsboro;
		border-radius: 5px;
		padding: 40px;
	}
	.button {
		top: 30px;
		left: 50px;
		width: 253px;
		height: 50px;

		background-color: #50f5a9;
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		cursor: pointer;
	}
	.column_adress {
		float: left;
		width: 100%;
		padding: 10px;
		height: 100px; /* Should be removed. Only for demonstration */
	}
	.column {
		float: left;
		width: 50%;
		padding: 10px;
		height: 100px; /* Should be removed. Only for demonstration */
	}

	/* Clear floats after the columns */
	.row:after {
		content: '';
		display: table;
		clear: both;
	}
	.label {
		text-align: left;
		font: normal normal normal 18px/22px Montserrat;
		letter-spacing: 0px;
		color: #262626;
		opacity: 1;
		display: block;
		text-align: left;

		margin-bottom: 0.5em;
	}
	.input {
		background: #ffffff 0% 0% no-repeat padding-box;
		box-shadow: 0px 3px 6px #00000005;
		border-radius: 6px;
		opacity: 1;
		width: 100%;
		padding: 12px 20px;
		margin: 8px 0;
		display: inline-block;
		border: none;
		border-radius: 6px;
		box-sizing: border-box;
	}
	.input_adress {
		background: #ffffff 0% 0% no-repeat padding-box;
		box-shadow: 0px 3px 6px #00000005;
		border-radius: 6px;
		opacity: 1;
		width: 100%;
		padding: 12px 20px;
		margin: 8px 0;
		display: inline-block;
		border: 1px solid #ccc;
		border-radius: 6px;
		box-sizing: border-box;
	}
`

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		//backgroundColor: "gainsboro",
	},
	form: {
		width: '150%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
		backgroundColor: '#E4EAF0',
		padding: '20px',
		borderRadius: '10px',
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

function SignUp(props) {
	const history = useHistory()
	const query = useQuery()
	const classes = useStyles()
	const dispatch = useDispatch()

	const [modalIsOpen, setModalIsOpen] = useState(false)

	const [values, setValues] = React.useState({
		societe: '',
		siret: '',
		first_name: '',
		last_name: '',
		quality: '',
		email: '',
		password: '',
		password_verification: '',
		phone: '',
		role: 'client',
		city: '',
		country: '',
		kbis: null,
		logo: null,
		address: '',
		domain: '',
	})

	const handleOnChange = (value, name) => {
		setValues({ ...values, [name]: value })
	}

	useEffect(() => {
		dispatch(actions.logOut()) //reset state and clear any errors
	}, [dispatch])

	//if (isLoggedIn) return <Redirect to='/CreateAccount' />

	return (
		<Styles>
			<CommonHeader />
			<div
				style={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: 10,
				}}
			>
				<GradientText size='2rem'>
					{'Créer un Compte Client'.toUpperCase()}
				</GradientText>
			</div>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<form className={classes.form} noValidate>
						<div className='row'>
							<div className='column'>
								<label className='label'>Nom société</label>
								<input
									type='text'
									className='input'
									variant='outlined'
									placeholder=''
									required
									name='societe'
									autoComplete='current-societe'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>
							</div>
							<div className='column'>
								<label className='label'>SIRET</label>
								<input
									type='text'
									className='input'
									variant='outlined'
									placeholder=''
									required
									name='siret'
									autoComplete='current-siret'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>
							</div>
						</div>
						<div className='row'>
							<div className='column'>
								<label className='label'>Nom</label>
								<input
									type='text'
									className='input'
									variant='outlined'
									placeholder=''
									required
									name='first_name'
									autoComplete='current-first_name'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>
							</div>
							<div className='column'>
								<label className='label'>Pénom</label>
								<input
									type='text'
									className='input'
									variant='outlined'
									placeholder=''
									required
									name='last_name'
									autoComplete='current-last_name'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>
							</div>
						</div>
						<div className='row'>
							<div className='column'>
								<label className='label'>Qualité</label>
								<input
									type='text'
									className='input'
									variant='outlined'
									placeholder=''
									required
									name='quality'
									autoComplete='current-quality'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>
							</div>
							<div className='column'>
								<label className='label'>
									Domaine d'activité
								</label>
								<input
									type='text'
									className='input'
									variant='outlined'
									placeholder=''
									required
									name='domain'
									autoComplete='current-activity_domain'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>
							</div>
						</div>
						<div className='row'>
							<div className='column_adress'>
								<label className='label'>Adresse</label>
								<input
									type='text'
									className='input_adress'
									variant='outlined'
									placeholder=''
									required
									name='address'
									autoComplete='current-activity_adress'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>{' '}
							</div>
						</div>

						<div className='row'>
							<div className='column_adress'>
								<label className='label'>Ville</label>
								<input
									type='text'
									className='input_adress'
									variant='outlined'
									placeholder=''
									required
									name='city'
									autoComplete='current-activity_adress'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>{' '}
							</div>
						</div>

						<div className='row'>
							<div className='column_adress'>
								<label className='label'>Code Postal</label>
								<input
									type='text'
									className='input_adress'
									variant='outlined'
									placeholder=''
									required
									name='postalCode'
									autoComplete='current-activity_adress'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>{' '}
							</div>
						</div>
						<div className='row'>
							<div className='column'>
								<label className='label'>Téléphone</label>
								<input
									type='text'
									className='input'
									variant='outlined'
									placeholder=''
									required
									name='phone'
									autoComplete='current-phone'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>{' '}
							</div>
							<div className='column'>
								<label className='label'>Adresse email</label>
								<input
									type='text'
									className='input'
									variant='outlined'
									placeholder=''
									required
									name='email'
									autoComplete='current-email'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>{' '}
							</div>
						</div>
						<div className='row'>
							<div className='column'>
								<label className='label'>Mot de passe </label>
								<input
									type='password'
									id='password'
									className='input'
									variant='outlined'
									placeholder=''
									required
									name='password'
									minLength={8}
									autoComplete='current-password'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>{' '}
							</div>
							<div className='column'>
								<label className='label'>
									Confirmer mot de passe
								</label>
								<input
									type='password'
									id='password_verification'
									className='input'
									variant='outlined'
									placeholder=''
									required
									name='password_verification'
									minLength={8}
									autoComplete='current-password_verification'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>{' '}
							</div>
						</div>
						{/* <div className='row'>
							<div className='column'>
								<label className='label'>Logo(PNG ou JPG)</label>
								<input
									type='text'
									className='input'
									variant='outlined'
									required
									
									name='logo'
									autoComplete='current-logo'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>
							</div>
						</div>
						<div className='row'>
							<div className='column'>
								<label className='label'>Kbis(PDF ou JPG)</label>
								<input
									type='text'
									className='input'
									variant='outlined'
									required
									
									name='kbis'
									autoComplete='current-kbis'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>
							</div>
						</div> */}

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginBottom: '1rem',
								width: '100%',
								fontFamily: 'Montserrat',
								marginLeft: 10,
								marginTop: 10,
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<span
									style={{
										marginBottom: '1rem',
										color: 'black',
										fontSize: 14,
									}}
								>
									Logo(PNG ou JPG)
								</span>
								<span
									style={{
										marginBottom: '1rem',
										color: '#838EAB',
										fontSize: 14,
									}}
								>
									(Facultatif)
								</span>
							</div>
							<UploadFile
								name='logo'
								accept='.jpg, .png'
								onFile={(file) =>
									setValues({ ...values, logo: file })
								}
							/>

							{values.logo && (
								<div>
									<img
										style={{
											width: 100,
											height: 100,
											borderRadius: 5,
											objectFit: 'cover',
										}}
										src={`${PUBLIC}/${values.logo.name}`}
									/>
								</div>
							)}
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								fontFamily: 'Montserrat',
								marginLeft: 10,
								marginTop: 10,
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<span
									style={{
										marginBottom: '1rem',
										color: 'black',
										fontSize: 14,
									}}
								>
									KBIS (PDF ou JPG)
								</span>
								<span
									style={{
										marginBottom: '1rem',
										color: '#838EAB',
										fontSize: 14,
									}}
								>
									(Facultatif)
								</span>
							</div>
							<UploadFile
								name='kbis'
								accept='.jpg, .png, .pdf'
								onFile={(file) =>
									setValues({ ...values, kbis: file })
								}
							/>

							{values.kbis &&
								values.kbis.mimetype !== 'application/pdf' && (
									<div>
										<img
											style={{
												width: 100,
												height: 100,
												borderRadius: 5,
												objectFit: 'cover',
											}}
											src={`${PUBLIC}/${values.kbis.name}`}
										/>
									</div>
								)}
						</div>
					</form>
				</div>

				<div style={{ height: '1rem' }} />

				<SubmitButtonContainer>
					<SubmitButton
						//type='submit'
						onClick={async () => {
							try {
								let _values = { ...values }

								if (values.password.length < 8) {
									toast.error('vérifier votre mot de passe', {
										style: {
											fontFamily: 'Montserrat',
										},
									})

									return
								}

								if (
									values.password !==
									values.password_verification
								) {
									toast.error('vérifier votre mot de passe', {
										style: {
											fontFamily: 'Montserrat',
										},
									})

									return
								}

								_values.logo = _values.logo?.id
								_values.kbis = _values.kbis?.id

								const res = await signup(_values)

								dispatch(loginAction(res.user, res.token))

								setModalIsOpen(true)
							} catch (error) {
								console.log(error)
								const data = error?.response?.data?.errors
								if (data.msg === 'EMAIL_ALREADY_EXISTS') {
									toast.error(
										'Ce mail est déjà utilisé par un autre utilisateur.',
										{
											style: {
												fontFamily: 'Montserrat',
											},
										}
									)
								}
							}
						}}
					>
						Créer un compte
					</SubmitButton>
				</SubmitButtonContainer>
			</Container>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => {}}
				style={{
					overlay: {
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.45)',
					},
					content: {
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						transform: 'translate(-50%, -50%)',
						borderRadius: 19,
					},
				}}
				contentLabel='Example Modal'
			>
				<div
					style={{
						width: '35rem',
						fontFamily: 'Montserrat',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 15,
						textAlign: 'center',
					}}
				>
					<GradientText>{'Félicitation'.toUpperCase()}</GradientText>

					<div
						style={{
							marginTop: 20,
						}}
					>
						La création de votre compte a bien été enregistré 😃
					</div>

					<button
						onClick={() => {
							if (query.get('cid')) {
								history.push(`/commandes/new?cid=true`)
							} else {
								history.push('/commandes/new')
							}
						}}
						style={{
							padding: '0.5rem 1rem',
							background: '#50F5A9',
							border: 'none',
							cursor: 'pointer',
							color: 'white',
							borderRadius: 7,
							marginTop: 30,
						}}
					>
						OK
					</button>
				</div>
			</Modal>

			<Footer />
		</Styles>
	)
}

export default SignUp
