import React, { useState } from 'react';

// import { Container } from './styles';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';
import ICartItem from '../ICartItem';
import IProduct from '../../Store/Product/IProduct';
import CartService from '../../../services/CartService';

const CartItem: React.FC<{ item: ICartItem, onUpdateCartQty: Function, onRemoveFromCart: Function }>  = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
	const classes = useStyles();

	const handleUpdateCartQty = (lineItemId: IProduct, newQuantity: number) => { onUpdateCartQty(lineItemId, newQuantity); setItemAmount(CartService.getItemAmount(item.product));}

	const handleRemoveFromCart = (lineItemId: IProduct) => { onRemoveFromCart(lineItemId); setItemAmount(CartService.getItemAmount(item.product));}

	const [itemAmount, setItemAmount] = useState(CartService.getItemAmount(item.product));

	return (
		<>
		{
				(itemAmount > 0)?<Card className="cart-item">
				<CardMedia image={item.product.photo} className={classes.media} />
				<CardContent className={classes.cardContent}>
					<Typography variant="h4">{item.product.name}</Typography>
						<Typography variant="h5">R${itemAmount * item.product.price}</Typography>
				</CardContent>
				<CardActions className={classes.cartActions}>
					<div className={classes.buttons}>
							<Button type="button" size="small" onClick={() => handleUpdateCartQty(item.product, itemAmount - 1)}>-</Button>
							<Typography>&nbsp;{itemAmount}&nbsp;</Typography>
							<Button type="button" size="small" onClick={() => handleUpdateCartQty(item.product, itemAmount + 1)}>+</Button>
					</div>
					<Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.product)}>Remove</Button>
				</CardActions>
			</Card>:null
		}
		</>
	);
}

export default CartItem;