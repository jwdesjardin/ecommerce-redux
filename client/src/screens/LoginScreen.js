import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
	const dispatch = useDispatch();

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

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

	const loginHandler = e => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<LoginScreenContainer>
			{error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
			{loading && <h2>Loading...</h2>}
			<LoginForm onSubmit={loginHandler} data-testid='login-form'>
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

				<SubmitButton type='submit'>Login</SubmitButton>
			</LoginForm>

			<RegisterDiv>
				<RegisterText>
					If you do not already have an account <Link to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register' }>click here </Link>to register.
				</RegisterText>
			</RegisterDiv>
		</LoginScreenContainer>
	);
};

const LoginScreenContainer = styled.div`
	margin-top: 8rem;
	display: flex;
	flex-direction: column;
	align-items: center;

	height: 80vh;
	width: 100vw;
`;

const LoginForm = styled.form`
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
	border: 2px solid cornflowerblue;
	background-color: transparent;
	border-radius: 10px;
	padding: .5rem;
	margin-top: 1rem;
`;
const RegisterText = styled.p`
	margin: 0 1rem;
	text-align: center;
`;
const RegisterDiv = styled.div``;

const ErrorMessage = styled.div`
	border: 1px solid red;
	background-color: rgba(255, 0, 0, .3);
	border-radius: .3rem;
	padding: .5rem;
	width: 90%;
`;

export default LoginScreen;
