import styled from 'styled-components';
import closeIcon from '../../../library/media/icons/double-arrow-left.svg';

export const BackwardButtonDiv = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: 1072;
	cursor: pointer;
	width: 40px;
	background-color: #f5f6f7;
	display: flex;
	align-items: center;
`;

export const CloseImg = styled.img.attrs({
	src: closeIcon
})`
	flex: 1 1 0;
`;
