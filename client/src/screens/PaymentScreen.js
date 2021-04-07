import React, { useState } from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';

import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
	const cart = useSelector(state => state.shoppingCart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const [ paymentMethod, setPaymentMethod ] = useState('Paypal');

	const dispatch = useDispatch();

	const submitHandler = e => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<ScreenContainer>
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<div>
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

				<SubmitButton type='submit'>Continue</SubmitButton>
			</Form>
		</ScreenContainer>
	);
};

const ScreenContainer = styled.div`
	margin-top: 8rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 80vh;
	width: 100vw;
`;

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
`;



export default PaymentScreen;
