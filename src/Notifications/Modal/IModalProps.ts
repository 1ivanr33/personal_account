import {CSSProperties} from 'react';

/**
 * Свойства модального окна.
 */
export default interface IModalProps {
	/**
	 * Заголовок окна. По умолчанию заголовок не выводится.
	 * @default undefined
	 */
	title?: string;
	/**
	 * Стили для тега, в который будет размещаться содержимое модальной области.
	 * @default undefined
	 */
	windowStyle?: CSSProperties;
	/**
	 * Обработчик события Закрыть модальное окно.
	 * Событие наступает по трем причинам:
	 * 1) нажата кнопка Закрыть,
	 * 2) нажата кнопка ESC на клавиатуре,
	 * 3) сделан клик по тени окна.
	 */
	onClose?: () => void;
}
