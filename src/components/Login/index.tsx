import React, { useState } from 'react';

import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { LoginStyle } from './style';
import SignUpValidation from '../Signup/SignUpValidation';
import UserService from '../../services/UserService';
import IUserData from '../../services/IUserData';

const Login: React.FC/*<{submitForm: any}>*/ = (/*{ submitForm }*/) => {

	const [showEmailWarning, setEmailWarning] = useState(false);
	const [showPassWarning, setPassWarning] = useState(false);
	const [disableButton, setDisableButton] = useState(true);

	const [showNoEmailUser, setNoEmailUser] = useState(false);
	const [showWrongPass, setWrongPass] = useState(false);


	const [emailData, setEmailData] = useState<string>();
	const [passwordData, setPasswordData] = useState<string>();

	const [openAlert, setOpenAlert] = useState(false);


	const handleEmail = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setEmailData(e.target.value);
		setNoEmailUser(false);
		let validation = SignUpValidation.validateEmail(e.target.value);
		setEmailWarning(!validation);

		let passwordCheck = passwordData != undefined && (passwordData as string).length > 0;

		setDisableButton((!validation) || !passwordCheck);
	}

	const handlePassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setWrongPass(false);
		setPasswordData(e.target.value);


		let validation = e.target.value.length > 0;
		setPassWarning(!validation);

		let emailCheck = emailData != undefined && SignUpValidation.validateEmail(emailData as string);

		setDisableButton(!validation || !emailCheck);
	}

	const login = (event: any) => {
		let validation =	SignUpValidation.validateEmail(emailData as string) &&
							(passwordData as string).length > 0;
		event.preventDefault();

		if (validation) {
			let loginStatus = UserService.loginUser(emailData as string, passwordData as string);

			if(loginStatus.emailStatus){
				setWrongPass(!loginStatus.passwordStatus);
				setNoEmailUser(false);
			}else{
				setNoEmailUser(!loginStatus.emailStatus);
				setWrongPass(false);
			}
		}
	}

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

			<div style={LoginStyle.bg}></div>
			<Grid style={LoginStyle.marginTop} >
				<Paper elevation={20} style={LoginStyle.paperStyle}>
					<div>
						<Grid item container justifyContent="center">
							<h2 style={LoginStyle.headerStyle}>Login</h2>
						</Grid>
					</div>
					<form style={LoginStyle.formStyle} onSubmit={login}>
						<div style={LoginStyle.inputRegionStyle}>
							<TextField style={LoginStyle.inputStyle} fullWidth label='E-mail' placeholder="Insira seu e-mail" onChange={handleEmail} />
							{
								showEmailWarning ? <span style={LoginStyle.warningStyle}>Insira um e-mail válido</span> : null
							}
							{
								showNoEmailUser ? <span style={LoginStyle.warningStyle}>Usuário não encontrado</span> : null
							}
						</div>
						<div style={LoginStyle.inputRegionStyle}>
							<TextField style={LoginStyle.inputStyle} fullWidth label='Password' placeholder="Insira uma senha" onChange={handlePassword} />
							{
								showPassWarning ? <span style={LoginStyle.warningStyle}>Insira sua senha</span> : null
							}
							{
								showWrongPass ? <span style={LoginStyle.warningStyle}>Senha inválida</span> : null
							}
						</div>
						<div style={LoginStyle.buttonsDivStyle}>
							<Button type='submit' variant='contained' style={LoginStyle.buttonStyle} disabled={disableButton}>Cadastrar</Button>
							<Button type='submit' variant='contained' color='primary' style={LoginStyle.buttonStyle} disabled={disableButton}>Entrar</Button>
						</div>
						
					</form>
				</Paper>
			</Grid>
		</>
	);
}

export default Login;