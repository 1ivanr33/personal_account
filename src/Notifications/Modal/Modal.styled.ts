import styled, {css} from 'styled-components';
import attachedDocIcon from '../../images/attachedDoc.svg';
import requestIcon from '../../images/requestIcon.svg';
import closeIcon from '../../images/noticeCloseIcon.svg';
const zIndex = 1070;
const contentWidth = '1060px';

/**
 * Стиль контейнера, занимающий все окно браузера
 * и не двигающийся при скроллирования фонового содержимого.
 */
const fixedCss = css`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

/**
 * Стиль заголовка модального окна.
 * Полностью скопирован из UI KIT.
 */
const h1Css = css`
	font-family: Formular, serif;
	font-size: 24px;
	font-weight: bold;
	font-style: normal;
	font-stretch: normal;
	line-height: 1.67;
	letter-spacing: normal;
	color: #000000;
`;

/**
 * Стиль кнопки Закрыть модального окна.
 * Полностью скопирован из UI KIT.
 */
const closeButtonCss = css`
	font-family: ProximaNova, serif;
	font-size: 16px;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	line-height: 1.25;
	letter-spacing: normal;
	color: #6e7478;
`;

/**
 * Общие настройки флекс-контейнеров.
 */
const flexContainerCss = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	//justify-content: center;
`;

/**
 * Тень модального окна.
 */
export const ModalShadowContainer = styled.div`
	${fixedCss};
	${flexContainerCss};
	z-index: ${zIndex};
	opacity: 0.95;
	background-color: white;
	backdrop-filter: blur(5px); // https://habr.com/post/264037/
`;

/**
 * Обертка модального окна.
 * Содержит кнопку Закрыть и Контейнер с содержимым окна.
 */
export const ModalWrapperContainer = styled.div`
	${fixedCss};
	${flexContainerCss};
	z-index: ${zIndex + 1};
`;

/**
 * Контейнер с содержимым окна.
 */
export const ModalContentContainer = styled.div`
	flex: 1 1 0;
	display: flex;
	flex-direction: column;
	width: ${contentWidth};
	background-color: white;
	margin-top: 44px;
	padding-left: 30px;
	height: 100vh;
    overflow: scroll;
    overflow-x: visible;
    &::-webkit-scrollbar-track
			{
				display: none;
			}

			&::-webkit-scrollbar
			{
				width: 7px;
			}

			&::-webkit-scrollbar-thumb
			{
				border-radius: 4px;
				background-color: rgba(151, 151, 151, .2);
			}
	p{
	width: 602px;
	}
	&:focus {
		outline: none;
	}
	// Заголовок окна.
	h1 {
		${h1Css};
		margin-top: 0;
	}
	
	.singleNoticeDate{
	font-size: 14px;
	color: #020202;
	margin: 0 0 16px 0;
	}
	
	.singleNoticeTitle{
	font-family: Formular, arial, verdana, sans-serif;
	font-size: 24px;
	line-height: 28px;
	color: #000000;
	font-weight: bold;
	margin: 0 0 3px;
	}
	
	.noticeSubsystem, .noticeCategory{
	font-size: 16px;
	margin-bottom: -8px;
	span{
	font-weight: bold;
	}
	}
	
	.noticeText{
	text-shadow: 0 4px 4px rgba(0, 0, 0, .25);
	margin-top: 24px;
	line-height: 23px;	
	p{
	font-size: 16px;
	color: #A4A4A4;	
	text-shadow: none;
	margin-bottom: 6px;
	}
	}
	
	.noticeLinks{
	margin-top: -3px;		
	span{
	position: relative;
	display: block;
	margin-bottom: 13px;
	
	&:before{
	content: '';
	position: absolute;
	left: -31px;
    top: 3px;
    display: block;
    width: 15px;
    height: 16px;
	background: url(${attachedDocIcon}) no-repeat;
	}	
	
	&.noticeLinkRequest:before{
	width: 18px;
    height: 19px;
    top: 0;
	background: url(${requestIcon}) no-repeat;
	}
	}
	
	p{	
	font-size: 16px;
	color: #A4A4A4;	
	text-shadow: none;
	margin-bottom: 10px;
	
	}
	}
	
	button{
	margin: 14px 0 0 -4px;
	background: transparent;
	border: 1px solid #208CFF;
	min-height: 60px;
	width: fit-content;
	padding: 0 50px;
	box-sizing: border-box;
	font-size: 16px;
	color: #208CFF;
	font-family: ProximaNova-Reg, arial, verdana, sans-serif;
	}
`;

/**
 * Кнопка Закрыть модального окна.
 */
export const CloseButtonContainer = styled.div`
	a {
		${closeButtonCss};
		text-decoration: none;
		span {
			margin-left: 10px;
			font: 16px ProximaNova-Reg arial verdana sans-serif;
			position: relative;
			&:before{
			content: '';
			position: absolute;
			left: -22px;
			top: 3px;
			display: block;
			width: 14px;
			height: 14px;
			background: url(${closeIcon}) no-repeat;
			}
		}
	}
	img {
		padding-top: 3px;
	}
	width: ${contentWidth};
	padding: 20px;
`;
