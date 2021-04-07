import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserIcon from './UserIcon';

const Header = () => {
	const shoppingCart = useSelector(state => state.shoppingCart);
	const { cartItems } = shoppingCart;

	const shoppingCartCount = cartItems.reduce((count, item) => count + item.qty, 0) || 0;

	return (
		<HeaderDiv>
			<UserIcon />

			<Link to='/products' data-testid='header title'>
				<HeaderTitle>Burgz N' Shakes</HeaderTitle>
			</Link>

			<ShoppingCartDiv>
				{shoppingCartCount > 0 ? <CartItemCounter>{shoppingCartCount}</CartItemCounter> : ''}
				<Link to='/cart'>
					<HeaderIcon className='fas fa-shopping-cart fa-2x' />
				</Link>
			</ShoppingCartDiv>
		</HeaderDiv>
	);
};

const HeaderDiv = styled.div`
	width: 100%;
	min-height: 4rem;
	background-color: #333;
	color: #ebebeb;
	position: absolute;
	top: 0;
	padding: .5rem 0rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const HeaderTitle = styled.h1`
	color: white;
	font-size: 1.5rem;
`;

const HeaderIcon = styled.i`color: white;`;

const ShoppingCartDiv = styled.div`
	position: absolute;
	right: 0;
	top: 0;
	padding: .5rem;
	display: flex;
	margin: .5rem 1rem;
`;

const CartItemCounter = styled.div`
	background-color: yellow;
	font-size: .8rem;
	font-weight: bold;
	border-radius: 50%;
	color: black;
	max-height: 1.5rem;
	padding: .2rem .5rem;
`;

export default Header;
