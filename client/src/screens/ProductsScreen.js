import React, { useEffect } from 'react';
import styled from 'styled-components';
import Product from '../components/Product';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsList } from '../actions/productActions';

const ProductsScreen = () => {
	const productList = useSelector(state => state.productList);
	const { loading, data, error } = productList;

	const dispatch = useDispatch();

	useEffect(
		() => {
			if (loading !== false) {
				dispatch(getProductsList());
			}
		},
		[ dispatch, loading ]
	);

	return (
		<ProductsScreenContainer>
			<MenuTitle>Menu Items</MenuTitle>
			<ProductsGrid>
				{error && <ErrorMessage>{error}</ErrorMessage>}
				{loading && <h2>Loading...</h2>}
				{data && data.map(product => <Product key={product._id} product={product} />)}
			</ProductsGrid>
		</ProductsScreenContainer>
	);
};

const ProductsScreenContainer = styled.div`
	margin-top: 3.5rem;
	padding: .5rem;
`;

const ProductsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
`;

const MenuTitle = styled.h2`font-size: 1.5rem;`;

const ErrorMessage = styled.div`
	border: 1px solid red;
	background-color: rgba(255, 0, 0, .3);
	border-radius: .3rem;
	padding: .5rem;
	width: 90%;
`;

export default ProductsScreen;
