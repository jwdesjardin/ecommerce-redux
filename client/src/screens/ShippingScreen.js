import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ location, history }) => {
	const dispatch = useDispatch();

	const [ address, setAddress ] = useState('');
	const [ city, setCity ] = useState('');
	const [ state, setState ] = useState('');
	const [ zipcode, setZipcode ] = useState('');
	const [ error, setError ] = useState('');

	const saveShippingHandler = e => {
		e.preventDefault();
		if (address !== '' && city !== '' && zipcode !== '' && state !== '') {
			dispatch(saveShippingAddress({ address, city, state, zipcode }));
			history.push('/placeorder');
		} else {
			setError('please fill in all fields');
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	return (
		<ScreenContainer>
			<h1>Delivery Address</h1>
			{error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

			<Form onSubmit={saveShippingHandler}>
				<InputLabel htmlFor='address'>Address</InputLabel>
				<TextInput
					value={address}
					onChange={e => setAddress(e.target.value)}
					type='text'
					name='address'
					placeholder='132 main st'
				/>

				<InputLabel htmlFor='city'>City</InputLabel>
				<TextInput
					value={city}
					onChange={e => setCity(e.target.value)}
					type='text'
					name='city'
					placeholder='san jose'
				/>

				<InputLabel htmlFor='state'>State</InputLabel>
				<TextInput
					value={state}
					onChange={e => setState(e.target.value)}
					type='text'
					name='state'
					placeholder='CA'
				/>

				<InputLabel htmlFor='zipcode'>Zip Code</InputLabel>
				<TextInput
					value={zipcode}
					onChange={e => setZipcode(e.target.value)}
					type='text'
					name='zipcode'
					placeholder='54321'
				/>

				<SubmitButton type='submit'>Choose Payment Method</SubmitButton>
			</Form>
		</ScreenContainer>
	);
};

const ScreenContainer = styled.div`
	margin-top: 5rem;
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
const InputLabel = styled.label``;
const TextInput = styled.input`
	padding: .4rem .5rem;
	margin: .5rem;
	border-radius: 5px;
	border: 1px solid #777;
`;
const SubmitButton = styled.button`
	border: 2px solid green;
	background-color: transparent;
	border-radius: 10px;
	padding: .5rem;
	margin-top: 1rem;
`;

const ErrorMessage = styled.div`
	border: 1px solid red;
	background-color: rgba(255, 0, 0, .3);
	border-radius: .3rem;
	padding: .5rem;
	width: 90%;
`;

export default ShippingScreen;
