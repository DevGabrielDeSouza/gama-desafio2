import IProduct from "../components/Store/Product/IProduct";
import IUserData from "./IUserData";

export default class UserService{
	static get data() {
		//return this._data;
		let savedData = localStorage.getItem(`@user`);
		if (savedData === null) {
			return [];
		} else {
			return JSON.parse(<string>localStorage.getItem(`@user`));
		}
	}

	static registerUser(nameData: string, emailData: string, passwordData: string) {
		if (!this.containsUser(emailData)){
			let userData: IUserData = {
				name: nameData,
				email: emailData,
				password: passwordData ,
				cart: []
			};
			UserService.addItem(userData);
			return true;
		}else{
			return false;
		}
	}

	static loginUser(emailData: string, password: string): { emailStatus: boolean, passwordStatus: boolean } {

		let emailMatch = UserService.containsUser(emailData);

		if (emailMatch != undefined) {
			return { emailStatus: true, passwordStatus: emailMatch.password == password };
		}

		return { emailStatus: false, passwordStatus: false };
	}

	static containsUser(email: string){
		let savedData: IUserData[] = UserService.data as IUserData[];
		return savedData.find((user: IUserData) => user.email === email);
	}

	static addItem(userData: IUserData) {
		//localStorage.removeItem(`@user`);
		let savedData = localStorage.getItem(`@user`);
		if (savedData === null) {
			localStorage.setItem(`@user`, JSON.stringify([userData]));
		} else {
			let data = JSON.parse(savedData);
			data.push(userData);
			localStorage.setItem(`@user`, JSON.stringify(data));
		}
	}

	static log() {
		console.log(JSON.parse("" + localStorage.getItem(`@user`)));
	}

	static clearAllData(){
		localStorage.removeItem(`@user`);
	}
}