import React, { useEffect, useState } from 'react';
import Store from './components/Store';
import Navbar from './components/Navbar';
import CartService from './services/CartService';
import IProduct from './components/Store/Product/IProduct';
import Signup from './components/Signup';
import Login from './components/Login';
import Cart from './components/Cart';


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginUserService from './services/LoginUserService';

import * as productLocalData from "./server.json";

// import { Container } from './styles';

import { useHistory } from "react-router-dom";

const App: React.FC = () => {
	const [cartTotal, setCartTotal] = useState<number>();

	const [productsData, setData] = useState<IProduct[]>(productLocalData.produtos);
	const [cartData, setCart] = useState<IProduct>();

	const [isLogged, setIsLogged] = useState(LoginUserService.isLogged());


	const history = useHistory();

	/*useEffect(() => {
		api.get('').then(
			response => {
				setData(response.data);
				setCartTotal(CartService.itemsAmount);
				//localStorage.removeItem(`@cart`);
			}
		)
	}, []);*/

	useEffect(() => {
		//localStorage.setItem(`@cart`, JSON.stringify(cartData));
		console.log(isLogged);
		setCartTotal(CartService.itemsAmount);
	}, [cartData]);


	const addItemByIndex = (index: number) => {
		let product = productsData.find(match =>match.id===index);
		console.log(product);
		//let product = productsData[index];
		CartService.addItem(product as IProduct);
		//setCart(product);
	}

	const handleAddToCart = async (index: number) => {
		console.log(index);
		addItemByIndex(index);
		setCartTotal(CartService.itemsAmount);
	};

	const handleUpdateCartQty = async (lineItemProduct: IProduct, quantity: number) => {
		CartService.updateItemAmount(lineItemProduct, quantity);
		setCartTotal(CartService.itemsAmount);
	};

	const handleRemoveFromCart = async (lineItemProduct: IProduct) => {
		CartService.zeroItem(lineItemProduct);
		setCartTotal(CartService.itemsAmount);

	};

	const handleEmptyCart = async () => {
		CartService.emptyCart();
		setCartTotal(CartService.itemsAmount);
	};

	const handleLogout = async () => {
		LoginUserService.logoutUser();
		setIsLogged(LoginUserService.isLogged());
	}

	const handleToHome = async () => {
		setIsLogged(LoginUserService.isLogged());
	}

	

	return (
		/*<div>
			<Login />
		</div>*/
		/*<div>
			<Signup/>
		</div>*/
		
		<Router>
			<div>
				{
					isLogged ? <Navbar totalItems={(cartTotal as number)} onHandleLogout={handleLogout}/>:null
				}
				<Switch>

					<Route exact path="/">
						{
							isLogged?<Store onAddToCart={handleAddToCart} />:<Login />
						}
					</Route>

					<Route exact path="/cart">
						<Cart onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
					</Route>

					{
						!isLogged ?	<Route exact path="/signup"><Signup onHandleToHome={handleToHome}/></Route>:null
					}


				</Switch>
			</div>
		</Router>

		/*<div>
			<Navbar totalItems={(cartTotal as number)} />
			<Cart onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
		</div>*/

		/*<div>
			<Home/>
		</div>*/
	);
}

export default App;