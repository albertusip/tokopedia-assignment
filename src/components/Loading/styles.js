import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { colorPrimary } from '../../color'

const bounce = keyframes`
from, 20%, 53%, 80%, to {
	transform: translate3d(0,0,0);
}

40%, 43% {
	transform: translate3d(0, -30px, 0);
}

70% {
	transform: translate3d(0, -15px, 0);
}

90% {
	transform: translate3d(0,-4px,0);
}
`

export const LoadingStyle = styled.div`
	height: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: ${bounce} 1s ease infinite;
`;

export const iconLoading = css`
	color: ${colorPrimary};
`;