import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Grid from '@material-ui/core/Grid';

import Product from './Product';
import useStyles from './styles';

import IProduct from './Product/IProduct';
import {Cart} from '../../services/Cart';
import Navbar from '../Navbar';

// import { Container } from './styles';

const Store: React.FC<{ onAddToCart: Function}> = ({onAddToCart}) => {
	const classes = useStyles();

	const [data, setData] = useState<IProduct[]>([]);
	const [cartData, setCart] = useState<IProduct>();


	useEffect(() => {
		api.get('').then(
			response => {
				setData(response.data);
			}
		)
	}, []);

	useEffect(() => {
		//localStorage.setItem(`@cart`, JSON.stringify(cartData));
	}, [cartData]);


	const handleCart = (index: number) => {
		let product = data[index];
		Cart.addItem(product as IProduct);
		//setCart(product);
	}

	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />

			<Grid container justifyContent="center" spacing={4}>
				{data.map((prod, index) => (
					<Grid key={prod.id} item xs={12} sm={6} md={4} lg={3}>
						<Product product={prod} onAddToCart={onAddToCart}/>
					</Grid>
					/*<div className="product-content" key={prod.id}>
						<img src={prod.photo} alt="iphone" width="200" height="auto" />
						<h4>{prod.name}</h4>
						<span>{prod.description}</span>
						<h6>{prod.price}</h6>
						<button onClick={() => handleCart(index)}> Adicionar ao carrinho</button>
					</div>*/
				))}
			</Grid>
		</main>
	);
}

export default Store;