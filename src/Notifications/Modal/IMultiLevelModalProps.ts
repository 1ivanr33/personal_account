import IModalProps from './IModalProps';

/**
 * Объект заголовка для многуровневого модального окна.
 */
export interface ITitle {
	/**
	 * Текст заголовка.
	 */
	text: string;
	/**
	 * Массив подзаголовков.
	 * @default undefined
	 */
	childs?: ITitle[];
}

/**
 * Свойства многуровневого модального окна.
 */
export default interface IMultiLevelModalProps extends IModalProps {
	/**
	 * Текущий заголовок.
	 * По умолчанию равен корневому заголовку.
	 * @default this.rootTitle
	 */
	currentTitle?: ITitle;
	/**
	 * Дерево заголовков окна.
	 */
	rootTitle: ITitle;
	/**
	 * Обработчик события нажатия на кнопку Вернуться на предыдущий заголовок модального окна.
	 * @param parentTitle Родительские заголовок. Необходим для переключения текущего заголовка окна.
	 * @param currentTitle Текущий заголовок.
	 */
	onBackward: (parentTitle: ITitle | undefined, currentTitle: ITitle) => void;
}
