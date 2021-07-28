import React, { useState } from 'react';

import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import CartService from '../../services/CartService';
import CartItem from './CartItem';

// import { Container } from './styles';

const Cart: React.FC<{ onUpdateCartQty: Function, onRemoveFromCart: Function, onEmptyCart: Function }> = ({onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {

	const [cartItems, setCartItems] = useState(CartService.itemsAmount);

	const classes = useStyles();

	const handleEmptyCart = () => { onEmptyCart(); setCartItems(CartService.itemsAmount);}

	const renderEmptyCart = () => (
		<Typography variant="subtitle1">You have no items in your shopping cart, start adding some!
		</Typography>
	);

	//if (!cart.line_items) return 'Loading';

	const renderCart = () => (
		<>
			<Grid container spacing={3}>
				{CartService.data.map((lineItem) => (
					<Grid className={classes.cartItem} >
						<CartItem item={lineItem} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart}/>
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant="h4">Subtotal: {CartService.itemsAmount}</Typography>
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
				<Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
				{cartItems <= 0 ? renderEmptyCart() : renderCart()}
			</Container>
		</>
	);
}

export default Cart;