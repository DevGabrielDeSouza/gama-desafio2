import React from 'react';

import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Container } from './style';

const Signup: React.FC/*<{submitForm: any}>*/ = (/*{ submitForm }*/) => {
	//const paperStyle = { padding: '4vmin 2vmin', display: "inline-block", maxWidth: 450, width: "80%", margin: "20px auto" }
	const paperStyle = {
		padding: '4vmin 2vmin 6vmin 2vmin',
		display: "inline-block", 
		position: "absolute" as "absolute", 
		top: "6%", 
		bottom: "6%",
		minHeight: "500px",
		maxWidth: "80%",
	}
	const headerStyle = { margin: 0, width: "100%", textAlign: "center" as "center", fontSize: "max(200%, 6vmin)"}
	const descStyle = { textAlign: "center" as "center", margin: "3.2vh 0 1vh 0", fontSize: "max(90%, 2vmin)" }
	const inputRegionStyle = { margin: "2vh 20px 3vh 20px" }
	const inputStyle = { height: "max(200%, 2vmin)" }
	const marginTop = {
		//background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
		//background: "linear-gradient(45deg, #512DA8 15%, #546E7A 90%)",
		minWidth: "100%",
		minHeight: "max(620px, 100vh)",
		display: "flex",
		justifyContent: "center",
	}
	const bg = {
		//background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
		background: "linear-gradient(45deg, #512DA8 15%, #546E7A 90%)",
		minWidth: "100%",
		minHeight: "max(620px, 100vh)",
		position: "fixed" as "fixed",
	}
	const acceptStyle = { margin: "20px" }
	const buttonStyle = { width: "60%", margin: "10px 10px 10px 10px " }

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		console.log(e.target.value)
	}

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
					<form>
						<div style={inputRegionStyle}>
							<TextField style={inputStyle} fullWidth label='Name' placeholder="Enter your name" />
						</div>
						<div style={inputRegionStyle}>
							<TextField style={inputStyle} fullWidth label='Email' placeholder="Enter your email" />
						</div>
						<div style={inputRegionStyle}>
							<TextField style={inputStyle} fullWidth label='Password' placeholder="Enter your password" onChange={()=>console.log("HOI")}/>
						</div>
						<div style={inputRegionStyle}>
							<TextField style={inputStyle} fullWidth label='Confirm Password' placeholder="Confirm your password" onChange={handleChange}/>
						</div>
						<FormControlLabel
							control={<Checkbox name="checkedA" />}
							label="I accept the terms and conditions."
							style={acceptStyle}
						/>
						<Button type='submit' variant='contained' color='primary' style={buttonStyle}>Sign up</Button>
					</form>
				</Paper>
			</Grid>
		</Container>
	);
}

export default Signup;