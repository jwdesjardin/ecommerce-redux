import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../actions/cartActions';

const CartScreen = () => {
	const shoppingCart = useSelector(state => state.shoppingCart);
	const { cartItems } = shoppingCart;

	const dispatch = useDispatch();

	return (
		<CartScreenContainer>
			<CartContainer>
				<h2>Cart Items</h2>
				<Table>
					<thead>
						<th>Item</th>
						<th>Qty</th>
						<th>Remove</th>
					</thead>
					<tbody>
						{cartItems &&
							cartItems.map(item => (
								<TR key={item.product}>
									<td>
										<Link to={`/products/${item.product}`}>
											<ItemImage src={item.image} alt='cheeseburger' />
										</Link>

										<Link to={`/products/${item.product}`}>{item.name}</Link>
									</td>
									<TDCenter>{item.qty}</TDCenter>
									<TDCenter>
										<Times
											onClick={() => dispatch(removeFromCart(item.product))}
											className='fas fa-times'
										/>
									</TDCenter>
								</TR>
							))}
					</tbody>
				</Table>

				<ShippingButton>Add Shipping</ShippingButton>
			</CartContainer>
		</CartScreenContainer>
	);
};

const CartScreenContainer = styled.div`margin-top: 3.7rem;`;

const CartContainer = styled.div`
	border: 2px soild black;
	margin: .5rem;
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
const TDCenter = styled.td`text-align: center;`;
const TR = styled.tr`align-items: center;`;
const Table = styled.table`width: 100%;`;
const Times = styled.i`color: red;`;

export default CartScreen;
