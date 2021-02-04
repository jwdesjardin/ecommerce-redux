import React from 'react';
import styled from 'styled-components';

const Header = () => {
	return (
		<HeaderDiv>
			<h1>Burgz N' Shakes</h1>
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
	align-items: center;
	justify-content: center;
`;

export default Header;
