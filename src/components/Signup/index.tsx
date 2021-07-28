import React, {useState} from 'react';

import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { SignupStyle } from './style';
import SignUpValidation from './SignUpValidation';
import UserService from '../../services/UserService';
import IUserData from '../../services/IUserData';
import LoginUserService from '../../services/LoginUserService';
import ILoginUserData from '../../services/ILoginUserData';

import { Link, useLocation } from 'react-router-dom';

import {useHistory} from "react-router-dom";

const Signup: React.FC<{ onHandleToHome: Function }> = ({ onHandleToHome }) => {

	const [showNameWarning, setNameWarning] = useState(false);
	const [showEmailWarning, setEmailWarning] = useState(false);
	const [showPassWarning, setPassWarning] = useState(false);
	const [disableConfirmPass, setDisableConfirmPass] = useState(true);
	const [showConfirmPassWarning, setConfirmPassWarning] = useState(false);

	const [nameData, setNameData] = useState<string>();
	const [emailData, setEmailData] = useState<string>();
	const [passwordData, setPasswordData] = useState<string>();
	const [confirmPassData, setConfirmPassData] = useState<string>();
	const [disableSignUp, setDisableSignUp] = useState(true);
	const [acceptTerms, setAcceptTerms] = useState(false);

	const [openAlert, setOpenAlert] = useState(false);



	const handleName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setNameData(e.target.value);
		let validation = SignUpValidation.validateName(e.target.value);
		setNameWarning(!validation);


		let emailCheck = emailData != undefined && !!SignUpValidation.validateEmail(emailData as string);
		let passwordCheck = passwordData != undefined && SignUpValidation.validatePassword(passwordData as string);
		let confirmPassCheck = confirmPassData != undefined && (confirmPassData == passwordData);

		setDisableSignUp(!(validation && emailCheck && passwordCheck && confirmPassCheck && acceptTerms));

	}

	const handleEmail = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setEmailData(e.target.value);
		let validation = SignUpValidation.validateEmail(e.target.value);
		setEmailWarning(!validation);


		let nameCheck = nameData != undefined && SignUpValidation.validateName(nameData as string);
		let passwordCheck = passwordData != undefined && SignUpValidation.validatePassword(passwordData as string);
		let confirmPassCheck = confirmPassData != undefined && (confirmPassData == passwordData);

		setDisableSignUp(!(validation && nameCheck && passwordCheck && confirmPassCheck && acceptTerms));
	}

	const handlePassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setPasswordData(e.target.value);

		let validation = SignUpValidation.validatePassword(e.target.value);
		setPassWarning(!validation);
		setDisableConfirmPass(!validation);


		let nameCheck = nameData != undefined && SignUpValidation.validateName(nameData as string);
		let emailCheck = emailData != undefined && !!SignUpValidation.validateEmail(emailData as string);
		let confirmPassCheck = confirmPassData != undefined && (confirmPassData == e.target.value);

		setDisableSignUp(!(validation && nameCheck && emailCheck && confirmPassCheck && acceptTerms));
	}

	const handlePasswordConfirm = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setConfirmPassData(e.target.value);
		let validation = e.target.value == passwordData;
		setConfirmPassWarning(!validation);


		let nameCheck = nameData != undefined && SignUpValidation.validateName(nameData as string);
		let emailCheck = emailData != undefined && !!SignUpValidation.validateEmail(emailData as string);
		let passwordCheck = passwordData != undefined && SignUpValidation.validatePassword(passwordData as string);

		setDisableSignUp(!(validation && nameCheck && emailCheck && passwordCheck && acceptTerms));
	}

	const signup = (event: any) => {
		let validation = validateAll();
		event.preventDefault();

		if(validation){
			let registerResult = UserService.registerUser(nameData as string, emailData as string, passwordData as string);
			if (!registerResult.registerStatus){
				//alert("Usuário já cadastrado!");
				setOpenAlert(true);
				event.preventDefault();
			}else{
				LoginUserService.loginUser(registerResult.userLoginData as ILoginUserData);
				onHandleToHome();
				history.push("/");
			}
		}
		UserService.log();
	}

	const validateAll = ()=>{

		let nameCheck = nameData != undefined && SignUpValidation.validateName(nameData as string);
		let emailCheck = emailData != undefined && !!SignUpValidation.validateEmail(emailData as string);
		let passwordCheck = passwordData != undefined && SignUpValidation.validatePassword(passwordData as string);
		let confirmPassCheck = confirmPassData != undefined && (confirmPassData == passwordData);

		console.log(
			"nameCheck: " + nameCheck + 
			", emailCheck: " + emailCheck + 
			", passwordCheck: " + passwordCheck + 
			", confirmPassCheck: " + confirmPassCheck
			);

		return nameCheck && !!emailCheck && passwordCheck && confirmPassCheck && acceptTerms;
	}
	
	const handleAcceptTerms = (e : React.ChangeEvent<HTMLInputElement>) =>{
		//RegisterUserService.clearAllData();
		setAcceptTerms(e.target.checked);
		
		let nameCheck = nameData != undefined && SignUpValidation.validateName(nameData as string);
		let emailCheck = emailData != undefined && !!SignUpValidation.validateEmail(emailData as string);
		let passwordCheck = passwordData != undefined && SignUpValidation.validatePassword(passwordData as string);
		let confirmPassCheck = confirmPassData != undefined && (confirmPassData == passwordData);

		setDisableSignUp(!(nameCheck && emailCheck && passwordCheck && confirmPassCheck && e.target.checked));
	}

	const history = useHistory();

	return (
		<>

			<Dialog
				open={openAlert}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Usuário já cadastrado
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenAlert(false)} color="primary" autoFocus>
						Ok
					</Button>
				</DialogActions>
			</Dialog>

			<div style={SignupStyle.bg}></div>
			<Grid style={SignupStyle.marginTop} >
				<Paper elevation={20} style={SignupStyle.paperStyle}>
					<div>
						<Grid item container justifyContent="center">
							<h2 style={SignupStyle.headerStyle}>Cadastro</h2>
							<Typography style={SignupStyle.descStyle} variant='caption' gutterBottom>Cadastre-se e descubra vários jogos e ferramentas!</Typography>
						</Grid>
					</div>
					<form style={SignupStyle.formStyle} onSubmit={signup}>
						<div style={SignupStyle.inputRegionStyle}>
							<TextField style={SignupStyle.inputStyle} fullWidth label='Nome' placeholder="Insira seu nome" onChange={handleName}/>
							{
								showNameWarning?<span style={SignupStyle.warningStyle}>Insira um nome válido</span>:null
							}
						</div>
						<div style={SignupStyle.inputRegionStyle}>
							<TextField style={SignupStyle.inputStyle} fullWidth label='E-mail' placeholder="Insira seu e-mail" onChange={handleEmail}/>
							{
								showEmailWarning?<span style={SignupStyle.warningStyle}>Insira um e-mail válido</span>:null
							}
						</div>
						<div style={SignupStyle.inputRegionStyle}>
							<TextField style={SignupStyle.inputStyle} fullWidth label='Senha' placeholder="Insira uma senha" onChange={handlePassword}/>
							{
								showPassWarning?<span style={SignupStyle.warningStyle}>Senha muito curta (mínimo de 8 dígitos)</span>:null
							}
						</div>
						<div style={SignupStyle.inputRegionStyle}>
							<TextField disabled={disableConfirmPass} style={SignupStyle.inputStyle} fullWidth label='Confirmar senha' placeholder="Digite sua senha novamente" onChange={handlePasswordConfirm}/>
							{
								showConfirmPassWarning?<span style={SignupStyle.warningStyle}>Senhas diferentes</span>:null
							}
						</div>
						<FormControlLabel
							control={<Checkbox name="checkedA" onChange={handleAcceptTerms}/>}
							label="Eu aceito os termos e condições de uso."
							style={SignupStyle.acceptStyle}
						/>
						<Button type='submit' variant='contained' color='primary' style={SignupStyle.buttonStyle} disabled={disableSignUp}>Registrar</Button>
					</form>
				</Paper>
				<div style={SignupStyle.emptySpaceStyle}></div>
			</Grid>
		</>
	);
}

export default Signup;