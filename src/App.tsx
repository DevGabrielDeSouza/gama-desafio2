import React, { useEffect, useState } from 'react';
import Store from './components/Store';
import Navbar from './components/Navbar';
import Home from './view/Home';
import CartService from './services/CartService';
import api from './services/api';
import IProduct from './components/Store/Product/IProduct';
import Signup from './components/Signup';
import Login from './components/Login';
import Cart from './components/Cart';

// import { Container } from './styles';

const App: React.FC = () => {
	const [cartTotal, setCartTotal] = useState<number>();

	const [productsData, setData] = useState<IProduct[]>([]);
	const [cartData, setCart] = useState<IProduct>();


	useEffect(() => {
		api.get('').then(
			response => {
				setData(response.data);
				setCartTotal(CartService.itemsAmount);
				//localStorage.removeItem(`@cart`);
			}
		)
	}, []);

	useEffect(() => {
		//localStorage.setItem(`@cart`, JSON.stringify(cartData));
		setCartTotal(CartService.itemsAmount);
	}, [cartData]);


	const addItemByIndex = (index: number) => {
		let product = productsData.find(match =>match.id == index);
		//let product = productsData[index];
		CartService.addItem(product as IProduct);
		//setCart(product);
	}

	const handleAddToCart = async (index: number) => {
		addItemByIndex(index);
		setCartTotal(CartService.itemsAmount);
	};

	const handleUpdateCartQty = async (lineItemProduct: IProduct, quantity: number) => {
		CartService.updateItemAmount(lineItemProduct, quantity);
	};

	const handleRemoveFromCart = async (lineItemProduct: IProduct) => {
		CartService.zeroItem(lineItemProduct);

	};

	const handleEmptyCart = async (lineItemProduct: IProduct) => {
		CartService.emptyCart();

	};

	

	return (
		/*<div>
			<Login />
		</div>*/
		/*<div>
			<Signup/>
		</div>*/
		/*<div>
			<Navbar totalItems={(cartTotal as number)}/>
			<Store onAddToCart={handleAddToCart}/>
		</div>*/

		<div>
			<Navbar totalItems={(cartTotal as number)} />
			<Cart onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
		</div>

		/*<div>
			<Home/>
		</div>*/
	);
}

export default App;