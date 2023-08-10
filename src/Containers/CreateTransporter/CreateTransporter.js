import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Redirect } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Vehicule from '../vehicule/vehicule';
import { actions } from '../../redux/user'
import { browserHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import   { useState } from 'react';
import { withRouter } from 'react-router-dom';

const Styles = styled.div`
.title 
{  text-transform: uppercase;
    display: inline-block;
    white-space: nowrap;
    margin-top: 20px;
    margin-bottom: -200px;

    font-size: 25px;
    font-weight: 600;
background: transparent linear-gradient(86deg, #03D5FC 0%, #29E5D3 55%, #50F5A9 100%) 0% 0% no-repeat padding-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: left   ;


}
.Typography 
{  text-transform: uppercase;
    display: inline-block;
    white-space: nowrap;
    margin-top: 20px;

    font-size: 50px;
    font-weight: 600;
background: transparent linear-gradient(86deg, #03D5FC 0%, #29E5D3 55%, #50F5A9 100%) 0% 0% no-repeat padding-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: left   ;


}
 .form {
     background : gainsboro;
     border-radius: 5px;
     padding: 40px;
   
 }
 .button{
    top: -70px;
    left: 300px;
    width: 253px;
    height: 50px;
    
    background-color: #50F5A9;
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
    width: 100%;
    padding: 10px;
    height: 100px; /* Should be removed. Only for demonstration */
  }
  
  /* Clear floats after the columns */
  .row:after {
    content: "";
    display: table;
    clear: both;
  }
  .label{
    text-align: left;
    font: normal normal normal 18px/22px Montserrat;
    letter-spacing: 0px;
    color: #262626;
    opacity: 1;    
    display: block;
    clear: both;
    margin-right:15px;
    font: normal normal normal 16px/22px Montserrat;

    margin-bottom: 0.5em;

  }
  .input{
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000005;
    border-radius: 6px;
    opacity: 1;
    width: 50%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
  }
  .input_adress{
    background: #FFFFFF 0% 0% no-repeat padding-box;
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
.vehicule{
    text-align: left;
    font: normal normal normal 18px/22px Montserrat;
    letter-spacing: 0px;
    color: #262626;
    opacity: 1;    
    display: block;

    margin-bottom: 0.5em;
    font: normal normal bold 40px/49px Montserrat;
    letter-spacing: 0px;
    color: #51C7F2;
    opacity: 1;
}

.btnVehicule{
    background: #50F5A9 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #00000005;
opacity: 1;
}
.divehicule{
    top: 70px;
    left: 300px;
    width: 500px;
    height: 100px;
    margin-left: -100px;
}
.columnvehic{
    float: left;
    width: 50%;
    padding: 10px;
    height: 100px; /* Should be removed. Only for demonstration */
    display: inline-block; width:47%;

}
.columnv{
    float: left;
    width: 50%;
    padding: 10px;
    height: 100px; /* Should be removed. Only for demonstration */
    display: inline-block; width:47%;

}

.dropdown{
    background: #00000 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000005;
    border-radius: 6px;
    opacity: 1;
    width: 75%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
  }
  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 10px;
  }
  .grid-item {
    padding: 20px;
    font-size: 30px;
    text-align: left;
  }
  .labelradio{
    text-align: left;
    font: normal normal normal 17px/20px Montserrat;
    letter-spacing: 0px;
    color: #838EAB;
    opacity: 1;
  }
  .grid-container1 {
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 5px;
  }
  .grid-item1 {
    padding: 20px;
    font-size: 30px;
    text-align: left;
  }
.hr{
opacity: 0.21;
}

.popup{

}
`;







const useStyles = makeStyles(theme => ({
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
        backgroundColor: "#E4EAF0" ,
        padding: "20px",
        borderRadius: "10px",

        

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function CreateTransporter() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null)
    const signupError = useSelector(state => state.user.signupError)
   // const isSignupError = signupError ? true : false
    const classes = useStyles()
    const dispatch = useDispatch()
    //this.props.history.push('/CreateAccount') 
    const [values, setValues] = React.useState({
        societe: '',
        first_name: '',
        quality:'',
        adress:'',
        phone:'',
        password:'',
        logo:'',
        kbis:''
        })
        const [isOpen, setIsOpen] = useState(false);
 
        const togglePopup = () => {
          setIsOpen(!isOpen);
        }
     
        

    const handleOnChange = (value, name) => {
        setValues({ ...values, [name]: value })
    }

    useEffect(() => {
        dispatch(actions.logOut()) //reset state and clear any errors
    }, [dispatch])

    if (isLoggedIn) return <Redirect to="/CreateAccount" />

    return (
        <Styles>
        <Container  component="main" maxWidth="xs">
        {isOpen && <Vehicule
            content={<>
                        <h3 className="title">ajouter vehicule</h3>

                   <form className="popup" noValidate>
        <div class="row">
 <div class="grid-container1">
             <div class="grid-item1">                    
                     <label class="label" >Matériels de manutention</label>
                     <input type="radio" id="Diable" name="gender" value="Diable"/>
  <label for="label" class="labelradio">Diable</label>
            </div>
            <div class="grid-item1">                     
                <label class="label" ><br></br></label>
                      <input type= "radio"  id="Transpalette" name="gender" value="Transpalette" variant="outlined"
                        />  
                          <label for="label" class="labelradio">Transpalette manuel</label>

            </div>
            
     </div>                     <div class="popup">
                     <label class="label" >Type de trasport</label>
                     <input type= "text" class="input" variant="outlined"
                                          placeholder="Wayne"

                                required
                                fullWidth
                                name="societe"  
                                 autoComplete="current-societe"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>  
                                <hr className="hr"></hr>

                    </div>

                    <div class="">
                     <label class="label" >Options Véhicule léger</label>
                     <input type= "text" class="input" variant="outlined"
                                          placeholder="Wayne"

                                required
                                fullWidth
                                name="societe"  
                                 autoComplete="current-societe"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>  
                    </div>
                    <div class="">
                     <label class="label" >Options poids lourds</label>
                     <input type= "text" class="input" variant="outlined"
                                          placeholder="Wayne"

                                required
                                fullWidth
                                name="societe"  
                                 autoComplete="current-societe"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>  
                    </div>
                    <div class="">
                     <label class="label" >Nombre de véhicules tels que celui-ci</label>
                     <input type= "text" class="input" variant="outlined"
                                          placeholder="Wayne"

                                required
                                fullWidth
                                name="societe"  
                                 autoComplete="current-societe"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>  
                    </div>

                    </div>
</form>
            </>}
            handleClose={togglePopup}
          />}
            <p className="Typography">
                    Créer un compte Transporteur
        </p>

            <div className={classes.paper}>
              
                <form className={classes.form} noValidate>
                <div class="row">
                    <div class="column">
                     <label class="label" >Nom société</label>
                     <input type= "text" class="input" variant="outlined"
                                          placeholder="Wayne"

                                required
                                fullWidth
                                name="societe"  
                                 autoComplete="current-societe"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>  
                    </div>
        
                    <div class="column">
                     <label class="label" >Nom</label>
                        <input type= "text" class="input" variant="outlined"
                                             placeholder="Doe"

                                required
                                fullWidth
                                name="first_name"  
                                 autoComplete="current-first_name"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>  
                    </div>
              
                    <div class="column">
                     <label class="label" >Qualité</label>
                     <input type= "text" class="input" variant="outlined"
                                          placeholder="Directeur d’exploitation"

                                required
                                fullWidth
                                name="quality"  
                                 autoComplete="current-quality"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>  
                    </div>

                    <div class="column_adress">
                     <label class="label" >Adresse</label>
                     <input type= "text" class="input_adress" variant="outlined"
                     placeholder="54 rue avenue de la grande armée, 75017, Paris, France"
                                required
                                fullWidth
                                name="adress"  
                                 autoComplete="current-activity_adress"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>                     </div>

<div class="column_adress">
                     <label class="label" >Ville</label>
                     <input type= "text" class="input_adress" variant="outlined"
                     placeholder="Paris"
                                fullWidth
                                name="city"  
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>                     </div>


<div class="column_adress">
                     <label class="label" >Code Postal</label>
                     <input type= "text" class="input_adress" variant="outlined"
                     placeholder="75017"
                                fullWidth
                                name="postalCode"  
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>                     </div>


                    <div class="column">
                     <label class="label" >Téléphone</label>
                     <input type= "text" class="input" variant="outlined"
                                          placeholder="(0) 01 45 66 32 88"

                                required
                                fullWidth
                                name="phone"  
                                 autoComplete="current-phone"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>                     </div>
                    <div class="column">
                     <label class="label" >Adresse email</label>
                     <input type= "text" class="input" variant="outlined"
                                          placeholder="John.doe@wayne.fr"

                                required
                                fullWidth
                                name="email"  
                                 autoComplete="current-email"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>                     </div>
                    <div class="column">
                     <label class="label" >Mot de passe </label>
                     <input type= "password" class="input" variant="outlined"
                                          placeholder="************"

                                required
                                fullWidth
                                name="password"  
                                 autoComplete="current-password"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>                     </div>
                    <div class="column">
                     <label class="label" >Logo(PNG ou JPG)</label>
                     <input type= "text" class="input" variant="outlined"
                                required
                                fullWidth
                                name="logo"  
                                 autoComplete="current-logo"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>                    
                    </div>
                    <div class="column">
                     <label class="label" >Kbis(PDF ou JPG)</label> 
                     <input type= "text" class="input" variant="outlined"
                                required
                                fullWidth
                                name="kbis"  
                                 autoComplete="current-kbis"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>                    
                    </div>
       
                </div>
                </form>
          
                <div className="divehicule" >
                    <p className="vehicule">Véhicule</p>
                    <Button className="button"
                                        //className={classes.submit}
                                        onClick={togglePopup} >
                                        Ajouter véhicule                    
                    </Button>
       
                </div>
        <form className={classes.form} noValidate>
        <div class="row">
                    <div class="columnvehic">
                     <label class="label" >Détails</label>
                     <input type= "text" class="input" variant="outlined"
                                          placeholder="Wayne"

                                required
                                fullWidth
                                name="societe"  
                                 autoComplete="current-societe"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>  
                    </div>
                    <div class="columnvehic">
                     <label class="label" >Options</label>
                     <input type= "text" class="input" variant="outlined"
                                          placeholder="Wayne"

                                required
                                fullWidth
                                name="societe"  
                                 autoComplete="current-societe"
                                onChange={(e) => handleOnChange(e.target.value, e.target.name)}/>  
                    </div>

                    </div>
</form>
<div className="divehicule" >
                    <p className="vehicule">Rippeur</p>
                </div>
        <form className={classes.form} noValidate>
        <div class="row">
     
                    <div class="columnvehic">
                     <label class="label" >Nombre de ripper en plus du chauffeur</label>
                     <select  class="dropdown" >
                         <option>
                             aaaaa
                         </option>
                         <option>
                             aaaaa
                         </option>

                     </select>
                    
                    </div>

                    </div>
</form>
<div className="divehicule" >
                    <p className="vehicule">Matériels supplémentaire</p>
                </div>
    <form className={classes.form} noValidate>
    <div class="grid-container1">
             <div class="grid-item1">                    
                     <label class="label" >Matériels de manutention</label>
                     <input type="radio" id="Diable" name="gender" value="Diable"/>
  <label for="label" class="labelradio">Diable</label>
            </div>
            <div class="grid-item1">                     
                <label class="label" ><br></br></label>
                      <input type= "radio"  id="Transpalette" name="gender" value="Transpalette" variant="outlined"
                        />  
                          <label for="label" class="labelradio">Transpalette manuel</label>

            </div>
            
     </div>    
             
    <div class="grid-container">
             <div class="grid-item">                    
                     <label class="label" >Epi</label>
                     <input type="radio" id="Casque" name="gender" value="Casque"/>
                        <label for="label" class="labelradio">Casque</label>
            </div>
            <div class="grid-item">                     
                <label class="label" ><br></br></label>
                      <input type= "radio"  variant="outlined" id="Gants" name="gender" value="Gants"
                        />  
                          <label for="label" class="labelradio">Gants</label>

            </div>
            <div class="grid-item">                     
                <label class="label" ><br></br></label>
                      <input type= "radio"  variant="outlined" id="Masque" name="gender" value="Masque"
                        />  
                          <label for="label" class="labelradio">Masque</label>

            </div>
            
            <div class="grid-item">                     
                <label class="label" ><br></br></label>
                      <input type= "radio"  variant="outlined" id="Lunettes" name="gender" value="Lunettes"
                        />  
                          <label for="label" class="labelradio">Lunettes</label>

            </div>
            <div class="grid-item">                     
                <label class="label" ><br></br></label>
                      <input type= "radio"  variant="outlined" id="Chaussure" name="gender" value="Chaussure"
                        />  
                          <label for="label" class="labelradio">Chaussure de sécurité</label>

            </div>

            <div class="grid-item">                     
                <label class="label" ><br></br></label>
                      <input type= "radio"  variant="outlined" id="Gilet" name="gender" value="Gilet"
                        />  
                          <label for="label" class="labelradio">Gilet de visibilité</label>

            </div>

    </div>
</form>

            </div>

    





            <Button className="btnVehicule"
                       fullWidth
                        variant="contained"
                        color="primary"
                        //className={classes.submit}
                        onClick={() => dispatch(actions.signUp(values)) 
                            
                        }
                    >
S’inscrire                    </Button>

            <Box mt={5}>
            </Box>
        </Container>
        </Styles>
    )
}