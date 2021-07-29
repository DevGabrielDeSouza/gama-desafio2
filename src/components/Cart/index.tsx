import React, { useState } from 'react';

import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import CartService from '../../services/CartService';
import CartItem from './CartItem';
import IProduct from '../Store/Product/IProduct';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

const Cart: React.FC<{ onUpdateCartQty: Function, onRemoveFromCart: Function, onEmptyCart: Function }> = ({onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {

	const [cartItems, setCartItems] = useState(CartService.itemsAmount);
	const [totalPrice, setTotalPrice] = useState(CartService.getTotalPrice());

	const classes = useStyles();

	const handleEmptyCart = () => { onEmptyCart(); setCartItems(CartService.itemsAmount); setTotalPrice(CartService.getTotalPrice());}

	const handleUpdateCart = (lineItemProduct: IProduct, quantity: number) => { onUpdateCartQty(lineItemProduct, quantity); setTotalPrice(CartService.getTotalPrice()); }
	const handleRemoveFromCart = (lineItemProduct: IProduct) => { onRemoveFromCart(lineItemProduct); setTotalPrice(CartService.getTotalPrice()); }

	const renderEmptyCart = () => (
		<Typography variant="subtitle1">Parece que você ainda não comprou nada. 
			<Link className={classes.link} to="/">Veja nossas ofertas!</Link>!
		</Typography>
	);

	//if (!cart.line_items) return 'Loading';

	const renderCart = () => (
		<>
			<Grid container spacing={3}>
				{CartService.data.map((lineItem) => (
					<Grid className={classes.cartItem} >
						<CartItem item={lineItem} onUpdateCartQty={handleUpdateCart} onRemoveFromCart={handleRemoveFromCart}/>
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant="h4">Subtotal: {totalPrice}</Typography>
				<div>
					<Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
				</div>
			</div>
		</>
	);

	return (
		<>
			<Container>
				<div className={classes.toolbar} />
				<Typography className={classes.title} variant="h3" gutterBottom>Seu Carrinho</Typography>
				{cartItems <= 0 ? renderEmptyCart() : renderCart()}
			</Container>
		</>
	);
}

export default Cart;