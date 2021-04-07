import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import HeaderImage from '../components/HeaderImage';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

const ProductScreen = ({ match, history }) => {
	const [ qty, setQty ] = useState(1);

	const id = match.params.id;

	const dispatch = useDispatch();

	const productDetails = useSelector(state => state.productDetails);
	const { data } = productDetails;

	useEffect(
		() => {
			dispatch(getProductDetails(id));
		},
		[ dispatch, id ]
	);

	const addToCartHandler = e => {
		const id = e.target.value;
		dispatch(addToCart(id, Number(qty)));
		history.push('/');
	};

	console.log(data, Number(qty));

	return (
		<ProductScreenContainer>
			{data && (
				<Fragment>
					<HeaderImage image={data.image} />
					<ProductTitle>{data.name}</ProductTitle>
					<select value={qty} onChange={e => setQty(e.target.value)}>
						{[ ...Array(data.countInStock).keys() ].map(x => (
							<option key={x + 1} value={x + 1}>
								{x + 1}
							</option>
						))}
					</select>
					<AddToCartButton value={data._id} onClick={addToCartHandler}>
						Add to Cart
					</AddToCartButton>
				</Fragment>
			)}
		</ProductScreenContainer>
	);
};

const ProductScreenContainer = styled.div`margin-top: 3.5rem;`;

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
