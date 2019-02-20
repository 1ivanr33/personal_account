import React, {Component, RefObject, ReactNode, Fragment} from 'react';
import {KeyboardEvent, MouseEvent} from 'react';
import IModalProps from './IModalProps';
import {ModalContentContainer, ModalShadowContainer, ModalWrapperContainer, CloseButtonContainer} from './Modal.styled';
//import closeIconSrc from '../../../library/media/icons/close-notification.svg';

/**
 * Код клавиши ESC.
 */
const ESCAPE_KEY_CODE = 27;

/**
 * Модальное окно.
 * Это прямоугольный контейнер, который занимает всю область вывода браузера и содержит:
 * кнопку закрыть, заголовок и область содержимого окна.
 * Данный компонент является контролируемым, то есть им полностью управляет родительский
 * компонент (в частности его видимостью).
 */
export default class Modal extends Component<IModalProps> {
	private readonly modalRef: RefObject<HTMLDivElement>;

	constructor(props: IModalProps) {
		super(props);

		this.modalRef = React.createRef<HTMLDivElement>();
	}

	public componentDidUpdate() {
		if (this.modalRef.current) {
			this.modalRef.current.focus();
		}
	}

	/**
	 * Внимание, здесь есть снятие проверки типа this.modalRef для свойства ref.
	 * О причине см. след. ссылки:
	 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30225
	 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
	 * https://github.com/styled-components/styled-components/issues/2182
	 * https://github.com/styled-components/styled-components/issues/2184
	 * https://goo.gl/RTngZW
	 * https://goo.gl/XUSvbw
	 *
	 */
	public render(): ReactNode {
		return (
			<Fragment>
				<ModalWrapperContainer onClick={this.onWrapperClick} onKeyDown={this.onWrapperKeyDown}>
					<CloseButtonContainer>
						<a href='#' onClick={this.onCloseButtonClick}>
							<img />
							<span>Закрыть</span>
						</a>
					</CloseButtonContainer>
					<ModalContentContainer
						ref={this.modalRef as any}
						tabIndex={1}
						onClick={this.stopPropagation}
						style={this.props.windowStyle}
					>
						{this.props.title && <h1>{this.props.title}</h1>}
						<p className='singleNoticeDate'>02.05.2018 / 12:00</p>
						<p className='singleNoticeTitle'>Место обучения кадров требуют
							определения и уточнения существенных финансовых и административных
							условий</p>
						<p className='noticeSubsystem'>Подсистема: <span>ПИР</span></p>
						<p className='noticeCategory'>Категория: <span>Название категории</span></p>
						<p className='noticeText'><p>Текст уведомления</p>
							Таким образом новая модель организационной деятельности представляет
							собой интересный эксперимент проверки дальнейших направлений
							развития
						</p>
						<p className='noticeLinks'><p>Ссылки</p>
							<span>Документ.pdf</span>
							<span className='noticeLinkRequest'>Заявка на добавление реквизитов в карточку должника</span>
							<span className='noticeLinkRequest'>Заявка на создание учетной записи</span>
						</p>
						<button>
							Ознакомлен
						</button>
					</ModalContentContainer>
				</ModalWrapperContainer>
				<ModalShadowContainer />
			</Fragment>
		);
	}

	/**
	 * Обработчик нажатия на кнопку Закрыть окно.
	 */
	private onCloseButtonClick = (event: MouseEvent<HTMLAnchorElement>) => {
		this.hide();
		event.preventDefault();
	};

	/**
	 * Обработчик нажатия на кнопку в пределах окна (когда есть фокус на окне и на его родителе ModalWrapperContainer).
	 * Скрывает окно при нажатии на кнопку ESC.
	 */
	private onWrapperKeyDown = (event: KeyboardEvent) => {
		if (event.keyCode === ESCAPE_KEY_CODE) {
			this.hide();
		}
	};

	/**
	 * Обработчик клика по области за пределами содержимого окна.
	 * Скрывает окно, если пользователь кликнул вне окна.
	 */
	private onWrapperClick = (event: MouseEvent) => {
		this.hide();
	};

	/**
	 * Скрыть окно.
	 * Скрывает родительский компонент (см. https://goo.gl/UUExku).
	 */
	private hide() {
		if (this.props.onClose) {
			this.props.onClose();
		}
	}

	/**
	 * Заглушка на любое событие мышки, для того, чтобы остановить всплытие события.
	 */
	private stopPropagation = (event: MouseEvent) => {
		event.stopPropagation();
	};
}
