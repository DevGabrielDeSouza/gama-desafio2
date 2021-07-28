

export class SignupStyle {
	static paperStyle = {
		padding: '4vmin 2vmin 4vmin 2vmin',
		display: "inline-block",
		maxWidth: "80%",
		margin: "8vh 0vh 0vh 0vh",
	}
	static headerStyle = { margin: 0, width: "100%", textAlign: "center" as "center", fontSize: "max(200%, 6vmin)"}
	static descStyle = { textAlign: "center" as "center", margin: "10px 0 1vh 0", fontSize: "max(90%, 2vmin)" }
	static inputRegionStyle = { width: "90%",}
	static inputStyle = { height: "max(200%, 2vmin)" }
	static marginTop = {
		minWidth: "100%",
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
	static acceptStyle = { margin: "20px", width: "100%"}
	static buttonStyle = { width: "150px", height: "100%"}

	static warningStyle = { color: "red", margin: "0.5vh 0px 0px 0px", fontSize: "80%", /*display: "none"*/}

	static formStyle = {
		display: "flex",
		flexDirection: "column" as "column",
		alignItems: "center",
	}

	static emptySpaceStyle = { width: "5px", height: "5vh", /*background: "red"*/ }
}
