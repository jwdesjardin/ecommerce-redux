import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
	const dispatch = useDispatch();

	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

	const userLogin = useSelector(state => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(
		() => {
			if (userInfo) {
				history.push(redirect);
			}
		},
		[ history, userInfo, redirect ]
	);

	const registerHandler = e => {
		e.preventDefault();
		if (password === confirmPassword) {
			dispatch(register(name, email, password));
		}
	};

	return (
		<RegisterScreenContainer>
			{error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
			{loading && <h2>Loading...</h2>}
			<RegisterForm onSubmit={registerHandler}>
				<InputLabel htmlFor='name'>Name</InputLabel>
				<TextInput
					value={name}
					onChange={e => setName(e.target.value)}
					type='text'
					name='name'
					placeholder='John Doe'
				/>

				<InputLabel htmlFor='email'>Email</InputLabel>
				<TextInput
					value={email}
					onChange={e => setEmail(e.target.value)}
					type='email'
					name='email'
					placeholder='john@doe.com'
				/>

				<InputLabel htmlFor='password'>Password</InputLabel>
				<TextInput
					value={password}
					onChange={e => setPassword(e.target.value)}
					type='password'
					name='password'
					placeholder='******'
				/>

				<InputLabel htmlFor='confirmPassword'>Confirm Password</InputLabel>
				<TextInput
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					type='password'
					name='confirmPassword'
					placeholder='******'
				/>

				<SubmitButton type='submit'>Register</SubmitButton>
			</RegisterForm>

			<LoginDiv>
				<LoginText>
					If you are already registered <Link to='/login'>click here </Link>to login.
				</LoginText>
			</LoginDiv>
		</RegisterScreenContainer>
	);
};

const RegisterScreenContainer = styled.div`
	margin-top: 8rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 80vh;
	width: 100vw;
`;

const RegisterForm = styled.form`
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
	border: 2px solid orange;
	background-color: transparent;
	border-radius: 10px;
	padding: .5rem;
	margin-top: 1rem;
`;
const LoginText = styled.p`
	margin: 0 1rem;
	text-align: center;
`;
const LoginDiv = styled.div``;

const ErrorMessage = styled.div`
	border: 1px solid red;
	background-color: rgba(255, 0, 0, .3);
	border-radius: .3rem;
	padding: .5rem;
	width: 90%;
`;

export default RegisterScreen;
