import ILoginUserData from "./ILoginUserData";

export default class LoginUserService {
	static logoutUser() {
		localStorage.removeItem("@gamesAndTools-loginUser");
	}

	static loginUser(user: ILoginUserData) {
		localStorage.setItem("@gamesAndTools-loginUser", JSON.stringify(user));
	}
	static getUser(){
		return JSON.parse(localStorage.getItem("@gamesAndTools-loginUser") as string) as ILoginUserData;
	}

	static isLogged(){
		return localStorage.getItem("@gamesAndTools-loginUser") != null;
	}
}