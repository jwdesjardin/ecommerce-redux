import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';

const UserIcon = () => {
	const dispatch = useDispatch();

	const [ menuToggle, setMenuToggle ] = useState(false);

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	useEffect(() => {
		setMenuToggle(false);
	}, []);

	console.log(menuToggle);
	return (
		<UserInfoDiv>
			<i
				onClick={() => setMenuToggle(prevState => !prevState)}
				className='fas fa-user-circle fa-2x'
			/>
			{menuToggle ? userInfo ? (
				<Dropdown>
					<DropdownList>
						<DropdownHeader>{userInfo.name}</DropdownHeader>
						<Link to='/'>
							<ListItem onClick={logoutHandler}>logout</ListItem>
						</Link>
						<Link to='/myorders'>
							<ListItem>myOrders</ListItem>
						</Link>
					</DropdownList>
				</Dropdown>
			) : (
				<Dropdown>
					<DropdownList>
						<Link to='/login'>
							<ListItem>login</ListItem>
						</Link>
					</DropdownList>
				</Dropdown>
			) : (
				''
			)}
		</UserInfoDiv>
	);
};

const UserInfoDiv = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	padding: .5rem;
	margin: .5rem 1rem;
`;
const Dropdown = styled.div`
	position: absolute;
	top: 3rem;
	left: 1.5rem;
	width: 8rem;

	background-color: white;
	box-shadow: 1px 2px 2px black;
`;
const DropdownHeader = styled.div`
	padding: .5rem;
	background-color: #666;
	color: white;
	font-weight: bold;
	text-align: center;
`;
const DropdownList = styled.ul`list-style: none;`;
const ListItem = styled.li`
	padding: 1rem;
	border-bottom: 1px solid #ebebeb;
	color: black;
`;

export default UserIcon;
