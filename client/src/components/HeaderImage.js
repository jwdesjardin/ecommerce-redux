import React from 'react';
import styled from 'styled-components';

const HeaderImage = ({ image }) => {
	const HeaderImageDiv = styled.div`
		width: 100vw;
		height: 25vh;
		overflow: hidden;
		background: url(${image}) no-repeat center / cover;
	`;

	return <HeaderImageDiv />;
};

export default HeaderImage;
