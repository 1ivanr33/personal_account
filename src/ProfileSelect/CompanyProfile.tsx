import React from 'react';
import './CompanyProfile.scss';
import {Link} from 'react-router-dom';
import {TRouteComponentProps} from '../TRouteComponentProps';
import CompanyProfileForm from '../Profiles/CompanyProfileForm';
import BreadCrumbsCompany from '../BreadCrumbs/BreadCrumbsCompany';
import {IMobxProviderInjectedProps} from '../MobxProvider';
import {inject, observer} from 'mobx-react';

@inject("rootStore")
@observer
class CompanyProfile extends React.Component<TRouteComponentProps & IMobxProviderInjectedProps> {

	constructor(props: TRouteComponentProps) {
		super(props);
		this.isSessionValid = this.isSessionValid.bind(this);
	}

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
	}

	componentDidMount() {
		return this.isSessionValid();
	}

	render() {
		if (!( localStorage.getItem('securityToken') || (sessionStorage.getItem('securityToken')))){
			this.props.history.push("/");
		}
		return (
			<div className='companyProfile'>

				<BreadCrumbsCompany/>

				<ul>
					<li><Link to='/UserProfile'>Профиль пользователя</Link></li>
					<li><Link to='/CompanyProfile'  id='link-current' >Профиль компании</Link></li>
					<li><Link onClick={this.onLinkClickExit} to='/'>Выйти</Link></li>
				</ul>

				<CompanyProfileForm/>
			</div>
		);
	}

	onLinkClickExit() {
		sessionStorage.clear();
		localStorage.clear();
	}
}
export default CompanyProfile