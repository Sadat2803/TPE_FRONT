import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { actions } from '../../redux/user'

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
		border-radius: 6px;
		padding: 50px;
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
		padding: 15px;
		height: 100px; /* Should be removed. Only for demonstration */
	}
	.columnRadio {
		float: left;
		width: 35%;
		padding: 15px;
		height: 100px; /* Should be removed. Only for demonstration */
		display: inline-block;
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
		border: 1px solid #ccc;
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
	.labelradio {
		text-align: left;
		font: normal normal normal 17px/20px Montserrat;
		letter-spacing: 0px;
		color: #838eab;
		opacity: 1;
		left: 250px;
		display: block;
		padding: 0px 1em 0px 8px;
	}
	.input[type='radio'],
	input.radio {
		float: left;
		clear: none;
		margin: 2px 0 0 2px;
	}
	.columnfemme {
		float: left;
		width: 30%;
		padding: 44px;
		height: 100px; /* Should be removed. Only for demonstration */
	}
	.radio {
		background: #ffffff 0% 0% no-repeat padding-box;
		border: 1px solid #838eab;
		opacity: 1;
	}
	.columnP {
		float: left;
		width: 30%;
		padding: 15px;
		height: 100px; /* Should be removed. Only for demonstration */
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
		padding: '30px',
		borderRadius: '10px',
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

export default function DetailChauffeur() {
	//  const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null)
	//const signupError = useSelector(state => state.user.signupError)
	// const isSignupError = signupError ? true : false
	const classes = useStyles()
	const dispatch = useDispatch()
	//this.props.history.push('/CreateAccount')
	const [values, setValues] = React.useState({
		sexe: '',
		type_vehicule: '',
		first_name: '',
		last_name: '',
		adresse: '',
		phone: '',
		email: '',

		date_naiss: '',
		date_embauche: '',
		permis: '',
		fimo: '',
		danger: '',
		password: '',
	})

	const handleOnChange = (value, name) => {
		setValues({ ...values, [name]: value })
	}

	useEffect(() => {
		dispatch(actions.logOut()) //reset state and clear any errors
	}, [dispatch])

	// if (isLoggedIn) return <Redirect to="/CreateAccount" />

	return (
		<Styles>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<Typography className='Typography'>
						Détails Chauffeur
					</Typography>
					<form className={classes.form} noValidate>
						<div class='row'>
							<div class='columnRadio'>
								<label class='label'>Sexe</label>
								<input
									type='radio'
									className='radio'
									id='Homme'
									name='gender'
									value='Homme'
								/>
								<label for='label' class='labelradio'>
									Homme
								</label>
							</div>
							<div class='columnRadio'>
								<label class='label'>
									&nbsp;&nbsp;&nbsp;&nbsp;
								</label>

								<input
									type='radio'
									className='radio'
									id='Femme'
									name='gender'
									value='Femme'
								/>
								<label for='label' class='labelradio'>
									Femme
								</label>
							</div>
						</div>
						<div class='row'>
							<div class='columnRadio'>
								<label class='label'>Type de véhicule</label>
								<input
									type='radio'
									className='radio'
									id='vehicule_leger'
									name='vehicule'
									value='vehicule_leger'
								/>
								<label for='label' class='labelradio'>
									Véhicule Léger
								</label>
							</div>
							<div class='columnRadio'>
								<label class='label'>
									&nbsp;&nbsp;&nbsp;&nbsp;
								</label>

								<input
									type='radio'
									className='radio'
									id='vehicule_lourd'
									name='vehicule'
									value='vehicule_lourd'
								/>
								<label for='label' class='labelradio'>
									Poids lourds
								</label>
							</div>
						</div>
						<div class='row'>
							<div class='column'>
								<label class='label'>Nom</label>
								<input
									type='text'
									class='input'
									variant='outlined'
									placeholder='Doe'
									required
									fullWidth
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
							<div class='column'>
								<label class='label'>Pénom</label>
								<input
									type='text'
									class='input'
									variant='outlined'
									placeholder='John'
									required
									fullWidth
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

						<div class='row'>
							<div class='column_adress'>
								<label class='label'>Adresse</label>
								<input
									type='text'
									class='input_adress'
									variant='outlined'
									placeholder='54 rue avenue de la grande armée, 75017, Paris, France'
									required
									fullWidth
									name='adress'
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
						<div class='row'>
							<div class='column'>
								<label class='label'>Téléphone</label>
								<input
									type='text'
									class='input'
									variant='outlined'
									placeholder='(0) 01 45 66 32 88'
									required
									fullWidth
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
							<div class='column'>
								<label class='label'>Adresse email</label>
								<input
									type='text'
									class='input'
									variant='outlined'
									placeholder='John.doe@wayne.fr'
									required
									fullWidth
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
						<div class='row'>
							<div class='column'>
								<label class='label'>Date de naissance </label>
								<input
									type='date'
									class='input'
									variant='outlined'
									placeholder='************'
									required
									fullWidth
									name='password'
									autoComplete='current-password'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>{' '}
							</div>
							<div class='column'>
								<label class='label'>Date d’embauche</label>
								<input
									type='date'
									class='input'
									variant='outlined'
									placeholder='************'
									required
									fullWidth
									name='password_verification'
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

						<div class='row'>
							<div class='columnP'>
								<label class='label'>Permis</label>

								<input
									type='radio'
									className='radio'
									id='Leger'
									name='Permis'
									value='Leger'
								/>
								<label for='label' class='labelradio'>
									Léger
								</label>
							</div>
							<div class='columnP'>
								<label class='label'>
									&nbsp;&nbsp;&nbsp;&nbsp;
								</label>

								<input
									type='radio'
									className='radio'
									id='Lourds'
									name='Permis'
									value='Lourds'
								/>
								<label for='label' class='labelradio'>
									Lourds
								</label>
							</div>
							<div class='columnP'>
								<label class='label'>
									&nbsp;&nbsp;&nbsp;&nbsp;
								</label>

								<input
									type='radio'
									className='radio'
									id='Super_lourds'
									name='Permis'
									value='Super_lourds'
								/>
								<label for='label' class='labelradio'>
									Super lourds
								</label>
							</div>
						</div>

						<div class='row'>
							<div class='column'>
								<label class='label'>Fimo</label>

								<input
									type='radio'
									className='radio'
									id='fimo'
									name='fimo'
									value='oui'
								/>
								<label for='label' class='labelradio'>
									Oui
								</label>
							</div>
						</div>

						<div class='row'>
							<div class='column'>
								<label class='label'>Matière dangereuse</label>

								<input
									type='radio'
									className='radio'
									id='danger'
									name='danger'
									value='oui'
								/>
								<label for='label' class='labelradio'>
									Oui
								</label>
							</div>
						</div>
						<div class='row'>
							<div class='column'>
								<label class='label'>Mot de passe </label>
								<input
									type='password'
									class='input'
									variant='outlined'
									placeholder='************'
									required
									fullWidth
									name='password'
									autoComplete='current-password'
									onChange={(e) =>
										handleOnChange(
											e.target.value,
											e.target.name
										)
									}
								/>{' '}
							</div>
							<div class='column'>
								<label class='label'>
									Confirmer mot de passe
								</label>
								<input
									type='password'
									class='input'
									variant='outlined'
									placeholder='************'
									required
									fullWidth
									name='password_verification'
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
					</form>
				</div>
				<Button
					className='button'
					fullWidth
					variant='contained'
					color='primary'
					//className={classes.submit}
					onClick={() => dispatch(actions.signUp(values))}
				>
					Enregistrer{' '}
				</Button>

				<Box mt={5}></Box>
			</Container>
		</Styles>
	)
}
