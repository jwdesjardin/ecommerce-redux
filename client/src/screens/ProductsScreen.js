import React from 'react';
import styled from 'styled-components';
import Product from '../components/Product';

const ProductsScreen = () => {
	return (
		<ProductsScreenContainer>
			<MenuTitle>Menu Items</MenuTitle>
			<ProductsGrid>
				<Product />
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

export default ProductsScreen;
