import React from 'react';
import styled from 'styled-components';

const HeaderImage = ({ image }) => {
	console.log(image);
	return <HeaderImageDiv image={image} />;
};

const HeaderImageDiv = styled.div`
	width: 100vw;
	height: 25vh;
	overflow: hidden;
	background: url(${props => props.image || '/images/sample.jpg'}) no-repeat center / cover;
`;

export default HeaderImage;
