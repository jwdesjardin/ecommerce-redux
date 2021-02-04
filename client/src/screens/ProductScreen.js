import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderImage from '../components/HeaderImage';
import ProductOption from '../components/ProductOption';

const ProductScreen = () => {
	const [ options, setOptions ] = useState({});

	return (
		<ProductScreenContainer>
			<HeaderImage />
			<ProductTitle>CheeseBurger</ProductTitle>

			<AddToCartButton>Add to Cart</AddToCartButton>
		</ProductScreenContainer>
	);
};

const ProductScreenContainer = styled.div`margin-top: 3.5rem;`;
const ProductOptionsList = styled.div`
	display: flex;
	flex-direction: column;
`;

const ProductTitle = styled.h2`font-size: 1.5rem;`;

const AddToCartButton = styled.button`
	font-size: 1.5rem;
	border: 2px solid green;
	background-color: transparent;
	padding: .3rem;
	border-radius: 5px;
	margin-top: .5rem;
`;

export default ProductScreen;
