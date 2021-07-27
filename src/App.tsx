import React, { useEffect, useState } from 'react';
import Store from './components/Store';
import Navbar from './components/Navbar';
import Home from './view/Home';
import Cart from './services/Cart';
import api from './services/api';
import IProduct from './components/Store/Product/IProduct';

// import { Container } from './styles';

const App: React.FC = () => {
	const [cartTotal, setCartTotal] = useState<number>();

	const [data, setData] = useState<IProduct[]>([]);
	const [cartData, setCart] = useState<IProduct>();


	useEffect(() => {
		api.get('').then(
			response => {
				setData(response.data);
				setCartTotal(Cart.data.length);
			}
		)
	}, []);

	useEffect(() => {
		//localStorage.setItem(`@cart`, JSON.stringify(cartData));
		setCartTotal(Cart.data.length);
	}, [cartData]);


	const addItemByIndex = (index: number) => {
		let product = data[index];
		Cart.addItem(product as IProduct);
		//setCart(product);
	}

	const handleAddToCart = async (index: number) => {
		addItemByIndex(index);
		setCartTotal(Cart.data.length);
	};
	

	return (
		<div>
			<Navbar totalItems={(cartTotal as number)}/>
			<Store onAddToCart={handleAddToCart}/>
		</div>
		/*<div>
			<Home/>
		</div>*/
	);
}

export default App;