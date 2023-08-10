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
  }
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
`;


export default function SignIn2() {
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
        <div className="bg"></div>
    )}