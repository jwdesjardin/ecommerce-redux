import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../actions/cartActions';
import { Table } from 'react-bootstrap';

const CartScreen = () => {
	const shoppingCart = useSelector(state => state.shoppingCart);
	const { cartItems } = shoppingCart;

	const dispatch = useDispatch();

	return (
		<CartScreenContainer>
			<CartContainer>
				<h2>Cart Items</h2>
				<Table striped>
					<tbody>
						<tr>
							<th>Item</th>
							<th>Price</th>
							<th>Qty</th>
							<th>Remove</th>
						</tr>
						{cartItems &&
							cartItems.map(item => (
								<tr key={item.product}>
									<td>
										<ItemImage src={item.image} alt='cheeseburger' />

										<Link to={`/products/${item.product}`}>{item.name}</Link>
									</td>
									<td>{item.price}</td>
									<td>{item.qty}</td>
									<td>
										<Times
											onClick={() => dispatch(removeFromCart(item.product))}
											className='fas fa-times'
										/>
									</td>
								</tr>
							))}
					</tbody>
				</Table>

				<Link to='/shipping'>
					<ShippingButton>Add Shipping</ShippingButton>
				</Link>
			</CartContainer>
		</CartScreenContainer>
	);
};

const CartScreenContainer = styled.div`margin-top: 3.7rem;`;

const CartContainer = styled.div`
	border: 2px soild black;
	margin: 1rem;
`;

const ShippingButton = styled.button`
	border: 2px solid #333;
	padding: .2rem .5rem;
	background-color: transparent;
`;
const ItemImage = styled.img`
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	margin-right: .5rem;
`;
const Times = styled.i`color: red;`;

export default CartScreen;
