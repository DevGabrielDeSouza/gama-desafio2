import IProduct from "../components/Store/Product/IProduct";

export class Cart {
	static get data(){
		//return this._data;
		let savedData = localStorage.getItem(`@cart`);
		if (savedData === null) {
			return 0;
		}else{
			return JSON.parse(<string>localStorage.getItem(`@cart`));
		}
	}

	static get itemsAmount(){
		return Cart.data.length;
	}

	static addItem(product: IProduct) {
		//localStorage.removeItem(`@cart`);
		let savedData = localStorage.getItem(`@cart`);
		if (savedData === null) {
			localStorage.setItem(`@cart`, JSON.stringify([product]));
		}else{
			let data = JSON.parse(savedData);
			data.push(product);
			localStorage.setItem(`@cart`, JSON.stringify(data));
		}
		this.log();
	}

	static log() {
		console.log(JSON.parse("" + localStorage.getItem(`@cart`)));
	}
}

export default Cart;