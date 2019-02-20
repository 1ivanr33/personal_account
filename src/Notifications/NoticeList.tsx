import React, {FocusEvent, RefObject} from 'react';
import './NoticeList.scss'
import BackOpacity from '../ProfileSelect/BackOpacity';
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import {IMobxProviderInjectedProps} from '../MobxProvider';
import Modal from './Modal/Modal';

interface INoticeListState {
	modalVisible: boolean,
	showMenu: string,
	showModal: boolean
}

@inject("rootStore")
@observer
class NoticeList extends React.Component<IMobxProviderInjectedProps, INoticeListState> {

	menuRef: RefObject<HTMLDivElement>;

	constructor(props: IMobxProviderInjectedProps) {
		super(props);
		this.state = {
			modalVisible: false,
			showModal: false,
			showMenu: 'hidden'
		};
		this.menuRef = React.createRef();
		this.toggleMenuShow = this.toggleMenuShow.bind(this);
		this.onProfileSelectBlur = this.onProfileSelectBlur.bind(this);
		this.onLinkClick = this.onLinkClick.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onOpenModalButtonClick = this.onOpenModalButtonClick.bind(this);
		this.onModalClose = this.onModalClose.bind(this);
	}

	onOpenModalButtonClick() {
		this.setState({
			modalVisible: true
		});
	}

	onModalClose() {
		this.setState({
			modalVisible: false
		});
	}

	toggleMenuShow() {
		let oldState = this.state.showMenu;
		let isVisibleOrHidden = (oldState === 'hidden');
		let newState = (isVisibleOrHidden) ? 'visible' : 'hidden';
		this.setState({
			showMenu: newState
		});
	}

	componentDidUpdate() {
		const {rootStore} = this.props;
		if (!rootStore) throw new Error('rootStore не определен');
		rootStore.NoticeList = this.state.showMenu;
	}

	render() {

		const {rootStore} = this.props;
		if (!rootStore) throw new Error('rootStore не определен');
		let backGroundOpacity = null;
		if (rootStore.NoticeList === 'visible') {
			backGroundOpacity = <BackOpacity/>;
		}

		return (
			<div>
				<div className='noticeList' ref={this.menuRef} tabIndex={1} id={this.state.showMenu} onBlur={this.onBlur}>
					<p className='toggler' onClick={this.toggleMenuShow}> </p>
					{
						this.state.showMenu === 'visible' && (
							<div className='noticeSelect'>
								<h3>Уведомления</h3>
								<span>Отметить все как прочитанное</span>
								<div className='noticeScrollArea'>
									<p><span className='noticeDate'>02.05.2018</span>
										<a onClick={this.onOpenModalButtonClick}>Поступление денежных средств в счет оплаты долга</a>
										{this.state.modalVisible && (
											<Modal onClose={this.onModalClose}>
											</Modal>
										)}</p>
									<p className='noticeImportant'><span className='noticeDate'>02.05.2018</span><Link  to="">Место обучения кадров
										требуют определения и уточнения существенных финансовых и административных
										условий</Link></p>
									<p className='noticeWatched'><span className='noticeDate'>02.05.2018</span><Link  to="/">Равным образом новая модель
										организационной деятельности</Link></p>
									<p><span className='noticeDate'>02.05.2018</span><Link  to="">Поступление денежных средств в
										счет оплаты долга</Link></p>
									<p className='noticeWatched'><span className='noticeDate'>02.05.2018</span><Link  to="">Место обучения кадров
										требуют определения и уточнения существенных финансовых и административных
										условий</Link></p>
									<p className='noticeImportant'><span className='noticeDate'>02.05.2018</span><Link  to="/">Равным образом новая модель
										организационной деятельности</Link></p>
									<p><span className='noticeDate'>02.05.2018</span><Link onClick={this.onLinkClick} to="">Поступление денежных средств в
										счет оплаты долга</Link></p>
									<p className='noticeWatched noticeImportant'><span className='noticeDate'>02.05.2018</span><Link onClick={this.onLinkClick} to="">Место обучения кадров
										требуют определения и уточнения существенных финансовых и административных
										условий</Link></p>
									<p><span className='noticeDate'>02.05.2018</span><Link to="/">Равным образом новая модель
										организационной деятельности</Link></p>
								</div>
								<p className='noticeListFooter'>
									<span className='noticeSettings'>Настройки</span>
									<span className='noticeWatchAll'>Просмотреть все</span>
								</p>

							</div>
						)
					}
				</div>
				{backGroundOpacity}
			</div>
		);
	}

	onBlur(event: FocusEvent<HTMLDivElement>) {
		const wrapperEl = this.menuRef.current;
		if (wrapperEl) {
			if (!(wrapperEl.contains(event.target) && wrapperEl.contains(event.relatedTarget as HTMLSpanElement))) {
				this.onProfileSelectBlur();
			}
		}
	}

	onLinkClick() {
		this.setState({
			showMenu: 'hidden'
		});
	}

	onProfileSelectBlur() {
		this.setState({
			showMenu: 'hidden'
		});
	}
}

export default NoticeList