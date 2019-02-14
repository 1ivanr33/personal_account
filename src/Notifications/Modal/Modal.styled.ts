import styled, {css} from 'styled-components';

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
	}
	
	.singleNoticeTitle{
	width: 602px;
	font-family: Formular, arial, verdana, sans-serif;
	font-size: 19px;
	color: #000000;
	font-weight: bold;
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
		}
	}
	img {
		padding-top: 3px;
	}
	width: ${contentWidth};
	padding: 20px;
`;
