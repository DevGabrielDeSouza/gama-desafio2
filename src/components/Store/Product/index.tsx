import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import useStyles from './styles';

import IProduct from './IProduct';


const Product: React.FC<{ product: IProduct, onAddToCart: Function }> = ( {product, onAddToCart} ) => {
	const classes = useStyles();

	const handleAddToCart = () => onAddToCart(product.id);

	return (
		<Card className={classes.root}>
			<CardMedia className={classes.media} image={product.photo} title={product.name} />
			<CardContent>
				<div className={classes.cardContent}>
					<Typography gutterBottom variant="h5" component="h2">
						{product.name}
					</Typography>
					<Typography gutterBottom variant="h5" component="h2">
						${product.price}
					</Typography>
				</div>
				<Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
			</CardContent>
			<CardActions disableSpacing className={classes.cardActions}>
				<IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
					<Add />
				</IconButton>
			</CardActions>
		</Card>
	);
}

export default Product;
