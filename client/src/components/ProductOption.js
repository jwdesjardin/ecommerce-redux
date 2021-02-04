import React from 'react';
import styled from 'styled-components';

const ProductOption = ({ options, addOption }) => {
	return (
		<ProductOptionsContainer>
			<h3>Cheese?</h3>
			<form action=''>
				<RadioInputs>
					<label htmlFor='yes' />
					<input name='yes' value='yes' type='radio' />
					<label htmlFor='no' />
					<input name='no' value='no' type='radio' />
				</RadioInputs>
			</form>
		</ProductOptionsContainer>
	);
};

const ProductOptionsContainer = styled.div`
	border: 2px solid blue;
	padding: .5rem;

	border-radius: 250px;
`;
const RadioInputs = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

export default ProductOption;
