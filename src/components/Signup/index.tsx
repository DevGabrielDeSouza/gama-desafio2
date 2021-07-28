import React from 'react';

import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Container } from './style';

const Signup: React.FC/*<{submitForm: any}>*/ = (/*{ submitForm }*/) => {
	const paperStyle = {
		padding: '4vmin 2vmin 4vmin 2vmin',
		display: "inline-block",
		maxWidth: "80%",
		margin: "8vh 0vh 0vh 0vh",
	}
	const headerStyle = { margin: 0, width: "100%", textAlign: "center" as "center", fontSize: "max(200%, 6vmin)"}
	const descStyle = { textAlign: "center" as "center", margin: "10px 0 1vh 0", fontSize: "max(90%, 2vmin)" }
	const inputRegionStyle = { width: "90%",}
	const inputStyle = { height: "max(200%, 2vmin)" }
	const marginTop = {
		minWidth: "100%",
		display: "flex",
		flexDirection: "column" as "column",
		alignItems: "center" as "center",
		position: "relative" as "relative",
		justifyContent: "center",
	}
	const bg = {
		background: "linear-gradient(225deg, #7953d2 0%, #512DA8 30%, #546E7A 85%)",
		minWidth: "100%",
		minHeight: "max(620px, 100vh)",
		position: "fixed" as "fixed",
	}
	const acceptStyle = { margin: "20px", width: "100%"}
	const buttonStyle = { width: "150px", height: "100%"}

	const warningStyle = { color: "red", margin: "0.5vh 0px 0px 0px", fontSize: "80%", /*display: "none"*/}

	const formStyle = {
		display: "flex",
		flexDirection: "column" as "column",
		alignItems: "center",
	}

	const handlePasswordConfirm = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		console.log(e.target.value)
	}

	const handlePassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		console.log(e.target.value)
	}

	const emptySpaceStyle = { width: "5px", height: "5vh", /*background: "red"*/}

	return (
		<Container>
			<div style={bg}></div>
			<Grid style={marginTop} >
				<Paper elevation={20} style={paperStyle}>
					<div>
						<Grid item container justify="center">
							<h2 style={headerStyle}>Cadastro</h2>
							<Typography style={descStyle} variant='caption' gutterBottom>Cadastre-se e descubra vários jogos e ferramentas!</Typography>
						</Grid>
					</div>
					<form style={formStyle}>
						<div style={inputRegionStyle}>
							<TextField style={inputStyle} fullWidth label='Nome' placeholder="Insira seu nome" />
							<span style={warningStyle}>Insira um nome válido</span>
						</div>
						<div style={inputRegionStyle}>
							<TextField style={inputStyle} fullWidth label='E-mail' placeholder="Insira seu e-mail" />
							<span style={warningStyle}>Insira um e-mail válido</span>
						</div>
						<div style={inputRegionStyle}>
							<TextField style={inputStyle} fullWidth label='Password' placeholder="Insira uma senha" onChange={handlePassword}/>
							<span style={warningStyle}>Senha muito curta (mínimo de 8 dígitos)</span>
						</div>
						<div style={inputRegionStyle}>
							<TextField style={inputStyle} fullWidth label='Confirm Password' placeholder="Confirm your password" onChange={handlePasswordConfirm}/>
							<span style={warningStyle}>Senhas diferentes</span>
						</div>
						<FormControlLabel
							control={<Checkbox name="checkedA" />}
							label="I accept the terms and conditions."
							style={acceptStyle}
						/>
						<Button type='submit' variant='contained' color='primary' style={buttonStyle}>Sign up</Button>
					</form>
				</Paper>
				<div style={emptySpaceStyle}></div>
			</Grid>
		</Container>
	);
}

export default Signup;