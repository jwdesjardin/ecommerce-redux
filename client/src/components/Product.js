import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Product = () => {
	return (
		<Link to='/product/1'>
			<ProductContainer>
				<Split>
					<div>
						<ProductImage src='/images/cheeseburger.jpg' alt='cheeseburger' />
					</div>
					<div>
						<ProductTitle>Hamburger</ProductTitle>
						<ProductPrice>$3.99</ProductPrice>
					</div>
				</Split>
			</ProductContainer>
		</Link>
	);
};

const ProductPrice = styled.p`font-style: italic;`;

const ProductTitle = styled.h4`font-weight: 400;`;

const ProductImage = styled.img`
	height: 4rem;
	width: 4rem;
	border-radius: 50%;
	margin-right: .5rem;
`;
const ProductContainer = styled.div`
	border: 2px solid #333;
	padding: .5rem;
	border-radius: 8px;
`;
const Split = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export default Product;
