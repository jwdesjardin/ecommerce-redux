import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';

import { Alert, Table, Button } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../actions/constants';

const OrderScreen = ({ match, history }) => {
	const id = match.params.id;

	const dispatch = useDispatch();

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const orderDetails = useSelector(state => state.orderDetails);
	const { loading, data, error } = orderDetails;

	const orderPay = useSelector(state => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	const orderDeliver = useSelector(state => state.orderDeliver);
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

	const [ sdkReady, setSdkReady ] = useState(false);

	useEffect(
		() => {
			if (!userInfo) {
				history.push('/login');
			}

			const addPayPalScript = async () => {
				const { data: clientId } = await axios.get('/api/config/paypal');
				console.log(clientId);
				const script = document.createElement('script');
				script.type = 'text/javascript';
				script.async = true;
				script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
				script.onload = () => {
					setSdkReady(true);
				};
				document.body.appendChild(script);
			};

			if (!data || successPay || successDeliver || data._id !== id) {
				dispatch({ type: ORDER_PAY_RESET });
				dispatch({ type: ORDER_DELIVER_RESET });
				dispatch(getOrderDetails(id));
			} else if (!data.isPaid) {
				if (!window.paypal) {
					console.log('addpaypal');
					addPayPalScript();
				} else {
					console.log('else');
					setSdkReady(true);
				}
			}
		},
		[ dispatch, id, successPay, successDeliver, data, history, userInfo ]
	);

	const successPaymentHandler = paymentResult => {
		dispatch(payOrder(id, paymentResult));
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(data));
	};

	console.log(data);

	return (
		<ScreenContainer>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			{loading && <h2>Loading...</h2>}
			{data && (
				<Container>
					<PageTitle>OrderDetails</PageTitle>
					<Section>
						<h3>Order Information</h3>
						<p>Customer: {data.user.name}</p>
						<p>Email: {data.user.email}</p>
						<p>Order: {data._id}</p>
						<Table>
							<tbody>
								<tr>
									<th>Item</th>
									<th>Qty</th>
									<th>Item Price</th>
									<th>Total Price</th>
								</tr>
								{data.orderItems.map(item => (
									<tr key={item.product}>
										<td>{item.name}</td>
										<td>${item.price}</td>
										<td>{item.qty}</td>
										<td>${(item.qty * item.price).toFixed(2)}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Section>
					<Section>
						<h3>Payment Information</h3>

						<p>Subtotal: ${data.itemsPrice.toFixed(2)}</p>
						<p>Tax: ${data.taxPrice.toFixed(2)}</p>
						<p>Delivery Fee: ${data.shippingPrice.toFixed(2)}</p>
						<p>
							<strong>Total: ${data.totalPrice.toFixed(2)}</strong>
						</p>
						<p>
							<strong>Paid: </strong>
						</p>
						{data.isPaid ? (
							<Alert variant='success'>Paid: {data.paidAt.substring(0, 10)}</Alert>
						) : (
							<Alert variant='danger'>Not Paid</Alert>
						)}
						{loadingPay && <h2>Loading...</h2>}
						{!sdkReady ? (
							<h2>Loading...</h2>
						) : (
							<PayPalButton amount={data.totalPrice} onSuccess={successPaymentHandler} />
						)}
					</Section>
					<Section>
						<h3>Delivery Information</h3>
						<p>Address: {data.shippingAddress.address}</p>
						<p>
							{data.shippingAddress.city} {data.shippingAddress.state}{' '}
							{data.shippingAddress.zipcode}
						</p>

						<p>
							<strong>Delivered: </strong>
						</p>
						{data.isDelivered ? (
							<Alert variant='success'>Delivered: {data.deliveredAt.substring(0, 10)}</Alert>
						) : (
							<Alert variant='danger'>Not Delivered</Alert>
						)}

						{loadingDeliver && <h2>Loading...</h2>}
						{userInfo &&
						userInfo.isAdmin &&
						data.isPaid &&
						!data.isDelivered && (
							<Button type='button' className='btn btn-block' onClick={deliverHandler}>
								Mark As Delivered
							</Button>
						)}
					</Section>
				</Container>
			)}
		</ScreenContainer>
	);
};

const ScreenContainer = styled.div`margin: 4.5rem .5rem 3rem;`;
const Container = styled.div`
	max-width: 75rem;
	margin: 0 auto;
`;
const Section = styled.div`margin: 2rem 0;`;
const PageTitle = styled.h2`font-size: 1.5rem;`;
const ErrorMessage = styled.div`
	border: 1px solid red;
	background-color: rgba(255, 0, 0, .3);
	border-radius: .3rem;
	padding: .5rem;
	width: 90%;
`;

export default OrderScreen;
