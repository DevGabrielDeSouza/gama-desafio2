

export class LoginStyle {
	static paperStyle = {
		padding: '4vmin 2vmin 4vmin 2vmin',
		display: "inline-block",
		maxWidth: "80%",
		width: "60%",
	}
	static headerStyle = {
		margin: 0, width: "100%", 
		textAlign: "center" as "center", 
		fontSize: "max(200%, 6vmin)",
		marginBottom: "10px",
		marginTop: "10px"
	}
	static descStyle = { textAlign: "center" as "center", margin: "10px 0 1vh 0", fontSize: "max(90%, 2vmin)" }
	static inputRegionStyle = { width: "90%",}
	static inputStyle = { height: "max(200%, 2vmin)", marginTop: "20px"}
	static marginTop = {
		//minWidth: "100%",
		width: "100%",
		height: "100vh",
		display: "flex",
		flexDirection: "column" as "column",
		alignItems: "center" as "center",
		position: "relative" as "relative",
		justifyContent: "center",
	}
	static bg = {
		background: "linear-gradient(225deg, #7953d2 0%, #512DA8 30%, #546E7A 85%)",
		minWidth: "100%",
		minHeight: "max(620px, 100vh)",
		position: "fixed" as "fixed",
	}

	static buttonStyle = { width: "150px", height: "100%", marginTop: "60px", marginBottom: "20px"}

	static warningStyle = { color: "red", margin: "0.5vh 0px 0px 0px", fontSize: "80%", /*display: "none"*/}

	static formStyle = {
		display: "flex",
		flexDirection: "column" as "column",
		alignItems: "center",
	}
}
