import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import logo from '../../assets/img/logo_signin.png'


import { actions } from '../../redux/user'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        margin: '0',
      
        
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        backgroundColor: "#E4EAF0" ,
        padding: "20px",
        borderRadius: "31px",

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))
const Styles = styled.div`
.column {
    float: left;
    width: 50%;
    padding: 10px;
    height: 100px; /* Should be removed. Only for demonstration */
  }
  
  /* Clear floats after the columns */
  .row:after {
    content: "";
    display: flex;
    clear: both;
    margin-left: 200px;

  }
.button{
    background: #51C7F2 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #00000005;
border-radius: 6px;
opacity: 1;
 }


.label{
    letter-spacing: 0px;
    color: #262626;
    opacity: 1;
    display: block;
    text-align: left;
    margin-bottom: 0.5em;
}  }
  .input{
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000005;
    border-radius: 6px;
    opacity: 1;
    top: 460px;
    left: 740px;
    width: 300px;
    height: 50px;
      }

      .bg {
        /* The image used */
   
        background-image: url("../../assets/img/logo_signin.png");
      
        /* Full height */
        height: 100%; 
      
        /* Center and scale the image nicely */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .labelpassword{

        text-align: left;
        font: normal normal normal 10px/10px Montserrat;
        letter-spacing: 0px;
        color: #413F4D;
        opacity: 1;
      }
`;


export default function SignIn() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null)
    const loginError = useSelector(state => state.user.loginError)
    const isLoginError = loginError ? true : false

    const classes = useStyles()
    const dispatch = useDispatch()

    const [values, setValues] = React.useState({
        email: '',
        password: ''
    })


    const handleOnChange = (value, name) => {
        setValues({ ...values, [name]: value })
    }

    useEffect(() => {
        dispatch(actions.logOut()) //reset state and clear any errors
    }, [dispatch])


    if (isLoggedIn) return <Redirect to="/Home" />

    return (
        <Styles>
        <Container component="main" maxWidth="xs"
        style={{backgroundImage: `url(${logo})`,
  backgroundSize: 'cover',
  height: '100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',

}}>
            <CssBaseline />
            <div className="bg">
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} noValidate>
                <div class="row">
                    <div class="column">
                     <label class="label" >Kbis(PDF ou JPG)</label> 
                     <input type= "text" class="input"                         
                     error={isLoginError}
                       placeholder="Email"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        autoComplete="email"
                        helperText={loginError}
                        onChange={(e) => handleOnChange(e.target.value, e.target.name)}
/>                    
                    </div>
                    
                </div>
                <div class="row">
                    <div class="column">
                     <label class="label" >Mot de passe</label> 
                     <input type= "text" class="input"
                     placeholder="Mot de passe…"
                        error={isLoginError}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => handleOnChange(e.target.value, e.target.name)}
/>                    
                    </div>
                    <a href="">                    <label class="labelpassword" >Mot de passe oublié ?</label> 
</a>

                </div>
                
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="button"
                        onClick={() => dispatch(actions.signIn(values))}
                    >
                        Connexion
          </Button>
                    <Grid container>
                     
                        <Grid item>
                            <Link component={RouterLink} to="/signup" variant="body2" href="#" className="labelpassword">
                                {"Vous n’avez pas de compte ? Inscrivez-vous"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
        </Styles>
    )
}