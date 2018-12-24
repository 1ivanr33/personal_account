import React from 'react';
import './UserProfile.scss';
import {Link} from 'react-router-dom';
import {TRouteComponentProps} from '../TRouteComponentProps';
import UserProfileForm from '../Profiles/UserProfileForm';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import {IMobxProviderInjectedProps} from '../MobxProvider';
import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class UserProfile extends React.Component<TRouteComponentProps & IMobxProviderInjectedProps> {

	constructor(props: TRouteComponentProps  & IMobxProviderInjectedProps) {
		super(props);
		this.isSessionValid = this.isSessionValid.bind(this);
	}

	/* //Стабильная версия
	async isSessionValid() {

		const url_post = "http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService/getSessionNotExpired";
		const {rootStore} = this.props;
		if (!rootStore) throw new Error('rootStore не определен');
		let tokenValue = window[rootStore.BrowserStorageType].getItem('securityToken');

		let requestData = {
			SecurityToken: tokenValue
		};

		let postData = {
			method: 'POST',
			body: JSON.stringify(requestData),
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const response = await fetch(url_post, postData);
		const data = await response.json();
		let errorCode = data.NotExpired;
		console.log('errorCode - ' + errorCode);
		if (errorCode == true) {
			console.log('SessionNotExpired');
			setTimeout(this.isSessionValid, 30000);
		} else {
			sessionStorage.clear();
			localStorage.clear();
			this.props.history.push("/");
		}
	}*/

	async isSessionValid() {
		const {rootStore} = this.props;
		if (!rootStore) throw new Error('rootStore не определен');
		const qqq = await rootStore.AdministrationServiceStore.getSessionNotExpired();
		console.log(qqq);

		/*let errorCode = data.NotExpired;
		console.log('errorCode - ' + errorCode);
		if (errorCode == true) {
			console.log('SessionNotExpired');
			setTimeout(this.isSessionValid, 30000);
		} else {
			sessionStorage.clear();
			localStorage.clear();
			this.props.history.push("/");
		}*/
	}

	 componentDidMount() {
		 return this.isSessionValid();
	}

	render() {
		if (!( localStorage.getItem('securityToken') || (sessionStorage.getItem('securityToken')))){
			this.props.history.push("/");
		}
		return (

			<div className='userProfile'>

				<BreadCrumbs/>

				<ul>
					<li><Link to='/UserProfile' id='link-current'>Профиль пользователя</Link></li>
					<li><Link to='/CompanyProfile' >Профиль компании</Link></li>
					<li><Link onClick={this.onLinkClickExit} to='/'>Выйти</Link></li>
				</ul>

				<UserProfileForm/>
			</div>
		);
	}

	onLinkClickExit() {
		sessionStorage.clear();
		localStorage.clear();
	}
}
export default UserProfile