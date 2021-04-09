import React, {  useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';

import { Table } from 'react-bootstrap';

const MyOrdersScreen = ({ match }) => {
	const id = match.params.id;

	const dispatch = useDispatch();

	const myOrders = useSelector(state => state.myOrders);
	const { loading, data, error } = myOrders;

	// const myOrders = useSelector(state => state.myOrders);
	// const { loading, data, error } = myOrders;

	useEffect(
		() => {
			dispatch(listMyOrders());
		},
		[ dispatch, id ]
	);

	return (
		<ScreenContainer>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			{loading && <h2>Loading...</h2>}
			<PageTitle>MyOrders</PageTitle>
			<TableContainer>
				{data && (
					<Table striped>
						<tbody>
							<tr>
								<th>Order #</th>
								<th>total price</th>
								<th>isPaid</th>
								<th>isDelivered</th>
								<th>info</th>
							</tr>
							{data.map(order => (
								<tr key={order._id}>
									<td>
										<Link to={`/order/${order._id}`}>{order._id}</Link>
									</td>
									<td>${order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											<IconGreen className='fas fa-check-circle' />
										) : (
											<IconRed className='fas fa-times-circle' />
										)}
									</td>
									<td>
										{order.isDelivered ? (
											<IconGreen className='fas fa-check-circle' />
										) : (
											<IconRed className='fas fa-times-circle' />
										)}
									</td>
									<td>
										<Link to={`/order/${order._id}`}>
											<i className='fas fa-file-invoice' />
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</TableContainer>
		</ScreenContainer>
	);
};

const ScreenContainer = styled.div`
margin: 4rem auto;
max-width: 65rem;

`;

const TableContainer = styled.div`
	overflow: scroll;
	max-width: 1200px;
	margin: .5rem;
`;
const PageTitle = styled.h2`font-size: 1.5rem;`;
const IconRed = styled.i`color: red;`;
const IconGreen = styled.i`color: green;`;

const ErrorMessage = styled.div`
	border: 1px solid red;
	background-color: rgba(255, 0, 0, .3);
	border-radius: .3rem;
	padding: .5rem;
	width: 90%;
`;

export default MyOrdersScreen;
