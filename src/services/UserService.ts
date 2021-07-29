
import ILoginUserData from "./ILoginUserData";
import IUserData from "./IUserData";

export default class UserService{
	static get data() {
		//return this._data;
		let savedData = localStorage.getItem(`@gamesAndTools-usersBase`);
		if (savedData === null) {
			return [];
		} else {
			return JSON.parse(<string>localStorage.getItem(`@gamesAndTools-usersBase`));
		}
	}

	static registerUser(nameData: string, emailData: string, passwordData: string): { registerStatus: boolean, userLoginData?: ILoginUserData} {
		if (!this.containsUser(emailData)){
			let userData: IUserData = {
				name: nameData,
				email: emailData,
				password: passwordData ,
				cart: []
			};
			let name = userData.name;
			let email = userData.email;
			UserService.addItem(userData);
			return { registerStatus: true, userLoginData: { name, email}};
		}else{
			return { registerStatus: false };
		}
	}

	static validateUser(emailData: string, password: string): { emailStatus: boolean, passwordStatus: boolean, userLoginData?: ILoginUserData } {

		let emailMatch = UserService.containsUser(emailData);

		if (emailMatch != undefined) {
			let name = emailMatch.name;
			let email = emailMatch.email;
			return { emailStatus: true, passwordStatus: emailMatch.password===password, userLoginData: {name, email} };
		}

		return { emailStatus: false, passwordStatus: false};
	}

	static containsUser(email: string){
		let savedData: IUserData[] = UserService.data as IUserData[];
		return savedData.find((user: IUserData) => user.email === email);
	}

	static addItem(userData: IUserData) {
		//localStorage.removeItem(`@gamesAndTools-usersBase`);
		let savedData = localStorage.getItem(`@gamesAndTools-usersBase`);
		if (savedData === null) {
			localStorage.setItem(`@gamesAndTools-usersBase`, JSON.stringify([userData]));
		} else {
			let data = JSON.parse(savedData);
			data.push(userData);
			localStorage.setItem(`@gamesAndTools-usersBase`, JSON.stringify(data));
		}
	}

	static log() {
		console.log(JSON.parse("" + localStorage.getItem(`@gamesAndTools-usersBase`)));
	}

	static clearAllData(){
		localStorage.removeItem(`@gamesAndTools-usersBase`);
	}
}