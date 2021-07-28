import IProduct from "../components/Store/Product/IProduct";
import IUserData from "./IUserData";

export default class RegisterUserService{
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
			RegisterUserService.addItem(userData);
			return true;
		}else{
			return false;
		}
	}

	static containsUser(email: string){

		let savedData: IUserData[] = RegisterUserService.data as IUserData[];

		console.log(savedData);

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
		this.log();
	}

	static log() {
		console.log(JSON.parse("" + localStorage.getItem(`@user`)));
	}

	static clearAllData(){
		localStorage.removeItem(`@user`);
	}
}