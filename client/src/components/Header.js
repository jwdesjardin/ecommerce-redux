import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
	const shoppingCart = useSelector(state => state.shoppingCart);
	const { cartItems } = shoppingCart;

	const shoppingCartCount = cartItems.reduce((count, item) => count + item.qty, 0) || 0;

	return (
		<HeaderDiv>
			<Link to='/products'>
				<h2>Burgz N' Shakes</h2>
			</Link>

			<ShoppingCartDiv>
				{shoppingCartCount > 0 ? <CartItemCounter>{shoppingCartCount}</CartItemCounter> : ''}
				<Link to='/cart'>
					<i className='fas fa-shopping-cart' />
				</Link>
			</ShoppingCartDiv>
		</HeaderDiv>
	);
};

const HeaderDiv = styled.div`
	width: 100%;
	min-height: 3rem;
	background-color: #333;
	color: #ebebeb;
	position: absolute;
	top: 0;
	padding: .5rem 0rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ShoppingCartDiv = styled.div`
	float: right;
	position: absolute;
	right: 0;
	top: 0;
	padding: .5rem;
	font-size: 1.4rem;
	display: flex;
`;

const CartItemCounter = styled.div`
	background-color: yellow;
	border-radius: 50%;
	color: black;
	padding: .2rem .5rem;
`;

export default Header;
