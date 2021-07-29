import ICartItem from "../components/Cart/ICartItem";
import IProduct from "../components/Store/Product/IProduct";
import LoginUserService from "./LoginUserService";

export class CartService {
	static get data(): ICartItem[] {
		if (LoginUserService.getUser()===null) {
			return [];
		}
		//return this._data;
		let savedData = localStorage.getItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email);
		if (savedData === null) {
			return [];
		}else{
			return JSON.parse(<string>localStorage.getItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email));
		}
	}

	static get itemsAmount() {
		let amount = 0;
		CartService.data.forEach(element => amount += element.amount);
		return amount;
	}

	static getTotalPrice(){
		let totalPrice = 0;
		CartService.data.forEach(element => totalPrice += element.product.price * element.amount);
		return totalPrice;
	}

	static emptyCart(){
		CartService.clearAll();
	}

	static getItemAmount(product: IProduct): number {
		if (LoginUserService.getUser() === null) {
			return 0;
		}
		let savedData = localStorage.getItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email);
		let newCartGroup: ICartItem = { id: product.id, amount: 1, product: product };
		if (savedData === null) {
			return 0;
		} else {
			let data: ICartItem[] = JSON.parse(savedData);

			//let finding = data.find(match => match.id === product.id);
			let finding = data.find((match) => match.id === product.id);

			if (finding===undefined) {
				return 0;
			}else{
				return finding.amount;
			}
		}
	}

	static updateItemAmount(product: IProduct, amount: number) {
		let savedData = localStorage.getItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email);
		let newCartGroup: ICartItem = { id: product.id, amount: 1, product: product };
		if (savedData === null) {
			//localStorage.setItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email, JSON.stringify([product]));
			localStorage.setItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email, JSON.stringify([newCartGroup]));
		} else {
			let data: ICartItem[] = JSON.parse(savedData);

			//let finding = data.find(match => match.id === product.id);
			let finding = data.find((match) => {
				if (match.id === product.id) {
					match.amount = amount;
					return match.id === product.id;
				}
			});

			if (finding===undefined) {
				data.push(newCartGroup);
			}

			localStorage.setItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email, JSON.stringify(data));
		}
		this.log();
	}

	static removeItem(product: IProduct) {
		let savedData = localStorage.getItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email);
		let newCartGroup: ICartItem = { id: product.id, amount: 1, product: product };
		if (savedData === null) {
			//localStorage.setItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email, JSON.stringify([product]));
			localStorage.setItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email, JSON.stringify([newCartGroup]));
		} else {
			let data: ICartItem[] = JSON.parse(savedData);

			//let finding = data.find(match => match.id === product.id);
			let finding = data.find((match) => {
				if (match.id === product.id) {
					match.amount--;
					return match.id === product.id;
				}
			});

			if (finding===undefined) {
				data.push(newCartGroup);
			}

			localStorage.setItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email, JSON.stringify(data));
		}
		this.log();
	}

	static zeroItem(product: IProduct) {
		let savedData = localStorage.getItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email);
		let newCartGroup: ICartItem = { id: product.id, amount: 1, product: product };
		if (savedData === null) {
			//localStorage.setItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email, JSON.stringify([product]));
			localStorage.setItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email, JSON.stringify([newCartGroup]));
		} else {
			let data: ICartItem[] = JSON.parse(savedData);

			//let finding = data.find(match => match.id === product.id);
			let finding = data.find((match) => {
				if (match.id === product.id) {
					match.amount = 0;
					return match.id === product.id;
				}
			});

			if (finding===undefined) {
				data.push(newCartGroup);
			}

			localStorage.setItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email, JSON.stringify(data));
		}
		this.log();
	}

	static addItem(product: IProduct) {
		//localStorage.removeItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email);
		let savedData = localStorage.getItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email);
		let newCartGroup: ICartItem = { id: product.id, amount: 1, product: product };
		if (savedData === null) {
			//localStorage.setItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email, JSON.stringify([product]));
			localStorage.setItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email, JSON.stringify([newCartGroup]));
		}else{
			let data: ICartItem[] = JSON.parse(savedData);

			//let finding = data.find(match => match.id === product.id);
			let finding = data.find((match) => {
				if(match.id === product.id){
					match.amount++;
					return match.id === product.id;
				}
			});

			if (finding===undefined) {
				data.push(newCartGroup);
			}

			localStorage.setItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email, JSON.stringify(data));
		}
		this.log();
	}

	static clearAll(){
		localStorage.removeItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email);
		this.log();
	}

	static log() {
		console.log(JSON.parse("" + localStorage.getItem(`@gamesAndTools-cart-`+LoginUserService.getUser().email)));
	}
}

export default CartService;