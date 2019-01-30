import React, {Component, ReactNode} from 'react';
import Modal from './Modal';
import IMultiLevelModalProps, {ITitle} from './IMultiLevelModalProps';
import {BackwardButtonDiv, CloseImg} from './MultiLevelModal.styled';

interface IMultiLevelModalState {
	/**
	 * Текущий заголовок.
	 * Сохраняется в состояние, потому что для атрибута currentTitle есть значение по умолчанию.
	 */
	currentTitle: ITitle;
}

/**
 * Многоуровневое модальное окно.
 * Это прямоугольный контейнер, который занимает всю область вывода браузера и содержит:
 * кнопку закрыть, заголовок и область содержимого окна, кнопку возрата на предыдущий заголовок.
 * Данный компонент является контролируемым, то есть им полностью управляет родительский
 * компонент (в частности его видимостью и текущим заголовком).
 */
export default class MultiLevelModal extends Component<IMultiLevelModalProps, IMultiLevelModalState> {
	public static getDerivedStateFromProps(
		nextProps: Readonly<IMultiLevelModalProps>
	): Partial<IMultiLevelModalState> | null {
		return {
			// По умолчанию currentTitle равен корневому заголовку.
			currentTitle: nextProps.currentTitle ? nextProps.currentTitle : nextProps.rootTitle
		};
	}

	/**
	 * Поиск родительского заголовка. Вернет undefined, если родительский не найден.
	 * @param title Заголовок, для которого ищется родительский.
	 * @param rootTitle Корневой заголовок (дерево заголовков).
	 */
	private static findParentTitle(title: ITitle, rootTitle: ITitle): ITitle | undefined {
		let result: ITitle | undefined;
		if (rootTitle.childs) {
			if (rootTitle.childs.includes(title)) {
				result = rootTitle;
			} else {
				for (const child of rootTitle.childs) {
					result = this.findParentTitle(title, child);
					if (result) {
						break;
					}
				}
			}
		}
		return result;
	}

	public state: Readonly<IMultiLevelModalState> = {
		currentTitle: this.props.rootTitle
	};

	/**
	 * Возвращает истина, если текущий заголовок является корнем.
	 */
	private get isRoot(): boolean {
		return this.state.currentTitle === this.props.rootTitle;
	}

	public render(): ReactNode {
		const title: string = this.state.currentTitle.text;
		return (
			<Modal {...this.props} title={title}>
				{this.props.children}
				{!this.isRoot && (
					<BackwardButtonDiv onClick={this.onBackwardButtonDivClick}>
						<CloseImg />
					</BackwardButtonDiv>
				)}
			</Modal>
		);
	}

	/**
	 * Обработчик клика по контейнеру Кнопка вернуться назад.
	 */
	private onBackwardButtonDivClick = () => {
		const parentTitle = MultiLevelModal.findParentTitle(this.state.currentTitle, this.props.rootTitle);
		this.props.onBackward(parentTitle, this.state.currentTitle);
	};
}
