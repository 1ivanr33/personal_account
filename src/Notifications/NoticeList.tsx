import React, {FocusEvent, RefObject} from 'react';
import './NoticeList.scss'
import BackOpacity from '../ProfileSelect/BackOpacity';
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import {IMobxProviderInjectedProps} from '../MobxProvider';
import Modal from 'react-modal';

interface INoticeListState {
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
			showModal: false,
			showMenu: 'hidden' // after test = hidden
		};
		this.menuRef = React.createRef();
		this.toggleMenuShow = this.toggleMenuShow.bind(this);
		this.onProfileSelectBlur = this.onProfileSelectBlur.bind(this);
		this.onLinkClick = this.onLinkClick.bind(this);
		this.onLinkClickExit = this.onLinkClickExit.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleOpenModal () {
		this.setState({ showModal: true });
	}

	handleCloseModal () {
		this.setState({ showModal: false });
	}

	toggleMenuShow() {
		let oldState = this.state.showMenu;
		let isVisibleOrHidden = (oldState === 'hidden');
		let newState = (isVisibleOrHidden) ? 'visible' : 'hidden';
		this.setState({
			showMenu: newState
		});
	}

	componentWillMount() {
		Modal.setAppElement('body');
	}

	componentDidUpdate() {
		const {rootStore} = this.props;
		if (!rootStore) throw new Error('rootStore не определен');
		rootStore.NoticeList = this.state.showMenu;
	}

	render() {

		console.log('This happens 8th - after I get data.');

		const {rootStore} = this.props;
		if (!rootStore) throw new Error('rootStore не определен');
		let backGroundOpacity = null;
		if (rootStore.NoticeList === 'visible') {
			backGroundOpacity = <BackOpacity/>;
		}

		return (
			<div>
				<div className='noticeList' onClick={this.toggleMenuShow} ref={this.menuRef} tabIndex={1} onBlur={this.onBlur} id={this.state.showMenu}>
					<span >

						</span>

					{
						this.state.showMenu === 'visible' && (
							<div className='noticeSelect'>
								<h3>Уведомления</h3>
								<span>Отметить все как прочитанное</span>
								<div className='noticeScrollArea'>
									<p><span className='noticeDate'>02.05.2018</span> <a onClick={this.handleOpenModal}>Поступление денежных средств в
										счет оплаты долга</a></p>
									<p className='noticeImportant'><span className='noticeDate'>02.05.2018</span><Link onClick={this.onLinkClick} to="">Место обучения кадров
										требуют определения и уточнения существенных финансовых и административных
										условий</Link></p>
									<p className='noticeWatched'><span className='noticeDate'>02.05.2018</span><Link onClick={this.onLinkClickExit} to="/">Равным образом новая модель
										организационной деятельности</Link></p>
									<p><span className='noticeDate'>02.05.2018</span><Link onClick={this.onLinkClick} to="">Поступление денежных средств в
										счет оплаты долга</Link></p>
									<p className='noticeWatched'><span className='noticeDate'>02.05.2018</span><Link onClick={this.onLinkClick} to="">Место обучения кадров
										требуют определения и уточнения существенных финансовых и административных
										условий</Link></p>
									<p className='noticeImportant'><span className='noticeDate'>02.05.2018</span><Link onClick={this.onLinkClickExit} to="/">Равным образом новая модель
										организационной деятельности</Link></p>
									<p><span className='noticeDate'>02.05.2018</span><Link onClick={this.onLinkClick} to="">Поступление денежных средств в
										счет оплаты долга</Link></p>
									<p className='noticeWatched noticeImportant'><span className='noticeDate'>02.05.2018</span><Link onClick={this.onLinkClick} to="">Место обучения кадров
										требуют определения и уточнения существенных финансовых и административных
										условий</Link></p>
									<p><span className='noticeDate'>02.05.2018</span><Link onClick={this.onLinkClickExit} to="/">Равным образом новая модель
										организационной деятельности</Link></p>
								</div>
								<p className='noticeListFooter'>
									<span className='noticeSettings'>Настройки</span>
									<span className='noticeWatchAll'>Просмотреть все</span>
								</p>
								<Modal

									isOpen={this.state.showModal}
									contentLabel="Minimal Modal Example">
									<button onClick={this.handleCloseModal}>Close Modal</button>
								</Modal>
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

	onLinkClickExit() {
		sessionStorage.clear();
		localStorage.clear();
		this.setState({
			showMenu: 'hidden'
		});
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