import React, {FocusEvent, RefObject} from 'react';
import './UserName.scss'
import BackOpacity from '../ProfileSelect/BackOpacity';
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import {IMobxProviderInjectedProps} from '../MobxProvider';

interface IUserNameState {
	showMenu: string;
	loading: string;
}

@inject("rootStore")
@observer
class UserName extends React.Component<IMobxProviderInjectedProps, IUserNameState> {

	menuRef: RefObject<HTMLDivElement>;

	constructor(props: IMobxProviderInjectedProps) {
		super(props);
		this.state = {
			showMenu: 'hidden',
			loading: 'initial'
		};
		this.menuRef = React.createRef();
		this.toggleMenuShow = this.toggleMenuShow.bind(this);
		this.onProfileSelectBlur = this.onProfileSelectBlur.bind(this);
		this.onLinkClick = this.onLinkClick.bind(this);
		this.onLinkClickExit = this.onLinkClickExit.bind(this);
		this.onBlur = this.onBlur.bind(this);

	}

	makeRequest(method: string, url: string): Promise<XMLHttpRequest> {
		return new Promise((resolve, reject) => {
			const {rootStore} = this.props;
			if (!rootStore) throw new Error('rootStore не определен');
			console.log('Store.SecurityToken - ' + window[rootStore.BrowserStorageType].getItem('securityToken'));

			var xhr = new XMLHttpRequest();
			let tokenValue = window[rootStore.BrowserStorageType].getItem('securityToken');
			console.log('Store.SecurityToken - ' + tokenValue);

			xhr.open(method, url);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader('Security_Token', tokenValue);
			let requestData = {
				token: tokenValue
			}
			xhr.send(JSON.stringify(requestData));
			xhr.onload = function() {
				if (this.status === 200) {
					resolve(xhr);
				} else {
					reject({
						status: this.status,
						statusText: xhr.statusText
					});
				}
			};
			xhr.onerror = function() {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			};
		});
	}


	componentDidMount() {

		const {rootStore} = this.props;
		if (!rootStore) throw new Error('rootStore не определен');

		console.log('This happens 3rd.');

		this.setState({loading: 'true'});

		this.makeRequest('POST', 'http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService/getUsernameByToken')
			.then(response => {
				var respJSON = JSON.parse(response.responseText);
				console.log('respJSON - ' + respJSON.operationResult);

				var errorCode = respJSON.operationResult.ErrorCode;
				console.log('Response - ' + response.responseText);
				if (errorCode === "0") {
					console.log('errorCode - ' + errorCode);
					var userName = respJSON.UserName;

					rootStore.UserFirstName = userName.firstName;
					rootStore.UserSurname = userName.lastName;
					rootStore.UserPatronymic = userName.surname;
				}
				this.setState({loading: 'false'});
			})
			.catch(function(err) {
				console.error('Augh, there was an error!', err.statusText);
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
		rootStore.UserMenuVisible = this.state.showMenu;
	}

	render() {
		if (this.state.loading === 'initial') {
			console.log('This happens 2nd - after the class is constructed. You will not see this element because React is still computing changes to the DOM.');
			return <h2>Intializing...</h2>;
		}


		if (this.state.loading === 'true') {
			console.log('This happens 5th - when waiting for data.');
			return <h2>Loading...</h2>;
		}

		console.log('This happens 8th - after I get data.');

		const {rootStore} = this.props;
		if (!rootStore) throw new Error('rootStore не определен');
		let backGroundOpacity = null;
		if (rootStore.UserMenuVisible === 'visible') {
			backGroundOpacity = <BackOpacity/>;
		}

		return (
			<div>
				<div className='userName' ref={this.menuRef} tabIndex={1} onBlur={this.onBlur} id={this.state.showMenu}>
					<span onClick={this.toggleMenuShow}>
						{rootStore.UserSurname + ' ' + rootStore.UserFirstName.charAt(0)
							.toLocaleUpperCase() + '. ' + rootStore.UserPatronymic.charAt(0).toLocaleUpperCase() + '.'}
						</span>

					{
						this.state.showMenu === 'visible' && (
							<ul className='profileSelect'>
								<li><Link onClick={this.onLinkClick} to="/UserProfile">Профиль пользователя</Link></li>
								<li><Link onClick={this.onLinkClick} to="/CompanyProfile">Профиль компании</Link></li>
								<li><Link onClick={this.onLinkClickExit} to="/">Выйти</Link></li>
							</ul>
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

export default UserName