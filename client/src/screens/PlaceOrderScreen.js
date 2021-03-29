import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import { emptyShoppingCart } from '../actions/cartActions';

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch();

	const cart = useSelector(state => state.shoppingCart);

	const orderCreate = useSelector(state => state.orderCreate);
	const { order, success, error } = orderCreate;

	if (!cart.shippingAddress) {
		console.log('no shipping');
		history.push('/shipping');
	}

	const [ paymentMethod, setPaymentMethod ] = useState('Paypal');
	console.log(success, order);
	useEffect(
		() => {
			if (success) {
				history.push(`/order/${order._id}`);
			}
		},
		[ history, success, order._id ]
	);

	const placeOrderHandler = e => {
		e.preventDefault();
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: paymentMethod,
				itemsPrice: cart.subtotal,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
		dispatch(emptyShoppingCart());
	};

	//calculate prices

	const addDecimals = num => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	cart.subtotal = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

	cart.shippingPrice = addDecimals(cart.subtotal > 15 ? 0 : 5);
	cart.taxPrice = addDecimals(Number((0.15 * cart.subtotal).toFixed(2)));
	cart.totalPrice = addDecimals(
		(Number(cart.subtotal) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
	);

	return (
		<ScreenContainer>
			<PageTitle>Review Order</PageTitle>

			{error && <ErrorMessage>{error}</ErrorMessage>}

			<h3>Delivery Location</h3>

			<div>
				<p>Address: {cart.shippingAddress.address}</p>
				<p>
					{cart.shippingAddress.city}, {cart.shippingAddress.state} {cart.shippingAddress.zipcode}
				</p>
			</div>

			<CartContainer>
				<h3>Order Items</h3>
				<Table striped>
					<tbody>
						<tr>
							<th>Item</th>
							<th>Price</th>
							<th>Qty</th>
						</tr>
						{cart.cartItems &&
							cart.cartItems.map(item => (
								<tr key={item.product}>
									<td>
										<ItemImage src={item.image} alt='cheeseburger' /> {item.name}
									</td>
									<td>{item.price}</td>
									<td>{item.qty}</td>
								</tr>
							))}
					</tbody>
				</Table>
			</CartContainer>

			<CartTotalsContainer>
				<div>
					<p>subtotal: {cart.subtotal}</p>
					<p>tax: {cart.taxPrice}</p>
					<p>delivery fee: {cart.shippingPrice} </p>
					<p>
						<strong>Total: {cart.totalPrice} </strong>
					</p>
				</div>
			</CartTotalsContainer>

			<Form onSubmit={placeOrderHandler}>
				<div>
					<h3>Payment Method</h3>
					<input
						type='radio'
						label='Paypal or Credit Card'
						id='Paypal'
						name='paymentMethod'
						value='PayPal'
						checked
						onChange={e => setPaymentMethod(e.target.value)}
					/>
					<label htmlFor='paymentMethod'>Paypal or creditcard</label>
				</div>

				<SubmitButton type='submit'>Place Order</SubmitButton>
			</Form>
		</ScreenContainer>
	);
};

const ScreenContainer = styled.div`
	margin-top: 4rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	height: 80vh;
	width: 100vw;
`;
const PageTitle = styled.h1`margin-bottom: 2rem;`;
const Form = styled.form`
	display: flex;
	flex-direction: column;
	font-size: 1.1rem;
	margin: 1rem;
`;
const SubmitButton = styled.button`
	border: 2px solid green;
	background-color: transparent;
	border-radius: 10px;
	padding: .5rem;
	margin-top: 1rem;
	margin-bottom: 6rem;
`;
const ErrorMessage = styled.div`
	border: 1px solid red;
	background-color: rgba(255, 0, 0, .3);
	border-radius: .3rem;
	padding: .5rem;
	width: 90%;
`;
const CartContainer = styled.div`
	border: 2px soild black;
	margin: 1rem;
`;
const ItemImage = styled.img`
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	margin-right: .5rem;
`;
const CartTotalsContainer = styled.div`
	border: solid 2px black;
	padding: 1rem;
	font-size: 1.1rem;
`;

export default PlaceOrderScreen;
