import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
	console.log(product);
	return (
		<Link to={`/product/${product._id}`}>
			<ProductContainer>
				<Split>
					<div>
						<ProductImage src={product.image} alt='cheeseburger' />
					</div>
					<div>
						<ProductTitle>{product.name}</ProductTitle>
						<ProductPrice>${product.price.toFixed(2)}</ProductPrice>
					</div>
				</Split>
			</ProductContainer>
		</Link>
	);
};

const ProductPrice = styled.p`font-style: italic;`;

const ProductTitle = styled.h4`
	font-weight: 400;
	font-size: .8rem;
`;

const ProductImage = styled.img`
	height: 4rem;
	width: 4rem;
	border-radius: 50%;
	margin-right: .5rem;
`;

const ProductContainer = styled.div`
	border: 2px solid #333;
	padding: .3rem;
	border-radius: 8px;
	margin: .2rem;
`;

const Split = styled.div`
	display: flex;
	align-items: center;
`;

export default Product;
