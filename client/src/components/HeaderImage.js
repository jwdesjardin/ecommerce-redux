import React from 'react';
import styled from 'styled-components';
import img from '../images/cheeseburger.jpg';

const HeaderImage = () => {
	return <HeaderImageDiv />;
};

const HeaderImageDiv = styled.div`
	width: 100vw;
	height: 25vh;
	overflow: hidden;
	background: url(${img}) no-repeat center / cover;
`;

export default HeaderImage;
