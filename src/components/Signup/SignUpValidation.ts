export default class SignUpValidation {
	static validateName(name: string) {
		return name.length > 0;
	}

	static validateEmail(email: string) {
		let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
		return email.match(pattern);
	}
	static validatePassword(password: string) {
		return password.length >= 8;
	}
}